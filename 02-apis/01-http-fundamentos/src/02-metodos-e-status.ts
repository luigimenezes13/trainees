/**
 * Aula 02-APIs / 02 - Metodos HTTP e Status Codes
 *
 * Objetivo: entender como o servidor diferencia tipos de requisicao
 * e responde com status codes adequados.
 *
 * Como testar:
 *   npx tsx src/02-metodos-e-status.ts
 *
 *   curl http://localhost:3000/astronautas
 *   curl -X POST http://localhost:3000/astronautas
 *   curl -X DELETE http://localhost:3000/astronautas
 *   curl http://localhost:3000/rota-inexistente
 */

import { createServer } from "node:http";

const PORT = 3000;

const server = createServer((request, response) => {
  const { method, url } = request;

  console.log(`${method} ${url}`);

  // ---------------------------------------------------------------
  // Roteamento manual: combinamos metodo + URL para decidir o que fazer
  // ---------------------------------------------------------------

  if (url === "/astronautas" && method === "GET") {
    // 200 OK — requisicao bem-sucedida, retorna dados
    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ mensagem: "Lista de astronautas" }));
    return;
  }

  if (url === "/astronautas" && method === "POST") {
    // 201 Created — recurso criado com sucesso
    response.writeHead(201, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ mensagem: "Astronauta criado" }));
    return;
  }

  if (url === "/astronautas" && method === "DELETE") {
    // 204 No Content — acao executada, sem body na resposta
    response.writeHead(204);
    response.end();
    return;
  }

  if (url === "/astronautas") {
    // 405 Method Not Allowed — a rota existe, mas o metodo nao e suportado
    response.writeHead(405, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ erro: `Metodo ${method} nao permitido em /astronautas` }));
    return;
  }

  // 404 Not Found — a rota nao existe
  response.writeHead(404, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ erro: `Rota ${url} nao encontrada` }));
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
