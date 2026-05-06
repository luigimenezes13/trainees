import Vehicle from './vehicle';
import PetrolCar from './petrol-car';
import ElectricCar from './electric-car';

class FillingStation {
  public fill(vehicle: Vehicle): void {
    vehicle.fill()
  }

}

export default FillingStation;
