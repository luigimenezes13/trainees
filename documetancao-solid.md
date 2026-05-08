# Documentação do Exercício SOLID

Este arquivo mostra o que aprendi ao realizar os exercícios de SOLID.
Cada exercício apresenta um código que não segue um dos princípios do SOLID.
O objetivo é transformar o código para que ele siga o princípio proposto.

## Exercício 1 - Single Responsibility Principle (S)

Esse princípio diz que cada classe deve ter apenas um motivo para mudar.
Ou seja, cada classe deve ter uma única responsabilidade. Isso não significa
que cada classe deve fazer apenas uma coisa.

Exemplo:
quando criamos um `repository`, colocamos em uma classe a responsabilidade de
fazer requisições ao banco de dados.
Note que um `repository` pode ter várias funções, como criar e deletar dados,
mas continua com uma única responsabilidade: fazer requisições ao banco.

### Descrição do exercício

No exercício, temos 5 arquivos diferentes:

- `transaction.ts`: uma classe com os atributos `date` (data) e `ammount` (quantidade).
- `transaction-repository.ts`: uma interface que define as funções `Add` e `All`.
- `console.ts`: uma classe com o método `printLine`.
- `clock.ts`: uma classe com o método `today`, que retorna a data atual.
- `AccountService`: uma classe com vários métodos:
`deposit`, `withdraw`, `printStatement`, `printHeader`, `transactionWith`, `formatData` e `formatNumber`.

### Por que o código não segue o princípio?

O principal problema no código é a classe `AccountService`, que tem duas responsabilidades:

- Gerenciar transações
- Cuidar de todo o processo de impressão do extrato

Exemplo:

```typescript
import TransactionRepository from './transaction-repository';
import Clock from './clock';
import Console from './console';
import Transaction from './transaction';

class AccountService {
  private STATEMENT_HEADER: string = 'DATE | AMOUNT | BALANCE';

  private transactionRepository: TransactionRepository;
  private clock: Clock;
  private console: Console;

  constructor(
    transactionRepository: TransactionRepository,
    clock: Clock,
    console: Console
  ) {
    this.transactionRepository = transactionRepository;
    this.clock = clock;
    this.console = console;
  }
  // Função de criar transação de depósito (responsabilidade 1)
  public deposit(amount: number): void {
    this.transactionRepository.add(this.transactionWith(amount));
  }

  // Função de criar transação de retirada (responsabilidade 1)
  public withdraw(amount: number): void {
    this.transactionRepository.add(this.transactionWith(-amount));
  }

  //Função de imprimir declaração (responsabilidade 1)
  public printStatement(): void {
    this.printHeader();
    this.printTransactions();
  }

  //Função que imprime cabeçalho da declaração (responsabilidade 2)
  private printHeader() {
    this.printLine(this.STATEMENT_HEADER);
  }

  //Função que imprime corpo da declaração (responsabilidade 2)
  private printTransactions() {
    const transactions: Transaction[] = this.transactionRepository.all();
    let balance = 0;

    transactions
      .map(transaction => {
        balance += transaction.getAmount();
        return this.statementLine(transaction, balance);
      })
      .forEach(statement => this.printLine(statement));
  }

  //Função de criar nova transação (Responsabilidade 1)
  private transactionWith(amount: number): Transaction {
    return new Transaction(this.clock.today(), amount);
  }

//Função de imprimir linha com dados formatados (responsabilidade 2)
  private statementLine(transaction: Transaction, balance: number) {
    const formattedDate = this.formatDate(transaction.getDate());
    const formattedAmmount = this.formatNumber(transaction.getAmount());
    const formattedBalance = this.formatNumber(balance);

    return `${formattedDate} | ${formattedAmmount} | ${formattedBalance}`;
  }

  //Função de formatar data (responsabilidade 2)
  private formatDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

 //Função de formatar número (responsabilidade 2)
  private formatNumber(amount: number): string {
    return amount.toFixed(2);
  }

  //Função de imprimir linha (responsabilidade 2)
  private printLine(line: string) {
    this.console.printLine(line);
  }
}

export default AccountService;
```

### Resolução

Para fazer com que o código siga o princípio, precisamos separar as responsabilidades
da classe `AccountService`. Para isso, criamos uma nova classe para cuidar do
processo de impressão da declaração.

Nova classe:

