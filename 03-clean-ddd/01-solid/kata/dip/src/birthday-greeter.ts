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
      .forEach(employee => this.sender.send(employee));
  }


}

export default BirthdayGreeter;
