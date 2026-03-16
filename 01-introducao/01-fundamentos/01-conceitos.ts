/**
 * Aula 01 - Conceitos Fundamentais (TypeScript)
 * Objetivo: reforcar os conceitos basicos e adicionar tipagem estatica.
 *
 * Como usar:
 * 1) Leia cada bloco na ordem
 * 2) Compile com: tsc 01-conceitos.ts
 * 3) Execute o JS gerado com: node 01-conceitos.js
 */

export {};

console.log("\n=== Aula 01: Conceitos Fundamentais em TypeScript ===\n");

// ---------------------------------------------------------------------
// 1) Variaveis com tipos explicitos
// ---------------------------------------------------------------------
const nome: string = "Luigi";
const idade: number = 28;
const estudante: boolean = true;
const nota: number = 9.5;
let moduloAtual: string = "Introducao";

console.log("1) Variaveis com tipos:");
console.log({ nome, idade, estudante, nota, moduloAtual });

moduloAtual = "Fundamentos";
console.log("Modulo atualizado:", moduloAtual);

// ---------------------------------------------------------------------
// 2) Type alias e interface
// ---------------------------------------------------------------------
type Tecnologia = "JavaScript" | "TypeScript" | "Node.js";

interface Aluno {
  nome: string;
  modulo: number;
  tecnologiasFavoritas: Tecnologia[];
}

const tecnologias: Tecnologia[] = ["JavaScript", "TypeScript", "Node.js"];
const aluno: Aluno = {
  nome: "Luigi",
  modulo: 1,
  tecnologiasFavoritas: tecnologias,
};

console.log("\n2) Type alias e interface:");
console.log("Aluno:", aluno);

// ---------------------------------------------------------------------
// 3) Funcoes com tipos de entrada e saida
// ---------------------------------------------------------------------
function calcularMedia(notaUm: number, notaDois: number): number {
  return (notaUm + notaDois) / 2;
}

function descreverAluno(alunoAtual: Aluno): string {
  const tecnologiasFormatadas = alunoAtual.tecnologiasFavoritas.join(", ");
  return `${alunoAtual.nome} esta no modulo ${alunoAtual.modulo} e gosta de ${tecnologiasFormatadas}.`;
}

console.log("\n3) Funcoes tipadas:");
console.log("Media:", calcularMedia(8, 10));
console.log("Descricao:", descreverAluno(aluno));

// ---------------------------------------------------------------------
// 4) Generics basicos
// ---------------------------------------------------------------------
function primeiroItem<T>(itens: T[]): T | undefined {
  return itens[0];
}

console.log("\n4) Generics:");
console.log("Primeiro item:", primeiroItem<Tecnologia>(tecnologias));

// ---------------------------------------------------------------------
// 5) Desafio da aula
// ---------------------------------------------------------------------
// Crie um tipo para NotaFinal e uma funcao que valide se o aluno
// foi aprovado ou reprovado (media necessaria 5).
// A Nota Final de um aluno e a media geometrica ponderada entre:
// P1: 40%, P2: 50%, A1: 10%.
// Exemplo esperado: 'Luigi, 22, introdução foi aprovado com nota 7.5.'