```typescript
import Transaction from "./transaction";
import Console from "./console";
export class StatementPrinter {


    // Propriedades console e STAMENT_HEADER foram tiradas do AccountService e movidas para essa classe
    private console: Console
    private STATEMENT_HEADER: string = 'DATE | AMOUNT | BALANCE';

    constructor(console: Console, STATEMENT_HEADER: string) {
        this.console = console
        this.STATEMENT_HEADER = STATEMENT_HEADER
    }


    public printStatement(transactions: Array<Transaction>): void {
        this.printHeader();
        this.printTransactions(transactions);
    }

    private printHeader() {
        this.printLine(this.STATEMENT_HEADER);
    }

    private printTransactions(transactions: Array<Transaction>) {
        let balance = 0;

        transactions
            .map(transaction => {
                balance += transaction.getAmount();
                return this.statementLine(transaction, balance);
            })
            .forEach(statement => this.printLine(statement));
    }

    private printLine(line: string) {
        this.console.printLine(line);
    }

    private statementLine(transaction: Transaction, balance: number) {
        const formattedDate = this.formatDate(transaction.getDate());
        const formattedAmmount = this.formatNumber(transaction.getAmount());
        const formattedBalance = this.formatNumber(balance);

        return `${formattedDate} | ${formattedAmmount} | ${formattedBalance}`;
    }


    private formatDate(date: Date): string {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    private formatNumber(amount: number): string {
        return amount.toFixed(2);
    }

}
```

Com essa classe, podemos remover de `AccountService` os métodos e propriedades que
cuidavam da impressão de declarações.

```typescript

import TransactionRepository from './transaction-repository';
import Clock from './clock';
import Console from './console';
import Transaction from './transaction';
import { StatementPrinter } from './statement-printer';

class AccountService {
  //private STATEMENT_HEADER: string = 'DATE | AMOUNT | BALANCE';
  private transactionRepository: TransactionRepository;
  private clock: Clock;
  private statementPrinter: StatementPrinter
  //private console: Console;

  constructor(
    transactionRepository: TransactionRepository,
    clock: Clock,
    /*
        Adicionamos uma propriedade da classe de StatementPrinter (classe nova que criamos)
        para utiliza-lá quando precisamos imprimir uma declaração
    */
    statementPrinter: StatementPrinter
    
  ) {
    this.transactionRepository = transactionRepository;
    this.clock = clock;
    this.statementPrinter = statementPrinter
    //this.console = console;
  }

  public deposit(amount: number): void {
    this.transactionRepository.add(this.transactionWith(amount));
  }

  public withdraw(amount: number): void {
    this.transactionRepository.add(this.transactionWith(-amount));
  }

  /*
  public printStatement(): void {
    this.printHeader();
    this.printTransactions();
  }
  */
  /*
  private printHeader() {
    this.printLine(this.STATEMENT_HEADER);
  }
  */

  //Utilizamos esta função para chamar a classe statementPrinter e imprimir a declaração!
  public printStatement() {
    const transactions: Transaction[] = this.transactionRepository.all();
    this.statementPrinter.printStatement(transactions)
  }

  
  private transactionWith(amount: number): Transaction {
    return new Transaction(this.clock.today(), amount);
  }

  /*
  private printTransactions(transactions: Array<Transaction>) {
        let balance = 0;

        transactions
            .map(transaction => {
                balance += transaction.getAmount();
                return this.statementLine(transaction, balance);
            })
            .forEach(statement => this.printLine(statement));
    }

 */
  /*
  private statementLine(transaction: Transaction, balance: number) {
    const formattedDate = this.formatDate(transaction.getDate());
    const formattedAmmount = this.formatNumber(transaction.getAmount());
    const formattedBalance = this.formatNumber(balance);

    return `${formattedDate} | ${formattedAmmount} | ${formattedBalance}`;
  }
  */

  /*
  private formatDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  private formatNumber(amount: number): string {
    return amount.toFixed(2);
  }
  */

  /*
  private printLine(line: string) {
    this.console.printLine(line);
  }
*/

}

export default AccountService;


```

## Exercício 2 - Open/Closed Principle (O)

O Open/Closed Principle define que entidades de software devem estar abertas para
extensão, mas fechadas para modificação. Ou seja, podemos adicionar novos recursos
sem mexer no código original.

### Descrição do exercício

O exercício apresenta 2 arquivos:

- `employee-type.ts`: apresenta um enum com os tipos de `employee` (`MANAGER` e `ENGINEER`).
- `employee.ts`: apresenta uma classe `employee` com o método `payAmount`.

### Por que o código não segue o princípio?

O código não segue o princípio, pois a classe `employee` precisa ser modificada
sempre que um novo tipo de funcionário é adicionado.

