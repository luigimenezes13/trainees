/**
 * Desafio: API de astronautas com SQLite
 *
 * Objetivo: construir uma API REST completa de astronautas com persistencia
 * em SQLite, combinando tudo que foi aprendido ate aqui.
 *
 * Requisitos:
 *
 * 1) Setup do banco (criar tabela + seed ao iniciar o servidor):
 *    Tabela: astronautas (id, nome, funcao, nacionalidade, status, deleted_at, created_at, updated_at)
 *
 * 2) Rotas:
 *    GET    /astronautas         → 200, listagem com paginacao (?page, ?limit, ?search)
 *    GET    /astronautas/:id     → 200, busca por ID (404 se nao existe ou esta deletado)
 *    POST   /astronautas         → 201, cria novo astronauta
 *    PUT    /astronautas/:id     → 200, atualiza campos enviados (404 se nao existe)
 *    DELETE /astronautas/:id     → 204, soft delete (404 se nao existe)
 *
 * 3) Regras de negocio:
 *    - Soft delete: DELETE marca deleted_at, nao remove fisicamente
 *    - Listagem e busca por ID ignoram registros com deleted_at preenchido
 *    - Paginacao: page (default 1), limit (default 10, max 50)
 *    - Busca: ?search=texto filtra por nome (LIKE)
 *
 * 4) Formato de resposta da listagem:
 *    {
 *      "data": [...],
 *      "pagination": { "total": 20, "page": 1, "limit": 10, "totalPages": 2 }
 *    }
 *
 * 5) Middlewares:
 *    - Logger
 *    - CORS
 *
 * Como validar:
 *   npx tsx challenge/desafio-astronautas-api.ts
 *
 *   curl "http://localhost:3000/astronautas?page=1&limit=3"
 *   curl http://localhost:3000/astronautas/1
 *   curl -X POST http://localhost:3000/astronautas \
 *     -H "Content-Type: application/json" \
 *     -d '{"nome": "Sara Ndlovu", "funcao": "Geologist", "nacionalidade": "South African"}'
 *   curl -X PUT http://localhost:3000/astronautas/1 \
 *     -H "Content-Type: application/json" \
 *     -d '{"funcao": "Senior Commander"}'
 *   curl -X DELETE http://localhost:3000/astronautas/1
 *   curl "http://localhost:3000/astronautas?search=sara"
 */

import { createServer } from "node:http";

const PORT = 3000;

// TODO: implemente a API conforme os requisitos acima

const server = createServer(async (request, response) => {
  response.writeHead(501, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ erro: "Ainda nao implementado" }));
});

server.listen(PORT, () => {
  console.log(`Desafio astronautas com SQLite rodando em http://localhost:${PORT}`);
});
