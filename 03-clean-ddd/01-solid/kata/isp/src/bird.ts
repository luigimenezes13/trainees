import RunnerAnimal from './runneranimal';
import { AirAnimal } from './airanimal';

class Bird implements RunnerAnimal,AirAnimal {

  public run(): void {
    console.log('Bird is running');
  }

  public fly(): void {
    console.log('Bird is flying');
  }
}

export default Bird;
