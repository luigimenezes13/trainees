/**
 * Etapa 2: recebendo argumentos com npm run.
 *
 * Objetivo:
 * - Entender o uso de "--" para encaminhar argumentos.
 * - Ler os argumentos com process.argv.
 */

const argumentos: string[] = process.argv.slice(2);

if (argumentos.length === 0) {
  console.log('Nenhum argumento recebido.');
  console.log('Exemplo: npm run exemplo:args -- 10 20');
  process.exit(0);
}

console.log('Argumentos recebidos:', argumentos.join(', '));
