/**
 * Aula 02-APIs / 03 - Padrao Middleware
 *
 * Objetivo: entender middleware como funcao que intercepta request/response
 * antes do handler. Mesmo padrao usado por Express, Fastify, Koa, etc.
 *
 * Como testar:
 *   npx tsx src/03-middleware-pattern.ts
 *
 *   curl http://localhost:3000/health
 *   curl -i http://localhost:3000/health  (observe os headers CORS)
 */

import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

const PORT = 3000;

// ---------------------------------------------------------------
// Tipo: um middleware recebe request, response e uma funcao "proximo"
// Se chamar proximo(), a cadeia continua. Se nao chamar, a cadeia para.
// ---------------------------------------------------------------
type Proximo = () => void;
type Middleware = (request: IncomingMessage, response: ServerResponse, proximo: Proximo) => void;

// ---------------------------------------------------------------
// Middleware: Logger — imprime metodo, URL e tempo de resposta
// ---------------------------------------------------------------
const logger: Middleware = (request, response, proximo) => {
  const inicio = Date.now();

  // O evento "finish" dispara quando a resposta termina de ser enviada
  response.on("finish", () => {
    const duracao = Date.now() - inicio;
    console.log(`${request.method} ${request.url} → ${response.statusCode} (${duracao}ms)`);
  });

  proximo();
};

// ---------------------------------------------------------------
// Middleware: CORS — adiciona headers para permitir acesso do frontend
// ---------------------------------------------------------------
const cors: Middleware = (_request, response, proximo) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  proximo();
};

// ---------------------------------------------------------------
// Handler final: a logica real da rota
// ---------------------------------------------------------------
const handler: Middleware = (request, response) => {
  const url = request.url ?? "/";

  if (url === "/health") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ status: "ok", timestamp: new Date().toISOString() }));
    return;
  }

  response.writeHead(404, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ erro: "Rota nao encontrada" }));
};

// ---------------------------------------------------------------
// Funcao que encadeia middlewares: executa um a um, em ordem
// ---------------------------------------------------------------
function encadear(middlewares: Middleware[]): (request: IncomingMessage, response: ServerResponse) => void {
  return (request, response) => {
    let indice = 0;

    function proximo(): void {
      const middlewareAtual = middlewares[indice++];

      if (!middlewareAtual) return;

      middlewareAtual(request, response, proximo);
    }

    proximo();
  };
}

// ---------------------------------------------------------------
// Servidor: monta a cadeia logger -> cors -> handler
// ---------------------------------------------------------------
const pipeline = encadear([logger, cors, handler]);

const server = createServer(pipeline);

server.listen(PORT, () => {
  console.log(`Servidor com middleware rodando em http://localhost:${PORT}`);
});
