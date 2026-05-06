
import { Employee } from "./employee-type"

export class Engineer extends Employee {

  payAmount(): number {
    return this.salary
  }
}

export class Manager extends Employee {

  payAmount(): number {
    return this.salary + this.bonus
  }
}

