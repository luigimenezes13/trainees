/**
 * Aula 02-APIs / 01 - Servidor HTTP basico
 *
 * Objetivo: criar o servidor mais simples possivel com o modulo nativo.
 *
 * Como usar:
 * 1) npx tsx src/01-servidor-basico.ts
 * 2) Abra http://localhost:3000 no browser
 * 3) Observe o log no terminal a cada requisicao
 */

import { createServer } from "node:http";

const PORT = 3000;

// createServer recebe uma funcao que e chamada a cada requisicao.
// Essa funcao recebe dois objetos:
//   request  — tudo sobre o que o cliente pediu (metodo, URL, headers, body)
//   response — o que o servidor vai devolver (status, headers, body)

const server = createServer((request, response) => {
  console.log(`${request.method} ${request.url}`);

  // Define o status code e o header Content-Type
  response.writeHead(200, { "Content-Type": "text/plain" });

  // Escreve o body e finaliza a resposta
  response.end("Mars Mission Control: servidor operacional.\n");
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log("Pressione Ctrl+C para encerrar.\n");
});
