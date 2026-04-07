/**
 * Aula 01 - Conceitos Fundamentais (JavaScript)
 * Objetivo: revisar os blocos básicos da linguagem com exemplos práticos.
 *
 * Como usar:
 * 1) Leia cada bloco na ordem
 * 2) Execute no terminal com: node 01-conceitos.js
 * 3) Faça o desafio ao final
 */

console.log("\n=== Aula 01: Conceitos Fundamentais em JavaScript ===\n");

// ---------------------------------------------------------------------
// 1) Variaveis e tipos primitivos
// ---------------------------------------------------------------------
const nome = "Luigi";
const idade = 28;
const estudante = true;
const nota = 9.5;
let moduloAtual = "Introducao";

console.log("1) Variaveis e tipos:");
console.log({ nome, idade, estudante, nota, moduloAtual });

moduloAtual = "Fundamentos";
console.log("Modulo atualizado:", moduloAtual);

// ---------------------------------------------------------------------
// 2) Operadores e comparacoes
// ---------------------------------------------------------------------
const aprovado = nota >= 5;
const mensagemAprovacao = aprovado ? "Aprovado" : "Reprovado";

console.log("\n2) Operadores e comparacoes:");
console.log("nota >= 5 ?", aprovado);
console.log("resultado final:", mensagemAprovacao);

// ---------------------------------------------------------------------
// 3) Funcoes
// ---------------------------------------------------------------------
function calcularMedia(notaUm, notaDois) {
  return (notaUm + notaDois) / 2;
}

const calcularMediaArrow = (notaUm, notaDois) => (notaUm + notaDois) / 2;

console.log("\n3) Funcoes:");
console.log("Media (funcao tradicional):", calcularMedia(8, 10));
console.log("Media (arrow function):", calcularMediaArrow(7, 9));

// ---------------------------------------------------------------------
// 4) Arrays e objetos
// ---------------------------------------------------------------------
const tecnologias = ["JavaScript", "TypeScript", "Node.js"];
const aluno = {
  nome: "Luigi",
  modulo: 1,
  tecnologiasFavoritas: tecnologias,
};

console.log("\n4) Arrays e objetos:");
console.log("Primeira tecnologia:", tecnologias[0]);
console.log("Aluno:", aluno);

// ---------------------------------------------------------------------
// 5) Estruturas de repeticao
// ---------------------------------------------------------------------
console.log("\n5) Repeticao com for...of:");
for (const tecnologia of tecnologias) {
  console.log(`- ${tecnologia}`);
}

// ---------------------------------------------------------------------
// 6) Desafio da aula
// ---------------------------------------------------------------------
console.log("\n6) Desafio:");
console.log(
  "Crie uma funcao 'descreverAluno' que receba um objeto aluno e retorne uma frase."
);
console.log(
  "Exemplo esperado: 'Luigi esta no modulo 1 e gosta de JavaScript, TypeScript, Node.js.'"
);
  function descreverAluno({nome, modulo, tecnologiasFavoritas}){
  return (`${nome} esta no ${modulo} e gosta de ${tecnologiasFavoritas}`)}
console.log (descreverAluno(aluno))