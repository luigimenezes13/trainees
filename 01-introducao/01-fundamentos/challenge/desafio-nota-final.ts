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


type NotaFinal = number

interface Aluno{
    nome: String,
    idade: number,
    notaP1: number,
    notaP2: number,
    notaA1: number
    notaFinal?: number
}

function calcularNotaFinal({notaP1,notaP2,notaA1}:Aluno):NotaFinal {   
    return 0.4 * notaP1 + 0.5 * notaP2 + 0.1 * notaA1
}

function verificarAprovação(NotaFinal:number): "aprovado" | "reprovado"{
    return NotaFinal >= 5 ? "aprovado" : "reprovado"
}

function descreverResultado(aluno: Aluno): string{
    if(aluno.notaFinal == undefined){
        calcularNotaFinal(aluno)
    }
    if(aluno.notaFinal != undefined){
        return `${aluno.nome}, ${aluno.idade}, foi ${verificarAprovação(aluno.notaFinal)} com nota ${aluno.notaFinal.toFixed(2)}`
    }
    return `Não foi possível fazer nota final de ${aluno.nome}`
}

const aluno1 : Aluno = {
    nome: "Luigi",
    idade: 22,
    notaP1: 5,
    notaP2: 5,
    notaA1: 5,
    
}

aluno1.notaFinal = calcularNotaFinal(aluno1)
console.log(descreverResultado(aluno1))

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
