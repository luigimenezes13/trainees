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

type FinalGrade = number

interface Student {
    name: string,
    age: number,
    class: string,
    T1: number,
    T2: number,
    A1: number,
    final: FinalGrade
}

function calculateFinalGrade(s: Student): FinalGrade {
    return parseFloat((s.A1 * 0.1 + s.T1 * 0.4 + s.T2 * 0.5).toFixed(2))
}

function verifyApproval(f: FinalGrade): "aprovado" | "reprovado" {
    if(f > 0.5)
        return "aprovado"
    else
        return "reprovado"
}

function describeResult(s: Student): string {
    return `Aluno: ${s.name}
Idade: ${s.age}
Turma: ${s.class}
Foi ${verifyApproval(s.final)} com notaFinal de ${s.final}`
}

let s1 : Student = {
    name: "Gustavo",
    age: 20,
    class: "fundamentos-01",
    T1: 7,
    T2: 6.5,
    A1: 3,
    final: 0
}
s1.final = calculateFinalGrade(s1)

console.log(describeResult(s1))

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
