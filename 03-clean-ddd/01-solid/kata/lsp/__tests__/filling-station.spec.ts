import FillingStation from '../src/filling-station';
import PetrolCar from '../src/petrol-car';
import ElectricCar from '../src/electric-car';

describe('filling station', () => {
  const FULL: number = 100;
  const fillingStation: FillingStation = new FillingStation();

  it('should fill a petrol car', () => {
    const car: PetrolCar = new PetrolCar();

    fillingStation.fill(car);

    expect(car.getFuelTankLevel()).toEqual(FULL);
  });

  it('should not fail filling an electric car', () => {
    const car: ElectricCar = new ElectricCar();

    expect(() => fillingStation.fill(car)).not.toThrow();
  });

  it('should refill an electric car', () => {
    const car: ElectricCar = new ElectricCar();

    fillingStation.fill(car);

    expect(car.getBatteryLevel()).toEqual(FULL);
  });

  it('should not fail recharging a petrol car', () => {
    const car: PetrolCar = new PetrolCar();
    expect(() => fillingStation.fill(car)).not.toThrow();
  });
});
