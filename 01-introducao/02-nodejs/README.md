# 02 - Node.js (Buffer e Streams)

## Objetivo
- Entender Node.js como runtime JavaScript fora do browser.
- Praticar I/O com Buffer e Streams usando scripts minimos.

## Setup rapido
```bash
node -v
npm -v
cd modules/01-introducao/02-nodejs/01-buffers-e-streams
```

## Roteiro da aula (ordem)
1. `node src/buffer-basico.js`
2. `echo "Ola Node" | node src/contador-bytes.js`
3. `node src/copiar-arquivo.js`
4. `printf "linha 1\nlinha 2\n" | node challenge/desafio-contador-linhas.js`

## O que cada etapa ensina
- `src/buffer-basico.js`: como texto vira bytes com `Buffer`.
- `src/contador-bytes.js`: leitura por `stdin` em chunks.
- `src/copiar-arquivo.js`: `createReadStream`, `createWriteStream` e `pipe()`.
- `challenge/desafio-contador-linhas.js`: fixacao de `data` + `end`.

## Conceitos-chave
- `Buffer`: dados binarios em memoria.
- `Readable/Writable stream`: leitura/escrita incremental.
- `chunk`: parte dos dados recebida em cada evento.
- `pipe()`: conecta fluxos com melhor uso de memoria.
