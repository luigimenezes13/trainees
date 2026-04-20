/**
 * Desafio: Roteador HTTP manual
 *
 * Objetivo: criar um servidor HTTP que responda corretamente a diferentes
 * combinacoes de metodo + URL, usando apenas o modulo nativo `node:http`.
 *
 * Requisitos:
 *
 * 1) GET  /health       → 200, JSON: { "status": "ok" }
 *
 * 2) GET  /astronautas  → 200, JSON: lista fixa de 3 astronautas
 *    Cada astronauta deve ter: nome, funcao, nacionalidade
 *
 * 3) POST /astronautas  → leia o body JSON e responda 201 com o objeto recebido
 *    + campo "recebidoEm" com a data/hora atual (new Date().toISOString())
 *    Se o body nao for JSON valido → 400, JSON: { "erro": "JSON invalido" }
 *    Se Content-Type nao for application/json → 415
 *
 * 4) Qualquer outra rota → 404, JSON: { "erro": "Rota nao encontrada" }
 *
 * 5) Metodo nao suportado em rota existente → 405, JSON: { "erro": "Metodo nao permitido" }
 *
 * Como validar:
 *   npx tsx challenge/desafio-roteador.ts
 *
 *   curl http://localhost:3000/health
 *   curl http://localhost:3000/astronautas
 *   curl -X POST http://localhost:3000/astronautas \
 *     -H "Content-Type: application/json" \
 *     -d '{"nome": "Luigi", "funcao": "Engineer"}'
 *   curl -X PUT http://localhost:3000/astronautas
 *   curl http://localhost:3000/rota-qualquer
 */

import { createServer, type IncomingMessage } from "node:http";

const PORT = 3000;

// Implemente aqui

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
  // TODO: implemente o roteador conforme os requisitos acima
  const { method, url, headers } = request;
  const contentType = headers["content-type"];

  if (url === "health") {
    if (method === "GET") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(
        JSON.stringify({
          status: "OK",
        }),
      );
    }
    response.writeHead(405, { "Content-Type": "application/json" });
    response.end(
      JSON.stringify({
        erro: "Método não permitido",
      }),
    );
  }
  if (url === "astronautas") {
    if (method === "GET") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(
        JSON.stringify([
          {
            nome: "Marcio",
            funcao: "Astronauta General",
            nacionalidade: "Brasil",
          },
          {
            nome: "Gustavo",
            funcao: "Astronauta Estagiario",
            nacionalidade: "Brasil",
          },
          {
            nome: "John",
            funcao: "Astronauta Senior",
            nacionalidade: "Estados Unidos",
          },
        ]),
      );
    }
    if (method === "POST") {
      // Valida que o cliente esta enviando JSON
      if (!contentType?.includes("application/json")) {
        response.writeHead(415, { "Content-Type": "application/json" });
        response.end(
          JSON.stringify({
            erro: "Content-Type deve ser application/json",
            recebido: contentType,
          }),
        );
        return;
      }
    }

    const bodyTexto = await lerBody(request);

    try {
      const dados = JSON.parse(bodyTexto);

      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(
        JSON.stringify({
          mensagem: "Dados recebidos com sucesso",
          dados,
          recebidoEm: new Date().toISOString(),
        }),
      );
    } catch {
      response.writeHead(415, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ erro: "JSON invalido" }));
    }

    response.writeHead(405, { "Content-Type": "application/json" });
    response.end(
      JSON.stringify({
        erro: "Método não permitido",
      }),
    );
  }

  response.writeHead(404, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ erro: "Rota não encontrada" }));
});

server.listen(PORT, () => {
  console.log(`Desafio rodando em http://localhost:${PORT}`);
});
