/**
 * Aula 02-APIs / 03 - CRUD completo com SQLite
 *
 * Objetivo: substituir array em memoria por banco de dados real.
 * Cada operacao CRUD agora executa SQL.
 *
 * Pre-requisito: rode `npx tsx src/01-sqlite-setup.ts` antes.
 *
 * Como testar:
 *   npx tsx src/02-crud-completo.ts
 *
 *   curl http://localhost:3000/astronautas
 *   curl -X POST http://localhost:3000/astronautas \
 *     -H "Content-Type: application/json" \
 *     -d '{"nome": "Miguel Herrera", "funcao": "Medic", "nacionalidade": "Mexican"}'
 *   curl http://localhost:3000/astronautas/1
 *   curl -X PUT http://localhost:3000/astronautas/1 \
 *     -H "Content-Type: application/json" \
 *     -d '{"funcao": "Senior Commander"}'
 *   curl -X DELETE http://localhost:3000/astronautas/1
 *   curl http://localhost:3000/astronautas  (astronauta 1 nao aparece mais)
 */

import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import Database from "better-sqlite3";

const PORT = 3000;
const database = new Database("mars.db");
database.pragma("journal_mode = WAL");

// ---------------------------------------------------------------
// Utilitarios HTTP (reutilizados da aula anterior)
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
// Funcoes de acesso ao banco (repository pattern simplificado)
// ---------------------------------------------------------------
function listarTodos() {
  return database.prepare("SELECT * FROM astronautas WHERE deleted_at IS NULL ORDER BY created_at DESC").all();
}

function buscarPorId(id: number) {
  return database.prepare("SELECT * FROM astronautas WHERE id = ? AND deleted_at IS NULL").get(id);
}

function inserir(dados: { nome: string; funcao: string; nacionalidade: string }) {
  const resultado = database.prepare(
    "INSERT INTO astronautas (nome, funcao, nacionalidade) VALUES (?, ?, ?)"
  ).run(dados.nome, dados.funcao, dados.nacionalidade);

  return buscarPorId(Number(resultado.lastInsertRowid));
}

function atualizar(id: number, dados: Record<string, string>) {
  const campos = Object.keys(dados).map((campo) => `${campo} = ?`).join(", ");
  const valores = Object.values(dados);

  database.prepare(
    `UPDATE astronautas SET ${campos}, updated_at = datetime('now') WHERE id = ? AND deleted_at IS NULL`
  ).run(...valores, id);

  return buscarPorId(id);
}

function softDelete(id: number) {
  const resultado = database.prepare(
    "UPDATE astronautas SET deleted_at = datetime('now'), updated_at = datetime('now') WHERE id = ? AND deleted_at IS NULL"
  ).run(id);

  return resultado.changes > 0;
}

// ---------------------------------------------------------------
// Roteamento e handlers
// ---------------------------------------------------------------
function extrairId(url: string): number | null {
  const match = url.match(/^\/astronautas\/(\d+)$/);
  return match ? Number(match[1]) : null;
}

const server = createServer(async (request, response) => {
  const method = request.method ?? "GET";
  const url = (request.url ?? "/").split("?")[0];

  console.log(`${method} ${url}`);

  // GET /astronautas
  if (url === "/astronautas" && method === "GET") {
    enviarJson(response, 200, listarTodos());
    return;
  }

  // POST /astronautas
  if (url === "/astronautas" && method === "POST") {
    const corpo = await lerBody(request);
    const dados = JSON.parse(corpo);
    const criado = inserir(dados);
    enviarJson(response, 201, criado);
    return;
  }

  const id = extrairId(url);

  // GET /astronautas/:id
  if (id !== null && method === "GET") {
    const astronauta = buscarPorId(id);
    if (!astronauta) {
      enviarJson(response, 404, { erro: "Astronauta nao encontrado" });
      return;
    }
    enviarJson(response, 200, astronauta);
    return;
  }

  // PUT /astronautas/:id
  if (id !== null && method === "PUT") {
    const corpo = await lerBody(request);
    const dados = JSON.parse(corpo);
    const atualizado = atualizar(id, dados);
    if (!atualizado) {
      enviarJson(response, 404, { erro: "Astronauta nao encontrado" });
      return;
    }
    enviarJson(response, 200, atualizado);
    return;
  }

  // DELETE /astronautas/:id (soft delete)
  if (id !== null && method === "DELETE") {
    const removido = softDelete(id);
    if (!removido) {
      enviarJson(response, 404, { erro: "Astronauta nao encontrado" });
      return;
    }
    response.writeHead(204);
    response.end();
    return;
  }

  enviarJson(response, 404, { erro: "Rota nao encontrada" });
});

server.listen(PORT, () => {
  console.log(`CRUD com SQLite rodando em http://localhost:${PORT}`);
});
