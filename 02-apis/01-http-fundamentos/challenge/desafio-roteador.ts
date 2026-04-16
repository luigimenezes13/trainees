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

import { createServer } from "node:http";

const PORT = 3000;

// Implemente aqui

const server = createServer(async (request, response) => {
  // TODO: implemente o roteador conforme os requisitos acima
  response.writeHead(501, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ erro: "Ainda nao implementado" }));
});

server.listen(PORT, () => {
  console.log(`Desafio rodando em http://localhost:${PORT}`);
});
