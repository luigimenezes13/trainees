/**
 * Challenge 2: script "calc" com argumentos.
 *
 * Requisito:
 * - npm run calc -- 10 20 deve imprimir: Resultado: 30
 */

const argumentos: string[] = process.argv.slice(2);

// TODO:
// 1) Validar se vieram exatamente 2 argumentos.
// 2) Converter os argumentos para numero.
// 3) Somar os dois valores e imprimir "Resultado: X".
// 4) Tratar entrada invalida com mensagem de erro.

if (argumentos.length !== 2) {
  console.log('Uso: npm run calc -- <numero1> <numero2>');
  process.exit(1);
}

const primeiroNumero: number = Number(argumentos[0]);
const segundoNumero: number = Number(argumentos[1]);

if (Number.isNaN(primeiroNumero) || Number.isNaN(segundoNumero)) {
  console.log('Erro: informe dois numeros validos.');
  process.exit(1);
}

const resultado: number = primeiroNumero + segundoNumero;
console.log(`Resultado: ${resultado}`);
