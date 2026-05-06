import Console from './console';
import Transaction from './transaction';
import TransactionRepository from './transaction-repository';

export class StatementPrinter {
    private STATEMENT_HEADER: string = 'DATE | AMOUNT | BALANCE';

    constructor(private readonly console: Console) {}

    public printHeader() {
        this.printerLine(this.STATEMENT_HEADER);
    }

    public printTransations(transactionRepository: TransactionRepository) {
        const transactions: Transaction[] = transactionRepository.all()

        let balance = 0;

        transactions
            .map(transaction => {
                balance += transaction.getAmount();
                return this.statementLine(transaction, balance);
            })
            .forEach(statement => this.printerLine(statement));
    }


    private printerLine(line: string) {
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