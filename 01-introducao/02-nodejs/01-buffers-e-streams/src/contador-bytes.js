/**
 * Etapa 2: Stream de entrada (stdin) + Buffer.
 * * Objetivo:
 * - Ler dados da entrada padrão em chunks.
 * - Mostrar que cada chunk recebido é um Buffer.
 * - Somar o total de bytes recebidos.
 * - [ADICIONADO]: Permitir finalizar a leitura digitando "sair".
 */

// 1) Variável acumuladora para o total de bytes.
let totalDeBytes = 0;

console.log('---------------------------------------------------------');
console.log('Digite algo e aperte Enter para processar.');
console.log('Para finalizar: use Ctrl + Z ou digite a palavra "sair".');
console.log('---------------------------------------------------------\n');

// 2) Evento "data":
//    disparado toda vez que um novo chunk chega no stdin.
process.stdin.on('data', (chunkRecebido) => {
  
  // --- [NOVO] Lógica para capturar o comando de saída ---
  // Convertemos o Buffer para string, removemos espaços/quebras de linha e padronizamos em minúsculo.
  const entradaDoUsuario = chunkRecebido.toString().trim().toLowerCase();

  if (entradaDoUsuario === 'sair') {
    console.log('\n[Sinal de saída detectado: encerrando leitura...]');
    
    // Disparamos o evento 'end' manualmente para executar o bloco final de resumo.
    process.stdin.emit('end');
    
    // Pausamos a entrada de dados (para o Node parar de escutar o teclado).
    process.stdin.pause();
    
    // O 'return' impede que os bytes da palavra "sair" entrem na contagem final.
    return;
  }
  // -----------------------------------------------------

  // 3) O chunk é um Buffer.
  //    Vamos mostrar tipo e tamanho para reforçar o conceito.
  console.log('\n[novo chunk recebido]');
  console.log('- é Buffer?', Buffer.isBuffer(chunkRecebido));
  console.log('- tamanho do chunk (bytes):', chunkRecebido.length);

  // 4) Acumulamos os bytes desse chunk no total.
  totalDeBytes += chunkRecebido.length;

  // 5) Opcional didático: mostrar conteúdo em texto.
  //    trim() remove quebra de linha para facilitar leitura no console.
  console.log('- conteúdo (utf8):', chunkRecebido.toString('utf8').trim());
});

// 6) Evento "end":
//    disparado quando a entrada termina (via Ctrl+Z ou via comando manual .emit).
process.stdin.on('end', () => {
  console.log('\n--- RELATÓRIO FINAL ---');
  console.log('[entrada finalizada]');
  console.log('Total final de bytes recebidos:', totalDeBytes);
  console.log('------------------------');
});

// 7) Evento "error":
//    boa prática para não esconder falhas de I/O.
process.stdin.on('error', (erro) => {
  console.error('Erro ao ler stdin:', erro.message);
  process.exitCode = 1;
});