interface aluno {
    nome: string;
    media_final: number;
    status: string;
}
function CalcularMedia(): number {
    const nota1 = 7.0*0.4; // P1
    const nota2 = 8.0*0.5; // P2
    const nota3 = 9.0*0.1; // A1
    return nota1 + nota2 + nota3;
}
function VerificarAprovacao(media:number): string {
    return media >= 5 ? "aprovado" : "reprovado";
}
const Aluno: aluno = {
    nome: "Luigi",
    media_final: CalcularMedia(),
    status: VerificarAprovacao(CalcularMedia())
}
console.log(`${Aluno.nome}, ${Aluno.media_final}, introducao foi ${Aluno.status} com nota ${Aluno.media_final}.`);