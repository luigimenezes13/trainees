/**
 * Desafio: API de suprimentos em memoria
 *
 * Contexto: a colonia Aurora precisa controlar os suprimentos que chegam de Marte.
 * Voce deve construir uma API HTTP completa para gerenciar suprimentos.
 *
 * Requisitos:
 *
 * 1) Modelo de suprimento:
 *    { id: number, nome: string, categoria: string, quantidade: number }
 *
 * 2) Rotas:
 *    GET    /suprimentos         → 200, lista todos
 *    GET    /suprimentos/:id     → 200, busca por id (404 se nao existe)
 *    POST   /suprimentos         → 201, cria novo suprimento
 *    PUT    /suprimentos/:id     → 200, atualiza parcial (404 se nao existe)
 *    DELETE /suprimentos/:id     → 204, remove (404 se nao existe)
 *
 * 3) Middlewares obrigatorios:
 *    - Logger: imprime "METHOD /url → STATUS (Xms)" para toda requisicao
 *    - CORS: headers Access-Control-Allow-Origin, Methods e Headers
 *
 * 4) Tratamento basico:
 *    - Rota inexistente → 404
 *    - JSON invalido no body → 400
 *
 * Como validar:
 *   npx tsx challenge/desafio-api-memoria.ts
 *
 *   curl http://localhost:3000/suprimentos
 *   curl -X POST http://localhost:3000/suprimentos \
 *     -H "Content-Type: application/json" \
 *     -d '{"nome": "Oxigenio", "categoria": "Vital", "quantidade": 500}'
 *   curl http://localhost:3000/suprimentos/1
 *   curl -X PUT http://localhost:3000/suprimentos/1 \
 *     -H "Content-Type: application/json" \
 *     -d '{"quantidade": 450}'
 *   curl -X DELETE http://localhost:3000/suprimentos/1
 */

import { createServer } from "node:http";

const PORT = 3000;

// TODO: implemente a API conforme os requisitos acima

const server = createServer(async (request, response) => {
  response.writeHead(501, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ erro: "Ainda nao implementado" }));
});

server.listen(PORT, () => {
  console.log(`Desafio suprimentos rodando em http://localhost:${PORT}`);
});
