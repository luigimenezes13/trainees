# Notas SOLID — modelo

> Copie para `notas.md` (que esta no `.gitignore`) e preencha uma linha por principio.
> Objetivo: conseguir explicar em uma frase **o que violava** e **como a refatoracao corrigiu**.

## S - Single Responsibility Principle
- Violacao encontrada: O serviço `account-service.ts` possuia métodos relacionados à serviços bancários e métodos de tratamento de resposta.
- Refatoracao aplicada: A solução aplicada foi dividir as responsabilidades de resolver respostas no arquivo `statement-printer`, chamando ele e seus métodos como depêndencia.
- Insight: Utilizar Inversão de Dependência para passar o Repositório de Transações para o método de `printTransations()`

## O - Open/Closed Principle
- Violacao encontrada: O sistema utilizava um switch case para tratar diferentes tipos de objetos, isso cria dificuldades na hora de expandir o código.
- Refatoracao aplicada: A classe Employee é abstrata e para adicionar um novo tipo de funcionário basta apenas extender essa classe.
- Insight: Definir o método payAmount() na classe pai, isso exige que todos os métodos tenham ela.

## L - Liskov Substitution Principle
- Violacao encontrada: Dois métodos diferentes para "abastecer" resultava em dois objetos parecidos só que diferentes, o que não permitia substituir um pelo outro.
- Refatoracao aplicada: A solução foi juntar os dois métodos de abastecer em algo abstrato e compátivel com os dois tipos de carro, isso permite que os carros sejam tratados como iguais, porém, com cada um podendo ter suas particularidades.
- Insight: Definir o método completeEnergy como abstrato obriga ele existir nas classes filhas, mas permite também particularidade em cada tipo de carro.

## I - Interface Segregation Principle
- Violacao encontrada: A interface Animal define métodos que não são utilizados em todas as classes filhas.
- Refatoracao aplicada: Definir interfaces únicas e específicas para cada característica, dessa forma, atribuir em cada objeto as interfaces e características que fazem sentido.
- Insight: Isso permite maior flexibilidade das classes. Fora isso, adicione uma classe abstrata animal que possuí um método geral e permite editar o nome do animal de forma dinâmica na hora de criar o objeto.

## D - Dependency Inversion Principle
- Violacao encontrada: Em `birthday-greeter.ts`, o método de greeting cria uma nova instância de EmailSender (`new EmailSender().send(email)`), dessa forma ele depende de uma entidade de classe mais baixo.
- Refatoracao aplicada: Adicione emailSender como uma propriedade da classe, aplicando um tipo de EmailSender que possui o método `.send()`, isso permite a injeção de dependências
- Insight: Para esse processo é necessário: iniciar a variável passando a interface desejada, inserir e aplicar um valor no constructor para essas váriavel tipadas. Depois, utilizar asos métodos das dependências de forma genérica.