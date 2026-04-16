# 04 - Validacao e Tratamento de Erros

## Objetivo
- Validar dados de entrada com Zod (a mesma lib usada no projeto Mars Mission Control).
- Tratar erros de forma consistente e com status codes semanticos.
- Separar erros do cliente (4xx) de erros do servidor (5xx).

## Setup rapido
```bash
cd modules/02-apis/04-validacao-e-erros
npm init -y
npm install better-sqlite3 zod
npm install -D tsx typescript @types/better-sqlite3
```

## Roteiro da aula (ordem)

1. `npx tsx src/01-validacao-entrada.ts` — validar body com Zod
2. `npx tsx src/02-tratamento-erros.ts` — error handler centralizado
3. `npx tsx src/03-status-codes-semanticos.ts` — API completa com validacao + erros

## O que cada etapa ensina

### `src/01-validacao-entrada.ts`
- Zod: definir schemas para validar dados de entrada.
- Mensagens de erro claras para o cliente.
- Diferenca entre dados validos e dados aceitos pelo banco.

### `src/02-tratamento-erros.ts`
- Error handler centralizado: um unico lugar para tratar todos os erros.
- Erros conhecidos (validacao, nao encontrado) vs erros inesperados.
- Nunca expor stack trace ou detalhes internos para o cliente.

### `src/03-status-codes-semanticos.ts`
- API completa combinando validacao, erros e CRUD.
- 400 Bad Request: dados invalidos.
- 404 Not Found: recurso nao existe.
- 409 Conflict: conflito de estado (ex: duplicata).
- 415 Unsupported Media Type: Content-Type errado.
- 500 Internal Server Error: erro inesperado (log no servidor, mensagem generica pro cliente).

## Comandos uteis para testar

```bash
# Criar com dados validos
curl -X POST http://localhost:3000/astronautas \
  -H "Content-Type: application/json" \
  -d '{"nome": "Valentina Cruz", "funcao": "Commander", "nacionalidade": "Brazilian"}'

# Criar com dados invalidos (nome curto)
curl -X POST http://localhost:3000/astronautas \
  -H "Content-Type: application/json" \
  -d '{"nome": "V", "funcao": "", "nacionalidade": "Brazilian"}'

# Criar sem Content-Type
curl -X POST http://localhost:3000/astronautas \
  -d '{"nome": "Valentina"}'

# Buscar inexistente
curl http://localhost:3000/astronautas/999

# JSON invalido
curl -X POST http://localhost:3000/astronautas \
  -H "Content-Type: application/json" \
  -d 'isso nao e json'
```

## Conceitos-chave
- **Validacao**: verificar se os dados recebidos atendem ao formato esperado antes de processar.
- **Zod**: biblioteca de validacao com inferencia de tipos TypeScript.
- **Error handler**: funcao centralizada que converte erros em respostas HTTP adequadas.
- **Status codes semanticos**: usar o codigo HTTP correto para cada situacao de erro.
- **Defense in depth**: validar na borda (API) mesmo que o banco tenha constraints.
