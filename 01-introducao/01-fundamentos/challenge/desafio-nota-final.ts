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
// TODO:
type NotaFinal = number;

// 2) Crie um tipo/interface para o aluno com os campos necessarios.
// TODO: i
type Aprovacao = "aprovado" | "reprovado";
interface Aluno {
  nome: string;
  idade: number;
  modulo: string;
  p1: number;
  p2: number;
  a1: number;
  notafinal?: NotaFinal;
  status?: Aprovacao;
}

// 3) Crie uma funcao que calcule a nota final com pesos.
// TODO:
function calcularNotaFinal(aluno: Aluno): NotaFinal {
  return aluno.p1 * 0.4 + aluno.p2 * 0.5 + aluno.a1 * 0.1;
}

// 4) Crie uma funcao que retorne "aprovado" ou "reprovado".
<<<<<<< HEAD
// TODO: function verificarAprovacao(...): "aprovado" | "reprovado" { ... }
=======
// TODO: 
function verificarAprovacao(notafinal:NotaFinal): Aprovacao {
    return notafinal >= 5 ? "aprovado" : "reprovado"
}
>>>>>>> 7328f44 (fix: ajuste de commits bugados)

// 5) Monte uma frase final no formato esperado.
// TODO:
function descreverResultado(aluno: Aluno): string {
  return `${aluno.nome}, ${aluno.modulo} foi ${aluno.status} com nota ${aluno.notafinal} `;
}

// 6) Teste com um aluno exemplo.
// TODO: criar aluno, calcular nota, verificar status e imprimir resultado.
const aluno1: Aluno = {
  nome: "Gustavo Zorzo",
  idade: 20,
  modulo: "Fundamentos",
  p1: 10,
  p2: 10,
  a1: 10,
};
aluno1.notafinal = calcularNotaFinal(aluno1);
aluno1.status = verificarAprovacao(aluno1.notafinal);
console.log(descreverResultado(aluno1));
