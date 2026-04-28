/**
 * Aula 02-APIs / 02 - CRUD em memoria com JSON
 *
 * Objetivo: implementar Create, Read, Update, Delete sobre um array,
 * usando funcoes utilitarias para ler body e enviar JSON.
 *
 * Como testar:
 *   npx tsx src/02-json-request-response.ts
 *
 *   curl http://localhost:3000/astronautas
 *   curl -X POST http://localhost:3000/astronautas \
 *     -H "Content-Type: application/json" \
 *     -d '{"nome": "Valentina Cruz", "funcao": "Commander", "nacionalidade": "Brazilian"}'
 * 
 * curl -X POST http://localhost:3000/astronautas -H "Content-Type: application/json" -d "{\"nome\": \"Valentina\", \"funcao\": \"Commander\", \"nacionalidade\": \"Brazilian\"}"
 * 
 *   curl http://localhost:3000/astronautas/1
 *   curl -X PUT http://localhost:3000/astronautas/1 \
 *     -H "Content-Type: application/json" \
 *     -d '{"funcao": "Senior Commander"}'
 * 
 * curl -X PUT http://localhost:3000/astronautas/1 -H "Content-Type: application/json" -d "{\"funcao\": \"Senior Commander\"}"
 * 
 *   curl -X DELETE http://localhost:3000/astronautas/1
 */

import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

const PORT = 3000;

// ---------------------------------------------------------------
// Utilitarios de HTTP
// ---------------------------------------------------------------
function lerBody(request: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    request.on("data", (chunk: Buffer) => chunks.push(chunk));
    request.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
    request.on("error", reject);
  });
}

function enviarJson(response: ServerResponse, statusCode: number, dados: unknown): void {
  response.writeHead(statusCode, { "Content-Type": "application/json" });
  response.end(JSON.stringify(dados));
}

// ---------------------------------------------------------------
// "Banco" em memoria
// ---------------------------------------------------------------
interface Astronauta {
  id: number;
  nome: string;
  funcao: string;
  nacionalidade: string;
}

let proximoId = 1;
const astronautas: Astronauta[] = [];

// ---------------------------------------------------------------
// Handlers
// ---------------------------------------------------------------
function listarAstronautas(_request: IncomingMessage, response: ServerResponse): void {
  enviarJson(response, 200, astronautas);
}

function buscarAstronauta(_request: IncomingMessage, response: ServerResponse, id: number): void {
  const astronauta = astronautas.find((a) => a.id === id);

  if (!astronauta) {
    enviarJson(response, 404, { erro: "Astronauta nao encontrado" });
    return;
  }

  enviarJson(response, 200, astronauta);
}

async function criarAstronauta(request: IncomingMessage, response: ServerResponse): Promise<void> {
  const corpo = await lerBody(request);
  const dados = JSON.parse(corpo);

  const novoAstronauta: Astronauta = {
    id: proximoId++,
    nome: dados.nome,
    funcao: dados.funcao,
    nacionalidade: dados.nacionalidade,
  };

  astronautas.push(novoAstronauta);
  enviarJson(response, 201, novoAstronauta);
}

async function atualizarAstronauta(request: IncomingMessage, response: ServerResponse, id: number): Promise<void> {
  const indice = astronautas.findIndex((a) => a.id === id);

  if (indice === -1) {
    enviarJson(response, 404, { erro: "Astronauta nao encontrado" });
    return;
  }

  const corpo = await lerBody(request);
  const dados = JSON.parse(corpo);

  astronautas[indice] = { ...astronautas[indice], ...dados };
  enviarJson(response, 200, astronautas[indice]);
}

function deletarAstronauta(_request: IncomingMessage, response: ServerResponse, id: number): void {
  const indice = astronautas.findIndex((a) => a.id === id);

  if (indice === -1) {
    enviarJson(response, 404, { erro: "Astronauta nao encontrado" });
    return;
  }

  astronautas.splice(indice, 1);
  response.writeHead(204);
  response.end();
}

// ---------------------------------------------------------------
// Roteamento
// ---------------------------------------------------------------
function extrairId(url: string): number | null {
  const match = url.match(/^\/astronautas\/(\d+)$/);
  return match ? Number(match[1]) : null;
}

const server = createServer(async (request, response) => {
  const method = request.method ?? "GET";
  const url = request.url ?? "/";

  console.log(`${method} ${url}`);

  // GET /astronautas
  if (url === "/astronautas" && method === "GET") {
    listarAstronautas(request, response);
    return;
  }

  // POST /astronautas
  if (url === "/astronautas" && method === "POST") {
    await criarAstronauta(request, response);
    return;
  }

  // Rotas com ID: GET, PUT, DELETE /astronautas/:id
  const id = extrairId(url);

  if (id !== null && method === "GET") {
    buscarAstronauta(request, response, id);
    return;
  }

  if (id !== null && method === "PUT") {
    await atualizarAstronauta(request, response, id);
    return;
  }

  if (id !== null && method === "DELETE") {
    deletarAstronauta(request, response, id);
    return;
  }

  enviarJson(response, 404, { erro: "Rota nao encontrada" });
});

server.listen(PORT, () => {
  console.log(`CRUD em memoria rodando em http://localhost:${PORT}`);
});
