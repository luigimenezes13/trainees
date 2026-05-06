import {Animal, Flyable, Runnable} from './animal';

class Bird extends Animal implements Flyable, Runnable {

  public fly(): void {
    console.log(`${this.animal} is flying`);
  }

  public run(): void {
    console.log(`${this.animal} is running`);
  }
}

export default Bird;
