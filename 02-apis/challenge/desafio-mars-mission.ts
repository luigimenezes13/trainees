/**
 * Desafio Final: Mars Mission Control API
 *
 * Contexto:
 * Ano 2042. A colonia Aurora, em Marte, entra em fase critica de expansao.
 * O Mars Mission Control precisa de uma API para gerenciar astronautas,
 * suprimentos e missoes.
 *
 * Este desafio prepara voce para o projeto real do trainee-program:
 * https://github.com/V4-Company/trainee-program
 *
 * --------------------------------------------------------------------------
 * PARTE 1: Banco de dados (SQLite)
 * --------------------------------------------------------------------------
 *
 * Crie as tabelas ao iniciar o servidor:
 *
 * astronautas:
 *   id, nome, funcao, nacionalidade, status, deleted_at, created_at, updated_at
 *
 * suprimentos:
 *   id, nome, categoria, quantidade, created_at, updated_at
 *
 * missoes:
 *   id, nome, descricao, status, created_at, updated_at
 *
 * missao_astronautas:
 *   missao_id, astronauta_id (chaves estrangeiras)
 *
 * missao_suprimentos:
 *   missao_id, suprimento_id, quantidade (chaves estrangeiras)
 *
 * --------------------------------------------------------------------------
 * PARTE 2: Rotas de Astronautas
 * --------------------------------------------------------------------------
 *
 * GET    /astronautas         → listagem paginada (?page, ?limit, ?search)
 * GET    /astronautas/:id     → busca por ID
 * POST   /astronautas         → cria (validar com Zod: nome min 2, funcao e nacionalidade obrigatorios)
 * PUT    /astronautas/:id     → atualiza campos enviados
 * DELETE /astronautas/:id     → soft delete (marca deleted_at)
 *
 * --------------------------------------------------------------------------
 * PARTE 3: Rotas de Suprimentos
 * --------------------------------------------------------------------------
 *
 * GET    /suprimentos         → listagem paginada (?page, ?limit, ?search)
 * GET    /suprimentos/:id     → busca por ID
 * POST   /suprimentos         → cria (validar: nome min 2, categoria obrigatoria, quantidade >= 0)
 * PUT    /suprimentos/:id     → atualiza campos enviados
 * DELETE /suprimentos/:id     → remove fisicamente
 *
 * --------------------------------------------------------------------------
 * PARTE 4: Rotas de Missoes
 * --------------------------------------------------------------------------
 *
 * GET    /missoes             → listagem paginada com astronautas e suprimentos vinculados
 * GET    /missoes/:id         → detalhes com astronautas e suprimentos
 * POST   /missoes             → cria missao vinculando astronautas e suprimentos
 *   Body esperado:
 *   {
 *     "nome": "Exploracao Setor 7",
 *     "descricao": "Reconhecimento da area norte",
 *     "astronautaIds": [1, 2],
 *     "suprimentos": [
 *       { "suprimentoId": 1, "quantidade": 10 },
 *       { "suprimentoId": 3, "quantidade": 5 }
 *     ]
 *   }
 *   Validacoes:
 *   - Todos os astronautaIds devem existir e estar ativos
 *   - Todos os suprimentoIds devem existir
 *   - Quantidade de suprimento deve ser > 0
 *
 * --------------------------------------------------------------------------
 * PARTE 5: Requisitos gerais
 * --------------------------------------------------------------------------
 *
 * - Middlewares: Logger + CORS
 * - Error handler centralizado
 * - Validacao com Zod em todas as rotas de criacao/atualizacao
 * - Paginacao no formato: { data: [...], pagination: { total, page, limit, totalPages } }
 * - Status codes corretos (200, 201, 204, 400, 404, 500)
 *
 * --------------------------------------------------------------------------
 * Como validar
 * --------------------------------------------------------------------------
 *
 *   npx tsx challenge/desafio-mars-mission.ts
 *
 *   # Astronautas
 *   curl "http://localhost:3000/astronautas?page=1&limit=3"
 *   curl -X POST http://localhost:3000/astronautas \
 *     -H "Content-Type: application/json" \
 *     -d '{"nome": "Valentina Cruz", "funcao": "Commander", "nacionalidade": "Brazilian"}'
 *
 *   # Suprimentos
 *   curl -X POST http://localhost:3000/suprimentos \
 *     -H "Content-Type: application/json" \
 *     -d '{"nome": "Oxigenio", "categoria": "Vital", "quantidade": 500}'
 *   curl "http://localhost:3000/suprimentos"
 *
 *   # Missoes
 *   curl -X POST http://localhost:3000/missoes \
 *     -H "Content-Type: application/json" \
 *     -d '{"nome": "Exploracao Setor 7", "descricao": "Recon norte", "astronautaIds": [1], "suprimentos": [{"suprimentoId": 1, "quantidade": 10}]}'
 *   curl "http://localhost:3000/missoes"
 *   curl http://localhost:3000/missoes/1
 */

import { createServer } from "node:http";

const PORT = 3000;

// TODO: implemente a API conforme os requisitos acima

const server = createServer(async (request, response) => {
  response.writeHead(501, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ erro: "Ainda nao implementado" }));
});

server.listen(PORT, () => {
  console.log(`Desafio Mars Mission Control rodando em http://localhost:${PORT}`);
});
