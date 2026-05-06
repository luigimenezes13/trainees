import {Runnable, Barkable, Animal} from './animal';

class Dog extends Animal implements Runnable, Barkable {

  public run(): void {
    console.log(`${this.animal} is running`);
  }

  public bark(): void {
    console.log(`${this.animal} is barking`);
  }
}

export default Dog;