```typescript
import EmployeeType from './employee-type';

class Employee {
  private salary: number;
  private bonus: number;
  private type: EmployeeType;

  constructor(salary: number, bonus: number, type: EmployeeType) {
    this.salary = salary;
    this.bonus = bonus;
    this.type = type;
  }


  public payAmount(): number {
    /* Para cada tipo de funcionário novo, precisamos modificar essa classe, 
    adicionando um novo case no switch
    */
    switch (this.type) {
      case EmployeeType.ENGINEER:
        return this.salary;
      case EmployeeType.MANAGER:
        return this.salary + this.bonus;
      default:
        return 0;
    }
  }
}

export default Employee;
```

### Resolução

Para fazer o código seguir o princípio, precisamos transformar a classe `employee`
em uma interface.

```typescript
export interface Employee{
    payAmount(): number   
}
```

Desta forma, se for necessário adicionar um novo tipo de funcionário, podemos
criar uma classe que implemente essa interface, evitando modificações na estrutura existente.
Na resolução, foram adicionados os tipos que estavam na antiga classe `employee`
(`MANAGER` e `ENGINEER`).

`manager.ts`

```typescript
import { Employee } from "./employee";
export class Manager implements Employee{
  private salary: number;
  private bonus: number;

  constructor(salary: number, bonus: number) {
    this.salary = salary;
    this.bonus = bonus;
  }

    //Lógica de pagamento do Manager
    public payAmount(): number {
        return this.salary + this.bonus
    }
}
```

`engineer.ts`

```typescript

import { Employee } from "./employee";
export class Engineer implements Employee{
  private salary: number;
  private bonus: number;

  constructor(salary: number, bonus: number) {
    this.salary = salary;
    this.bonus = bonus;
  }

    public payAmount(): number {
        return this.salary
    }
}
```

## Exercício 3 - Liskov Substitution Principle (L)

Esse princípio diz que, se uma classe é filha de outra, ela deve manter as
funcionalidades da classe pai, podendo ser substituída por ela sem quebrar o código.

### Descrição do exercício

O exercício apresenta 4 arquivos:

- `vehicle.ts`: classe abstrata com os métodos `startEngine`, `engineIsStarted`,
`stopEngine`, `fillUpWithFuel` e `chageBattery`.
- `petrol-car.ts`: classe filha da classe `Vehicle`.
- `eletric-car.ts`: classe filha da classe `Vehicle`.
- `filling-station.ts`: classe com os métodos `refuel` (para carros que usam combustível)
e `charge` (para carros elétricos).

### Por que o código não segue o princípio?

O código não segue o princípio porque os filhos da classe `Vehicle`
(`eletric-car.ts` e `petrol-car.ts`) não se comportam como a classe pai.

Classe `Vehicle`:

```typescript
abstract class Vehicle {
  private engineStarted: boolean = false;

  public startEngine(): void {
    this.engineStarted = true;
  }

  public engineIsStarted(): boolean {
    return this.engineStarted;
  }

  public stopEngine(): void {
    this.engineStarted = false;
  }
/*
  Note que aqui temos função específica para
  carros elétricos e para carros de combustível
*/
  abstract fillUpWithFuel(): void;

  abstract chargeBattery(): void;
}

export default Vehicle;
```

`petrol-car.ts`

```typescript
import Vehicle from './vehicle';

class PetrolCar extends Vehicle {
  private FUEL_TANK_FULL: number = 100;
  private fuelTankLevel: number = 0;

  public fillUpWithFuel(): void {
    this.fuelTankLevel = this.FUEL_TANK_FULL;
  }
  /*
  Carro de combustível não consegue implementar
  todas os métodos da classe vehicle sem ocorrer erro
  */
  public chargeBattery(): void {
    throw new Error('A petrol car cannot be recharged');
  }

  public getFuelTankLevel(): number {
    return this.fuelTankLevel;
  }
}

export default PetrolCar;
```

`eletric-car.ts`

```typescript
import Vehicle from './vehicle';

class ElectricCar extends Vehicle {
  private BATTERY_FULL: number = 100;
  private batteryLevel: number;

    /*
    Carro elétrico não consegue implementar
    todas os métodos da classe vehicle sem ocorrer erro
    */
  public fillUpWithFuel(): void {
    throw new Error("It's an electric car");
  }

  public chargeBattery(): void {
    this.batteryLevel = this.BATTERY_FULL;
  }

  public getBatteryLevel(): number {
    return this.batteryLevel;
  }
}

export default ElectricCar;
```

`filling-station.ts`

```typescript
import Vehicle from './vehicle';
import PetrolCar from './petrol-car';
import ElectricCar from './electric-car';

/*
Como os filhos da classe vehicle não implementam todos
os métodos, foi necessário criar um método para cada
tipo de veículo na classe FillingStation

*/
class FillingStation {
  public refuel(vehicle: Vehicle): void {
    if (vehicle instanceof PetrolCar) {
      vehicle.fillUpWithFuel();
    }
  }

  public charge(vehicle: Vehicle): void {
    if (vehicle instanceof ElectricCar) {
      vehicle.chargeBattery();
    }
  }
}

export default FillingStation;

```

