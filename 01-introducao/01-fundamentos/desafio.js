const aluno = {
    nome: "Cassiano", 
    tecnologias: ["JavaScript", "TypeScript",  "Node.js"]
};
  
  function descreverAluno(aluno) {
    return `${aluno.nome} está no módulo 1 e gosta de ${aluno.tecnologias}`;
  }
  
  console.log(descreverAluno(aluno));