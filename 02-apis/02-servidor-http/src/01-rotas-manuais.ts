/**
 * Aula 02-APIs / 02 - Rotas manuais com tabela de roteamento
 *
 * Objetivo: substituir cascata de if/else por uma estrutura de dados
 * que mapeia metodo + URL para funcoes handler.
 *
 * Como testar:
 *   npx tsx src/01-rotas-manuais.ts
 *
 *   curl http://localhost:3000/health
 *   curl http://localhost:3000/astronautas
 *   curl http://localhost:3000/astronautas/42
 */

import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

const PORT = 3000;

// ---------------------------------------------------------------
// Tipo de um handler: recebe request, response e parametros extraidos da URL
// ---------------------------------------------------------------
type RouteParams = Record<string, string>;
type Handler = (request: IncomingMessage, response: ServerResponse, parametros: RouteParams) => void;

interface Route {
  method: string;
  pattern: RegExp;
  paramNames: string[];
  handler: Handler;
}

// ---------------------------------------------------------------
// Funcao que registra rotas convertendo "/astronautas/:id" em regex
// ---------------------------------------------------------------
function criarRota(method: string, path: string, handler: Handler): Route {
  const paramNames: string[] = [];

  const regexString = path.replace(/:(\w+)/g, (_match, paramName: string) => {
    paramNames.push(paramName);
    return "([^/]+)";
  });

  return {
    method,
    pattern: new RegExp(`^${regexString}$`),
    paramNames,
    handler,
  };
}

// ---------------------------------------------------------------
// Tabela de rotas: cada entrada mapeia metodo + padrao para handler
// ---------------------------------------------------------------
const rotas: Route[] = [
  criarRota("GET", "/health", (_request, response) => {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ status: "ok" }));
  }),

  criarRota("GET", "/astronautas", (_request, response) => {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify([
      { id: 1, nome: "Valentina Cruz", funcao: "Commander" },
      { id: 2, nome: "Noah Patel", funcao: "Engineer" },
    ]));
  }),

  criarRota("GET", "/astronautas/:id", (_request, response, parametros) => {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({
      mensagem: `Buscando astronauta com id ${parametros.id}`,
    }));
  }),
];

// ---------------------------------------------------------------
// Roteador: percorre a tabela e encontra o handler certo
// ---------------------------------------------------------------
function rotear(method: string, url: string): { handler: Handler; parametros: RouteParams } | null {
  for (const rota of rotas) {
    if (rota.method !== method) continue;

    const match = url.match(rota.pattern);
    if (!match) continue;

    const parametros: RouteParams = {};
    rota.paramNames.forEach((name, index) => {
      parametros[name] = match[index + 1];
    });

    return { handler: rota.handler, parametros };
  }

  return null;
}

// ---------------------------------------------------------------
// Servidor: usa o roteador para despachar cada requisicao
// ---------------------------------------------------------------
const server = createServer((request, response) => {
  const method = request.method ?? "GET";
  const url = request.url ?? "/";

  console.log(`${method} ${url}`);

  const resultado = rotear(method, url);

  if (!resultado) {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ erro: "Rota nao encontrada" }));
    return;
  }

  resultado.handler(request, response, resultado.parametros);
});

server.listen(PORT, () => {
  console.log(`Servidor com roteador rodando em http://localhost:${PORT}`);
});
