/**
 * Etapa 1: Introducao ao Buffer no Node.js.
 *
 * Objetivo:
 * - Mostrar que texto em Node pode ser representado como bytes.
 * - Entender como criar Buffer e converter para string.
 */

// 1) Criamos uma string simples para usar como exemplo.
const mensagem = 'Ola Node';

// 2) Convertendo string para Buffer (bytes em memoria).
//    Buffer.from usa UTF-8 por padrao.
const bufferDaMensagem = Buffer.from(mensagem, 'utf8');

// 3) Exibimos a string original.
console.log('Texto original:', mensagem);

// 4) Exibimos o Buffer bruto.
//    Esse formato "<Buffer ...>" mostra os bytes em hexadecimal.
console.log('Buffer bruto:', bufferDaMensagem);

// 5) Exibimos o total de bytes.
//    Pode ser diferente da quantidade de caracteres em alguns casos.
console.log('Total de bytes:', bufferDaMensagem.length);

// 5.1) Exemplo de tamanho do buffer em bytes, KB, MB, etc.
<<<<<<< HEAD
<<<<<<< HEAD

const mensagemDaReuniao = 'o HDMI não funciona'
const bufferDaMensagemDaReuniao = Buffer.from(mensagemDaReuniao, 'utf8')

console.log('Tamanho do buffer em bytes:', bufferDaMensagemDaReuniao.length);
console.log('Tamanho do buffer em KB:', bufferDaMensagemDaReuniao.length / 1024);
console.log('Tamanho do buffer em MB:', bufferDaMensagemDaReuniao.length / 1024 / 1024);
=======
=======
>>>>>>> e50cecb (feat: challenge npm)
const mensagemReuniao = "O HDMI não funciona"
const bufferDaMensagemReuniao = Buffer.from(mensagemReuniao,"utf8")


console.log('Tamanho do buffer em bytes:', bufferDaMensagemReuniao.length);
console.log('Tamanho do buffer em KB:', bufferDaMensagemReuniao.length / 1024);
console.log('Tamanho do buffer em MB:', bufferDaMensagemReuniao.length / 1024 / 1024);
<<<<<<< HEAD
>>>>>>> e50cecb (feat: challenge npm)
=======
>>>>>>> e50cecb (feat: challenge npm)

// 6) Convertendo de volta para string.
//    Aqui voltamos do formato binario para texto.
const textoRecuperado = bufferDaMensagem.toString('utf8');
console.log('Texto recuperado do buffer:', textoRecuperado);

// 7) Exemplo com Buffer.alloc:
//    cria um Buffer com tamanho fixo, preenchido com zero.
const bufferVazioDe8Bytes = Buffer.alloc(8);
console.log('Buffer alloc(8):', bufferVazioDe8Bytes);

// 8) Exemplo de recorte com slice:
//    pegamos apenas os 3 primeiros bytes da mensagem.
const primeirosTresBytes = bufferDaMensagem.slice(0, 3);
console.log('Primeiros 3 bytes:', primeirosTresBytes);
console.log('Primeiros 3 bytes como texto:', primeirosTresBytes.toString('utf8'));
