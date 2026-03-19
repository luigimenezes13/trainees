/**
 * Etapa 2: Stream de entrada (stdin) + Buffer.
 *
 * Objetivo:
 * - Ler dados da entrada padrao em chunks.
 * - Mostrar que cada chunk recebido e um Buffer.
 * - Somar o total de bytes recebidos.
 */

// 1) Variavel acumuladora para o total de bytes.
let totalDeBytes = 0;

console.log('Digite algo e finalize com Ctrl + D (Linux/macOS) ou Ctrl + Z (Windows).');

// 2) Evento "data":
//    disparado toda vez que um novo chunk chega no stdin.
process.stdin.on('data', (chunkRecebido) => {
  // 3) O chunk e um Buffer.
  //    Vamos mostrar tipo e tamanho para reforcar o conceito.
  console.log('\n[novo chunk recebido]');
  console.log('- e Buffer?', Buffer.isBuffer(chunkRecebido));
  console.log('- tamanho do chunk (bytes):', chunkRecebido.length);

  // 4) Acumulamos os bytes desse chunk no total.
  totalDeBytes += chunkRecebido.length;

  // 5) Opcional didatico: mostrar conteudo em texto.
  //    trim() remove quebra de linha para facilitar leitura no console.
  console.log('- conteudo (utf8):', chunkRecebido.toString('utf8').trim());
});

// 6) Evento "end":
//    disparado quando a entrada termina.
process.stdin.on('end', () => {
  console.log('\n[entrada finalizada]');
  console.log('Total final de bytes recebidos:', totalDeBytes);
});

// 7) Evento "error":
//    boa pratica para nao esconder falhas de I/O.
process.stdin.on('error', (erro) => {
  console.error('Erro ao ler stdin:', erro.message);
  process.exitCode = 1;
});