### Resolução

Para seguir o princípio, precisamos fazer com que os métodos da classe `vehicle`
funcionem para todos os veículos.

`vehicle.ts`

```typescript
abstract class Vehicle {
  private engineStarted: boolean = false;

  public startEngine(): void {
    this.engineStarted = true;
  }

  public engineIsStarted(): boolean {
    return this.engineStarted;
  }

  public stopEngine(): void {
    this.engineStarted = false;
  }

  //Adicionamos um método para reabastecer qualquer tipo de carro
  public abstract fill():void

  /*
    Retiramos métodos que reabastecem carros específicos
  */
  //abstract fillUpWithFuel(): void;

  //abstract chargeBattery(): void;
}

export default Vehicle;

```

`petrol-car.ts`

```typescript
import Vehicle from './vehicle';

class PetrolCar extends Vehicle {
  private FUEL_TANK_FULL: number = 100;
  private fuelTankLevel: number = 0;
  /*
    Implementamos a nova função na classe filho
  */
  public fill(): void {
    this.fuelTankLevel = this.FUEL_TANK_FULL;
  }

  public getFuelTankLevel(): number {
    return this.fuelTankLevel;
  }
}

export default PetrolCar;
```

`eletric-car.ts`

```typescript
import Vehicle from './vehicle';

class ElectricCar extends Vehicle {
  private BATTERY_FULL: number = 100;
  private batteryLevel: number;

/*
    Implementamos a nova função na classe filho
  */
  public fill(): void {
    this.batteryLevel = this.BATTERY_FULL;
  }

  public getBatteryLevel(): number {
    return this.batteryLevel;
  }
}

export default ElectricCar;
```

Como fizemos com que os filhos implementem corretamente a classe pai,
podemos usar apenas uma função para reabastecer o veículo na classe `filling-station`, fazendo com que o código fique mais simples.

`filling-station.ts`

```typescript
import Vehicle from './vehicle';
import PetrolCar from './petrol-car';
import ElectricCar from './electric-car';

class FillingStation {
  public fill(vehicle: Vehicle): void {
    vehicle.fill()
  }

}

export default FillingStation;

```

## Exercício 4 - Interface Segregation Principle (I)

Esse princípio diz que uma classe não deve ser forçada a implementar
métodos que ela não utiliza.

### Descrição do exercício

O exercício apresenta 3 arquivos:

- `animal.ts`: uma interface com os métodos `fly`, `run` e `bark`.
- `bird.ts`: uma classe que implementa `animal`.
- `dog.ts`: uma classe que implementa `animal`.

### Por que o código não segue o princípio?

O código não segue o princípio, pois as classes `bird` e `dog` são forçadas
a implementar métodos da interface `animal` que não utilizam.

`animal.ts`

```typescript
interface Animal {
 /*
    A interface apresenta métodos que 
    não são utilizados por todos os animais
 */
  fly(): void;
  run(): void;
  bark(): void;
}

export default Animal;
```

`bird.ts`

```typescript
import Animal from './animal';

class Bird implements Animal {
  //A classe bird não está utilizando o método bark
  public bark(): void {}

  public run(): void {
    console.log('Bird is running');
  }

  public fly(): void {
    console.log('Bird is flying');
  }
}

export default Bird;

```

`dog.ts`

```typescript
import Animal from './animal';

class Dog implements Animal {
  //A classe dog não está utilizando o método fly
  public fly(): void {}

  public run(): void {
    console.log('Dog is running');
  }

  public bark(): void {
    console.log('Dog is barking');
  }
}

export default Dog;

```

### Resolução

Para seguir o princípio, precisamos separar a interface `Animal` em múltiplas
interfaces. Dessa forma, as classes `bird` e `dog` não serão forçadas a
implementar métodos que não utilizam.

`airanimal.ts`

```typescript
export interface AirAnimal{
  //separamos o método fly da interface animal
    fly(): void
}

```

`barkanimal.ts`

```typescript
// Separamos o método bark da interface animal
export interface BarkAnimal{
    bark(): void
}
```

`runneranimal.ts`

```typescript
//Separamos o método run da interface animal
interface RunnerAnimal {
  run(): void;
}
export default RunnerAnimal;

```

`bird.ts`

