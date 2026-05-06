import Vehicle from './vehicle';

class ElectricCar extends Vehicle {
  private BATTERY_FULL: number = 100;
  private batteryLevel: number = 0;

  public completeEnergy(): void {
    this.batteryLevel = this.BATTERY_FULL;
  }

  public getBatteryLevel(): number {
    return this.batteryLevel;
  }
}

export default ElectricCar;
