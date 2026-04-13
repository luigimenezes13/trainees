# 01 - HTTP Fundamentos

## Objetivo
- Entender o protocolo HTTP na pratica: metodos, status codes, headers e body.
- Criar um servidor HTTP usando apenas o modulo nativo `node:http`.
- Relacionar cada conceito com o que acontece em uma API real.

## Setup rapido
```bash
cd modules/02-apis/01-http-fundamentos
npm init -y
npm install -D tsx typescript
```

## Roteiro da aula (ordem)

1. `npx tsx src/01-servidor-basico.ts` — subir servidor e acessar no browser
2. `npx tsx src/02-metodos-e-status.ts` — testar com `curl`
3. `npx tsx src/03-headers-e-body.ts` — enviar e receber JSON

## O que cada etapa ensina

### `src/01-servidor-basico.ts`
- Como o Node.js cria um servidor HTTP do zero.
- Request (o que chega) e Response (o que volta).
- O ciclo: o cliente pede, o servidor responde.

### `src/02-metodos-e-status.ts`
- Metodos HTTP: GET, POST, PUT, DELETE e seus significados.
- Status codes: 200, 201, 204, 400, 404, 405, 500.
- Como rotear manualmente com `request.method` e `request.url`.

### `src/03-headers-e-body.ts`
- `Content-Type` e `Accept`: o contrato entre cliente e servidor.
- Como ler o body de uma requisicao (chunks + JSON.parse).
- Como enviar JSON na resposta.

## Comandos uteis para testar

```bash
# GET simples
curl http://localhost:3000

# POST com JSON
curl -X POST http://localhost:3000/echo \
  -H "Content-Type: application/json" \
  -d '{"mensagem": "ola"}'

# Ver headers da resposta
curl -i http://localhost:3000
```

## Conceitos-chave
- **HTTP**: protocolo de requisicao/resposta entre cliente e servidor.
- **Metodo**: verbo que indica a intencao (GET = buscar, POST = criar, PUT = atualizar, DELETE = remover).
- **Status code**: numero que indica o resultado (2xx sucesso, 4xx erro do cliente, 5xx erro do servidor).
- **Header**: metadado da requisicao/resposta (tipo de conteudo, tamanho, autorizacao).
- **Body**: conteudo da mensagem (geralmente JSON em APIs).