```typescript
import RunnerAnimal from './runneranimal';
import { AirAnimal } from './airanimal';

// Só implementamos as interfaces que a classe irá utilizar 
// Desta forma, a classe bird não implementa métodos que ela não utiliza
class Bird implements RunnerAnimal,AirAnimal {

  public run(): void {
    console.log('Bird is running');
  }

  public fly(): void {
    console.log('Bird is flying');
  }
}

export default Bird;

```

`dog.ts`

```typescript
import RunnerAnimal from './runneranimal';
import { BarkAnimal } from './barkanimal';
// Só implementamos as interfaces que a classe irá utilizar
// Assim, a classe dog não implementa métodos não utilizados
class Dog implements RunnerAnimal,BarkAnimal {

  public run(): void {
    console.log('Dog is running');
  }

  public bark(): void {
    console.log('Dog is barking');
  }
}

export default Dog;

```

## Exercício 5 - Dependency Inversion Principle (D)

Esse princípio diz que módulos de alto nível não devem depender de módulos de
baixo nível. Ambos devem depender de abstrações.

### Descrição do exercício

Esse exercício apresenta sete arquivos:

- `month-day.ts`: uma classe que define uma data com dia e mês.
- `employee.ts`: uma classe que define um funcionário.
- `employee-repository`: uma interface que define o método `findEmployeesBornOn`.
- `email.ts`: uma classe que define um e-mail.
- `emailsender`: uma classe que define um método para enviar um e-mail.
- `clock`: uma classe com um método para obter a data atual.
- `birthday`: uma classe com métodos para enviar e-mails para os funcionários
nascidos no dia e para criar e-mail de aniversário.

### Por que o código não segue o princípio?

O código não segue o princípio, pois a classe `BirthdayGreeter` (alto nível)
está utilizando a dependência concreta `EmailSender`.

`birthday-greeter.ts`

```typescript
import EmployeeRepository from './employee-repository';
import Clock from './clock';
import MonthDay from './month-day';
import Employee from './employee';
import Email from './email';
import EmailSender from './email-sender';

class BirthdayGreeter {
  private employeeRepository: EmployeeRepository;
  private clock: Clock;

  constructor(employeeRepository: EmployeeRepository, clock: Clock) {
    this.employeeRepository = employeeRepository;
    this.clock = clock;
  }

  public sendGreetings(): void {
    const today: MonthDay = this.clock.monthDay();
    this.employeeRepository
      .findEmployeesBornOn(today)
      .map(employee => this.emailFor(employee))
      // Aqui estamos utilizando diretamente o EmailSender, sem abstração
      .forEach(email => new EmailSender().send(email));
  }

  private emailFor(employee: Employee): Email {
    const message: string = `Happy birthday, dear ${employee.getFirstName()}!`;
    return new Email(employee.getEmail(), 'Happy birthday!', message);
  }
}

export default BirthdayGreeter;
```

### Resolução

Para deixar o código alinhado ao princípio, precisamos criar uma abstração para
a classe `EmailSender`.

`email-sender.ts`

```typescript
import Email from './email';
import { Sender } from './sender';
import Employee from './employee';
class EmailSender implements Sender{

  public send(employee: Employee) {
    const email = this.emailFor(employee)
    console.log(
      `To: ${email.getTo()}, Subject: ${email.getSubject()}, Message: ${email.getMessage()}`
    );
  }

  private emailFor(employee: Employee): Email {
    const message: string = `Happy birthday, dear ${employee.getFirstName()}!`;
    return new Email(employee.getEmail(), 'Happy birthday!', message);
  }
}

export default EmailSender;
```

Abstração de `EmailSender`:

`sender.ts`

```typescript
import Employee from "./employee"

export interface Sender{
    send(employee: Employee): void
}
```

Agora, utilizamos a abstração em vez de usar `EmailSender` diretamente.

`birthday-greeter.ts`

```typescript
import EmployeeRepository from './employee-repository';
import Clock from './clock';
import MonthDay from './month-day';
import Employee from './employee';
import Email from './email';
import EmailSender from './email-sender';
import { Sender } from './sender';

class BirthdayGreeter {
  private employeeRepository: EmployeeRepository;
  private clock: Clock;
  //Colocamos a abstração como propriedade
  private sender: Sender

  constructor(employeeRepository: EmployeeRepository, clock: Clock, sender: Sender) {
    this.employeeRepository = employeeRepository;
    this.clock = clock;
    this.sender = sender
  }

  public sendGreetings(): void {
    const today: MonthDay = this.clock.monthDay();
    this.employeeRepository
      .findEmployeesBornOn(today)
      //Utilizando abstração 
      .forEach(employee => this.sender.send(employee));
  }


}

export default BirthdayGreeter;

```

