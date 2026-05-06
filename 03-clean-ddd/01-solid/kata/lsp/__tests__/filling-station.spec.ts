import FillingStation from '../src/filling-station';
import PetrolCar from '../src/petrol-car';
import ElectricCar from '../src/electric-car';

describe('filling station', () => {
  const FULL: number = 100;
  const fillingStation: FillingStation = new FillingStation();

  it('should refuel a petrol car', () => {
    const car: PetrolCar = new PetrolCar();

    fillingStation.refuelEnergy(car);

    expect(car.getFuelTankLevel()).toEqual(FULL);
  });

  it('should not fail refueling an electric car', () => {
    const car: ElectricCar = new ElectricCar();

    expect(() => fillingStation.refuelEnergy(car)).not.toThrow();
  });

  it('should recharge an electric car', () => {
    const car: ElectricCar = new ElectricCar();

    fillingStation.refuelEnergy(car);

    expect(car.getBatteryLevel()).toEqual(FULL);
  });

  it('should not fail recharging a petrol car', () => {
    const car: PetrolCar = new PetrolCar();
    expect(() => fillingStation.refuelEnergy(car)).not.toThrow();
  });
});
