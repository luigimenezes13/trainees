export abstract class Employee {
  protected salary: number;
  protected bonus: number;

  constructor(salary: number, bonus: number) {
    this.salary = salary;
    this.bonus = bonus;
  }

  abstract payAmount(): number 
  
}