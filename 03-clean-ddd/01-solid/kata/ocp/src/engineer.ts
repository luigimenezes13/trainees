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