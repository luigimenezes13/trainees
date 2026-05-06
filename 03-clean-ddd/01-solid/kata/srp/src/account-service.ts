import TransactionRepository from './transaction-repository';
import Clock from './clock';
import Console from './console';
import Transaction from './transaction';
import { Printer } from './printer';

class AccountService {
  //private STATEMENT_HEADER: string = 'DATE | AMOUNT | BALANCE';

  private transactionRepository: TransactionRepository;
  private clock: Clock;
  private printer: Printer
  //private console: Console;

  constructor(
    transactionRepository: TransactionRepository,
    clock: Clock,
    printer: Printer
    
  ) {
    this.transactionRepository = transactionRepository;
    this.clock = clock;
    this.printer = printer
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

  
  public printStatement() {
    const transactions: Transaction[] = this.transactionRepository.all();
    this.printer.printStatement(transactions)
  }

  
  private transactionWith(amount: number): Transaction {
    return new Transaction(this.clock.today(), amount);
  }

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
