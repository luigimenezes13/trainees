/**
 * Aula 02-APIs / 03 - Headers e Body
 *
 * Objetivo: ler o body de uma requisicao POST e responder com JSON.
 * No HTTP nativo, o body chega em chunks (pedacos) — igual streams.
 *
 * Como testar:
 *   npx tsx src/03-headers-e-body.ts
 *
 *   curl -X POST http://localhost:3000/echo \
 *     -H "Content-Type: application/json" \
 *     -d '{"nome": "Valentina", "funcao": "Commander"}'
 *
 *   curl -X POST http://localhost:3000/echo \
 *     -H "Content-Type: text/plain" \
 *     -d 'isso nao e JSON'
 */

import { createServer, type IncomingMessage } from "node:http";

const PORT = 3000;

// ---------------------------------------------------------------
// Funcao utilitaria: coleta todos os chunks do body e retorna string
// ---------------------------------------------------------------
function lerBody(request: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    request.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });

    request.on("end", () => {
      resolve(Buffer.concat(chunks).toString("utf-8"));
    });

    request.on("error", reject);
  });
}

const server = createServer(async (request, response) => {
  const { method, url, headers } = request;

  console.log(`${method} ${url}`);
  console.log("Content-Type recebido:", headers["content-type"]);

  if (url === "/echo" && method === "POST") {
    const contentType = headers["content-type"];

    // Valida que o cliente esta enviando JSON
    if (!contentType?.includes("application/json")) {
      response.writeHead(415, { "Content-Type": "application/json" });
      response.end(JSON.stringify({
        erro: "Content-Type deve ser application/json",
        recebido: contentType,
      }));
      return;
    }

    const bodyTexto = await lerBody(request);

    try {
      const dados = JSON.parse(bodyTexto);

      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify({
        mensagem: "Dados recebidos com sucesso",
        dados,
        tamanhoBytes: Buffer.byteLength(bodyTexto),
      }));
    } catch {
      response.writeHead(400, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ erro: "JSON invalido" }));
    }

    return;
  }

  response.writeHead(404, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ erro: "Rota nao encontrada" }));
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
