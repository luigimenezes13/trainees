/**
 * Challenge: contador de linhas com stdin.
 * * Tarefa:
 * - Ler os dados enviados para este script.
 * - Contar quantas linhas existem no texto final.
 * - Imprimir: "Total de linhas: X"
 */

let textoAcumulado = '';

console.log('--- Contador de Linhas ---');
console.log('Digite seu texto (cada Enter conta como uma linha).');
console.log('Para finalizar e ver o resultado, digite: sair');
console.log('--------------------------\n');

process.stdin.on('data', (chunk) => {
  const texto = chunk.toString("utf8");

  // --- [NOVO] Lógica para capturar o comando de saída ---
  if (texto.trim().toLowerCase() === 'sair') {
    // Disparamos o evento 'end' manualmente
    process.stdin.emit('end');
    // Paramos a entrada de dados
    process.stdin.pause();
    return;
  }
  // -----------------------------------------------------

  // Acumular o texto recebido (convertido de chunk para string)
  textoAcumulado += texto;
});

process.stdin.on('end', () => {
  // 1) Separar textoAcumulado por '\n'
  // Usamos .trim() para evitar que uma quebra de linha solta no final conte como linha extra
  const linhas = textoAcumulado.trim().split('\n');
  
  // 2) Ajustar caso o texto acumulado esteja totalmente vazio
  const totalLinhas = textoAcumulado.trim() === '' ? 0 : linhas.length;

  // 3) Imprimir o resultado final
  console.log('\n--- RESULTADO ---');
  console.log(`Total de linhas: ${totalLinhas}`);
});

process.stdin.on('error', (erro) => {
  console.error('Erro ao ler stdin:', erro.message);
  process.exitCode = 1;
});