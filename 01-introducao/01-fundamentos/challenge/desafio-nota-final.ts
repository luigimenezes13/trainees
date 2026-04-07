/**
 * Challenge - Nota final e aprovacao
 *
 * Objetivo:
 * Implementar a regra de aprovacao de um aluno com tipagem em TypeScript.
 *
 * Regras:
 * - A nota final e a media ponderada:
 *   - P1 = 40%
 *   - P2 = 50%
 *   - A1 = 10%
 * - Media minima para aprovacao: 5
 *
 * Saida esperada (exemplo):
 * "Luigi, 22, introducao foi aprovado com nota 7.5."
 */

export {};

// 1) Crie um tipo para representar a nota final (alias).
// TODO: type NotaFinal = ...
type NotaFinal = number;

// 2) Crie um tipo/interface para o aluno com os campos necessarios.
// TODO: interface Aluno { ... }
interface Aluno {
    nome: string;
    idade: number;
    modulo: string;
    p1: number;
    p2: number;
    a1: number;
}

// 3) Crie uma funcao que calcule a nota final com pesos.
// TODO: function calcularNotaFinal(...): NotaFinal { ... }
function calcularNotaFinal(aluno: Aluno): NotaFinal {
    return (aluno.p1 * 0.4) + (aluno.p2 * 0.5) + (aluno.a1 * 0.1);
}

// 4) Crie uma funcao que retorne "aprovado" ou "reprovado".
// TODO: function verificarAprovacao(...): "aprovado" | "reprovado" { ... }
function verificarAprovacao(notaFinal: NotaFinal): string {
    const resultado = notaFinal >= 5 ? "aprovado" : "reprovado";
    return resultado;
}

// 5) Monte uma frase final no formato esperado.
// TODO: function descreverResultado(...): string { ... }
function descreverResultado(aluno: Aluno, notaFinal: NotaFinal, status: string): string {
    return `${aluno.nome}, ${aluno.idade}, ${aluno.modulo} foi ${status} com nota ${notaFinal}.`;
}

// 6) Teste com um aluno exemplo.
// TODO: criar aluno, calcular nota, verificar status e imprimir resultado.
const aluno: Aluno = {
    nome: "Luigi",
    idade: 22,
    modulo: "Introducao",
    p1: 7.5,
    p2: 8.0,
    a1: 9.0,
};

const notaFinal = calcularNotaFinal(aluno);
const status = verificarAprovacao(notaFinal);

console.log(descreverResultado(aluno, notaFinal, status));