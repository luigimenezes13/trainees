import { Engineer, Manager } from '../src/employee';

describe('employee', () => {
  const BONUS: number = 100;
  const SALARY: number = 1000;

  it('should not add bonus to the engineer pay amount', () => {
    const employee = new Engineer(SALARY, BONUS);
    expect(employee.payAmount()).toEqual(SALARY);
  });

  it('should add bonus to the manager pay amount', () => {
    const employee = new Manager(SALARY, BONUS);
    expect(employee.payAmount()).toEqual(SALARY + BONUS);
  });
});
