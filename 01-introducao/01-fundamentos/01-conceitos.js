/**
 * Aula 01 - Conceitos Fundamentais (TypeScript)
 * Objetivo: reforcar os conceitos basicos e adicionar tipagem estatica.
 *
 * Como usar:
 * 1) Leia cada bloco na ordem
 * 2) Compile com: tsc 01-conceitos.ts
 * 3) Execute o JS gerado com: node 01-conceitos.js
 */
console.log("\n=== Aula 01: Conceitos Fundamentais em TypeScript ===\n");
// ---------------------------------------------------------------------
// 1) Variaveis com tipos explicitos
// ---------------------------------------------------------------------
const nome = "Luigi";
const idade = 28;
const estudante = true;
const nota = 9.5;
let moduloAtual = "Introducao";
console.log("1) Variaveis com tipos:");
console.log({ nome, idade, estudante, nota, moduloAtual });
moduloAtual = "Fundamentos";
console.log("Modulo atualizado:", moduloAtual);
const tecnologias = ["JavaScript", "TypeScript", "Node.js"];
const aluno = {
    nome: "Luigi",
    modulo: 1,
    tecnologiasFavoritas: tecnologias,
};
console.log("\n2) Type alias e interface:");
console.log("Aluno:", aluno);
// ---------------------------------------------------------------------
// 3) Funcoes com tipos de entrada e saida
// ---------------------------------------------------------------------
function calcularMedia(notaUm, notaDois) {
    return (notaUm + notaDois) / 2;
}
function descreverAluno(alunoAtual) {
    const tecnologiasFormatadas = alunoAtual.tecnologiasFavoritas.join(", ");
    return `${alunoAtual.nome} esta no modulo ${alunoAtual.modulo} e gosta de ${tecnologiasFormatadas}.`;
}
console.log("\n3) Funcoes tipadas:");
console.log("Media:", calcularMedia(8, 10));
console.log("Descricao:", descreverAluno(aluno));
// ---------------------------------------------------------------------
// 4) Generics basicos
// ---------------------------------------------------------------------
function primeiroItem(itens) {
    return itens[0];
}
console.log("\n4) Generics:");
console.log("Primeiro item:", primeiroItem(tecnologias));
export {};
