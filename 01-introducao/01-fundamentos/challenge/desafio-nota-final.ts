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


type NotaFinal = number;

// 1) Crie um tipo para representar a nota final (alias).
// TODO: type NotaFinal = ...

interface Aluno {
    nome:string;
    idade:number;
    materia:string[];
    notaFinal:NotaFinal;
}

type materia = "Engenharia de Software" | "Cálculo 2" | "Programação Orientada a Objetos";
// 2) Crie um tipo/interface para o aluno com os campos necessarios.
// TODO: interface Aluno { ... }

function calcularNotaFinal(notap1:number, notap2:number, notaa1:number):NotaFinal{
    const soma_notas = (notap1 * 4) + (notap2 * 5) + (notaa1 * 1);
    return soma_notas / 10;
}
// 3) Crie uma funcao que calcule a nota final com pesos.
// TODO: function calcularNotaFinal(...): NotaFinal { ... }


function verificarAprovacao(nota:notaFinal) : string {
    const aprovado = nota >= 5;
    const mensagemAprovacao = aprovado ? "Aprovado" : "Reprovado";
    return mensagemAprovacao;
}

// 4) Crie uma funcao que retorne "aprovado" ou "reprovado".
// TODO: function verificarAprovacao(...): "aprovado" | "reprovado" { ... }

function descreverResultado(aluno:Aluno):string{
    return `O aluno ${aluno.nome}, ${aluno.idade}, ${aluno.materia} foi ${verificarAprovacao(aluno.notaFinal)} com nota ${aluno.notaFinal}.`;
}
// 5) Monte uma frase final no formato esperado.
// TODO: function descreverResultado(...): string { ... }

const aluno = {
    nome: "Cassiano",
    idade: 20,
    materia: ["Engenharia de Software"],
    notaFinal: calcularNotaFinal(8, 7, 9),
}
// 6) Teste com um aluno exemplo.
// TODO: criar aluno, calcular nota, verificar status e imprimir resultado.
console.log(descreverResultado(aluno));
