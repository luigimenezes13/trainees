import TransactionRepository from './transaction-repository';
import { StatementPrinter } from './statement-printer';
import Transaction from './transaction';
import Clock from './clock';


class AccountService {

  private transactionRepository: TransactionRepository;
  private statementPrinter: StatementPrinter;
  private clock: Clock

  constructor(
    transactionRepository: TransactionRepository,
    statementPrinter: StatementPrinter,
    clock: Clock
  ) {
    this.transactionRepository = transactionRepository;
    this.statementPrinter = statementPrinter;
    this.clock = clock
  }

  public deposit(amount: number): void {
    this.transactionRepository.add(this.transactionWith(amount));
  }

  public withdraw(amount: number): void {
    this.transactionRepository.add(this.transactionWith(-amount));
  }

  public printStatement(): void {
    this.statementPrinter.printHeader();
    this.statementPrinter.printTransations(this.transactionRepository);
  }

  private transactionWith(amount: number): Transaction {
    return new Transaction(this.clock.today(), amount);
  }

}

export default AccountService;
