/**
 * Challenge: contador de linhas com stdin.
 *
 * Tarefa:
 * - Ler os dados enviados para este script.
 * - Contar quantas linhas existem no texto final.
 * - Imprimir: "Total de linhas: X"
 *
 * Dica:
 * - Use process.stdin.on('data', ...)
 * - Use process.stdin.on('end', ...)
 */

let textoAcumulado = '';

process.stdin.on('data', (chunk) => {
  // TODO: converter chunk para string e acumular em textoAcumulado
});

process.stdin.on('end', () => {
  // TODO:
  // 1) separar textoAcumulado por '\n'
  // 2) ajustar caso venha linha vazia no final
  // 3) imprimir "Total de linhas: X"
});

process.stdin.on('error', (erro) => {
  console.error('Erro ao ler stdin:', erro.message);
  process.exitCode = 1;
});
