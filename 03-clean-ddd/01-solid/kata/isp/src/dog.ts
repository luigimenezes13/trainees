import RunnerAnimal from './runneranimal';
import { BarkAnimal } from './barkanimal';
class Dog implements RunnerAnimal,BarkAnimal {

  public run(): void {
    console.log('Dog is running');
  }

  public bark(): void {
    console.log('Dog is barking');
  }
}

export default Dog;
