/**
 * Etapa 3: Copiar arquivo com Streams.
 *
 * Objetivo:
 * - Ler um arquivo grande/pequeno sem carregar tudo em memoria.
 * - Usar pipe() para conectar leitura e escrita.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1) Definimos caminhos absolutos a partir da pasta atual do script.
const caminhoEntrada = path.resolve(__dirname, '../exemplos/entrada.txt');
const caminhoSaida = path.resolve(__dirname, '../exemplos/saida.txt');

// 2) Criamos stream de leitura do arquivo de entrada.
const leitura = fs.createReadStream(caminhoEntrada);

// 3) Criamos stream de escrita do arquivo de saida.
const escrita = fs.createWriteStream(caminhoSaida);

// 4) Evento "open" ajuda a visualizar quando os arquivos foram abertos.
leitura.on('open', () => {
  console.log('Leitura iniciada em:', caminhoEntrada);
});

escrita.on('open', () => {
  console.log('Escrita iniciada em:', caminhoSaida);
});

// 5) Evento "data" permite acompanhar chunks lidos.
leitura.on('data', (chunk) => {
  console.log(`Chunk lido: ${chunk.length} bytes`);
});

// 6) Conectamos leitura -> escrita com pipe().
//    O Node controla o fluxo para evitar sobrecarga de memoria.
leitura.pipe(escrita);

// 7) Quando a leitura terminar, informamos no console.
leitura.on('end', () => {
  console.log('Leitura finalizada.');
});

// 8) Quando a escrita terminar, o arquivo de saida esta completo.
escrita.on('finish', () => {
  console.log('Copia concluida com sucesso.');
});

// 9) Tratamento de erros nas duas pontas do stream.
leitura.on('error', (erro) => {
  console.error('Erro na leitura:', erro.message);
  process.exitCode = 1;
});

escrita.on('error', (erro) => {
  console.error('Erro na escrita:', erro.message);
  process.exitCode = 1;
});
