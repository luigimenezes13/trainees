

import Transaction from "./transaction";
import Console from "./console";
export class Printer {


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