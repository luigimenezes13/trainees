# 02 - Servidor HTTP (rotas, JSON e middleware)

## Objetivo
- Organizar rotas de forma escalavel sem framework.
- Dominar leitura/escrita de JSON via HTTP.
- Entender o padrao de middleware e como ele aparece em frameworks.

## Setup rapido
```bash
cd modules/02-apis/02-servidor-http
npm init -y
npm install -D tsx typescript
```

## Roteiro da aula (ordem)

1. `npx tsx src/01-rotas-manuais.ts` — roteador com tabela de rotas
2. `npx tsx src/02-json-request-response.ts` — CRUD em memoria com JSON
3. `npx tsx src/03-middleware-pattern.ts` — logger e CORS como funcoes encadeadas

## O que cada etapa ensina

### `src/01-rotas-manuais.ts`
- Como substituir if/else por uma tabela de rotas.
- Separar a logica de roteamento da logica de cada rota.
- Extrair parametros de URL (ex: `/astronautas/1`).

### `src/02-json-request-response.ts`
- CRUD completo (Create, Read, Update, Delete) usando array em memoria.
- Funcoes utilitarias para ler body e enviar JSON.
- Separacao entre "o que roteia" e "o que executa".

### `src/03-middleware-pattern.ts`
- O que e um middleware: funcao que intercepta request/response.
- Logger automatico de requisicoes.
- CORS headers para permitir acesso do frontend.
- Como encadear middlewares antes do handler final.

## Comandos uteis para testar

```bash
# Listar astronautas
curl http://localhost:3000/astronautas

# Criar astronauta
curl -X POST http://localhost:3000/astronautas \
  -H "Content-Type: application/json" \
  -d '{"nome": "Valentina Cruz", "funcao": "Commander", "nacionalidade": "Brazilian"}'

# Buscar por ID
curl http://localhost:3000/astronautas/1

# Atualizar
curl -X PUT http://localhost:3000/astronautas/1 \
  -H "Content-Type: application/json" \
  -d '{"funcao": "Senior Commander"}'

# Deletar
curl -X DELETE http://localhost:3000/astronautas/1
```

## Conceitos-chave
- **Tabela de rotas**: mapa de `metodo + padrao de URL` para handler.
- **Handler**: funcao que processa uma requisicao especifica.
- **Middleware**: funcao que intercepta o ciclo request/response antes do handler.
- **CORS**: headers que permitem requisicoes de origens diferentes (frontend -> backend).
- **CRUD**: Create (POST), Read (GET), Update (PUT), Delete (DELETE).
