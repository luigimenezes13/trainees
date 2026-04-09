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
interface aluno {
    nome: string;
    media_final: number;
    status: string;
}
const Aluno: aluno = {
    nome: "Luigi",
    media_final: media_final(),
    status: verificarAprovacao(media_final() > 5 ? "aprovado" : "reprovado")
}
verificarAprovacao(media_final() > 5 ? "aprovado" : "reprovado");
function verificarAprovacao(status: string) {
    return status;
}

const nota1 = 7.0*0.4; // P1
const nota2 = 8.0*0.5; // P2
const nota3 = 9.0*0.1; // A1
function media_final() {
  return nota1 + nota2 + nota3;
}
console.log(`${Aluno.nome}, ${Aluno.media_final}, introducao foi ${Aluno.status} com nota ${Aluno.media_final}.`);
export {};

// 1) Crie um tipo para representar a nota final (alias).
// TODO: type NotaFinal = ...

// 2) Crie um tipo/interface para o aluno com os campos necessarios.
// TODO: interface Aluno { ... }

// 3) Crie uma funcao que calcule a nota final com pesos.
// TODO: function calcularNotaFinal(...): NotaFinal { ... }

// 4) Crie uma funcao que retorne "aprovado" ou "reprovado".
// TODO: function verificarAprovacao(...): "aprovado" | "reprovado" { ... }

// 5) Monte uma frase final no formato esperado.
// TODO: function descreverResultado(...): string { ... }

// 6) Teste com um aluno exemplo.
// TODO: criar aluno, calcular nota, verificar status e imprimir resultado.
