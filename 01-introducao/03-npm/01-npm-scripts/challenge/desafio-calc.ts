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

if (argumentos.length != 2) {
  console.log("ERRO: Mais de dois números digitados")
} else {
  const n1 = Number(argumentos[0])
  const n2 = Number(argumentos[1])
  const res = n1 + n2

  if(Number.isNaN(res)) {
    console.log("ERRO: Entrada inválida")
  } else {
    console.log(`Resultado: ${res}`)
  }

}