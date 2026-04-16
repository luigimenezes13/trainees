# 03 - REST + CRUD com SQLite

## Objetivo
- Persistir dados em banco de dados real (SQLite).
- Implementar CRUD completo com SQL.
- Aplicar paginacao e filtros na listagem.
- Entender a separacao entre rota, logica e acesso a dados.

## Setup rapido
```bash
cd modules/02-apis/03-rest-crud
npm init -y
npm install better-sqlite3
npm install -D tsx typescript @types/better-sqlite3
```

> **Por que SQLite?** E um banco relacional que roda em arquivo local, sem precisar de Docker ou servidor externo. Perfeito para aprender SQL e persistencia antes de usar PostgreSQL em producao.

## Roteiro da aula (ordem)

1. `npx tsx src/01-sqlite-setup.ts` — criar banco e tabela
2. `npx tsx src/02-crud-completo.ts` — API com CRUD persistido
3. `npx tsx src/03-paginacao-e-filtros.ts` — query params para paginar e buscar

## O que cada etapa ensina

### `src/01-sqlite-setup.ts`
- Como conectar no SQLite com `better-sqlite3`.
- CREATE TABLE, INSERT, SELECT basicos.
- Conceito de schema e seed (dados iniciais).

### `src/02-crud-completo.ts`
- Servidor HTTP com CRUD usando SQL real (INSERT, SELECT, UPDATE, DELETE).
- Separacao entre funcoes de acesso ao banco e handlers HTTP.
- Diferenca entre dados em memoria (volatil) e persistidos (duravel).

### `src/03-paginacao-e-filtros.ts`
- Query parameters: `?page=1&limit=10&search=valentina`.
- SQL com LIMIT, OFFSET e LIKE para filtro.
- Resposta com metadados de paginacao (total, pagina atual, total de paginas).

## Comandos uteis para testar

```bash
# Listar com paginacao
curl "http://localhost:3000/astronautas?page=1&limit=5"

# Buscar por nome
curl "http://localhost:3000/astronautas?search=valentina"

# Criar
curl -X POST http://localhost:3000/astronautas \
  -H "Content-Type: application/json" \
  -d '{"nome": "Luigi Menezes", "funcao": "Engineer", "nacionalidade": "Brazilian"}'

# Atualizar
curl -X PUT http://localhost:3000/astronautas/1 \
  -H "Content-Type: application/json" \
  -d '{"funcao": "Senior Engineer"}'

# Soft delete
curl -X DELETE http://localhost:3000/astronautas/1
```

## Conceitos-chave
- **SQLite**: banco relacional embutido, roda em arquivo local.
- **Schema**: estrutura das tabelas (colunas, tipos, constraints).
- **Seed**: dados iniciais inseridos ao criar o banco.
- **Soft delete**: marcar como removido (`deleted_at`) em vez de apagar fisicamente.
- **Paginacao**: retornar dados em paginas (LIMIT + OFFSET) em vez de tudo de uma vez.
- **Query parameters**: dados enviados na URL apos `?` (ex: `?page=1&limit=10`).
