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
interface Aluno{
    nome: string,
    idade: number,
    p1: number,
    p2: number,
    a1: number,
}

// 3) Crie uma funcao que calcule a nota final com pesos.
// TODO: function calcularNotaFinal(...): NotaFinal { ... }
function calcularNotaFinal(alunoAtual: Aluno): NotaFinal {
    return (alunoAtual.p1*0.4 + alunoAtual.p2*0.5 + alunoAtual.a1*0.1)
}

// 4) Crie uma funcao que retorne "aprovado" ou "reprovado".
// TODO: function verificarAprovacao(...): "aprovado" | "reprovado" { ... }
type Aprovacao = "aprovado" | "reprovado"
function verificarAprovacao(media: NotaFinal): Aprovacao{
    if (media >= 5.0) return "aprovado"
    else return "reprovado"
}


// 5) Monte uma frase final no formato esperado.
// TODO: function descreverResultado(...): string { ... }
function descreverResultado(alunoAtual: Aluno){
    let media = calcularNotaFinal(alunoAtual)
    let resultado = verificarAprovacao(media)
    if (resultado == "aprovado") console.log(`O ${alunoAtual.nome} foi aprovado com média ${media}`)
    else console.log(`O ${alunoAtual.nome} foi reprovado com média ${media}`)
}

// 6) Teste com um aluno exemplo.
// TODO: criar aluno, calcular nota, verificar status e imprimir resultado.
const newAluno: Aluno = {
    nome: "Vicente",
    idade: 18,
    p1: 7,
    p2: 9,
    a1: 10,
}

verificarAprovacao(calcularNotaFinal(newAluno))
descreverResultado(newAluno)

const newAluno2: Aluno = {
    nome: "Pablo",
    idade: 36,
    p1: 5,
    p2: 4,
    a1: 4,

}

verificarAprovacao(calcularNotaFinal(newAluno2))
descreverResultado(newAluno2)