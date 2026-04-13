# 2K26 - Modulo 2

## Slide 1 - Capa

- Rotas e HTTP Requests (APIs RESTful).
- V4 Trainees Mars - Modulo 2.

---

## Slide 2 - O que vamos construir

- Uma API REST completa usando apenas o modulo nativo `node:http`.
- Sem framework — entender o que acontece por baixo antes de usar Express ou Fastify.
- Persistencia com SQLite (banco relacional em arquivo local).
- Preparacao para o desafio do Mars Mission Control.

---

## Slide 3 - HTTP na pratica

- Toda API web e construida sobre o protocolo HTTP.
- Cliente faz **requisicao** (request): metodo + URL + headers + body.
- Servidor devolve **resposta** (response): status code + headers + body.
- Metodos definem intencao: GET (buscar), POST (criar), PUT (atualizar), DELETE (remover).

---

## Slide 4 - Status codes

- `200 OK` — requisicao bem-sucedida.
- `201 Created` — recurso criado.
- `204 No Content` — acao executada, sem body.
- `400 Bad Request` — dados invalidos enviados pelo cliente.
- `404 Not Found` — recurso nao existe.
- `405 Method Not Allowed` — metodo nao suportado na rota.
- `500 Internal Server Error` — erro inesperado no servidor.

---

## Slide 5 - Servidor HTTP nativo

- `node:http` cria servidor com `createServer((request, response) => { ... })`.
- Roteamento manual: combinar `request.method` + `request.url`.
- Body chega em chunks (streams) — precisa coletar e parsear.
- Mesmo conceito que frameworks usam internamente.

---

## Slide 6 - REST (Representational State Transfer)

- Recursos sao substantivos: `/astronautas`, `/suprimentos`, `/missoes`.
- Metodos HTTP sao verbos: GET, POST, PUT, DELETE.
- Cada combinacao metodo + recurso tem um significado claro.
- Respostas usam JSON como formato padrao.

---

## Slide 7 - Persistencia com SQLite

- Banco relacional embutido — roda em arquivo local, sem Docker.
- SQL real: CREATE TABLE, INSERT, SELECT, UPDATE, DELETE.
- Soft delete: marcar `deleted_at` em vez de apagar fisicamente.
- Paginacao: LIMIT + OFFSET para retornar dados em paginas.

---

## Slide 8 - Validacao e erros

- Zod: biblioteca de validacao com inferencia de tipos TypeScript.
- Validar na borda (API) antes de processar ou persistir.
- Error handler centralizado: um unico lugar para tratar todos os erros.
- Status codes semanticos para cada tipo de erro.

---

## Slide 9 - Middleware

- Funcao que intercepta request/response antes do handler.
- Logger: registra metodo, URL, status e tempo de resposta.
- CORS: headers para permitir acesso do frontend.
- Encadeamento: logger → cors → handler.

---

## Slide 10 - Estrutura da trilha

- `01-http-fundamentos` — protocolo HTTP, servidor basico, metodos e status codes.
- `02-servidor-http` — rotas, CRUD em memoria, middleware.
- `03-rest-crud` — SQLite, CRUD persistido, paginacao e filtros.
- `04-validacao-e-erros` — Zod, error handler, API completa + desafio Mars Mission.

---

## Slide 11 - Desafio: Mars Mission Control

- Repositorio: `github.com/V4-Company/trainee-program`
- Implementar backend para astronautas, suprimentos e missoes.
- Soft delete, CRUD completo, relacionamentos entre entidades.
- Conexao com frontend React ja existente.

---
