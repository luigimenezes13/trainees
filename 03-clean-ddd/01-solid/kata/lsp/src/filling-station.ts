import Vehicle from './vehicle';

class FillingStation {
  public refuelEnergy(vehicle: Vehicle): void {
      vehicle.completeEnergy();
  }

}

export default FillingStation;
