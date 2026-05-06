import Bird from '../src/bird';

describe('bird', () => {
  const bird: Bird = new Bird("Bird");
  let fakeConsoleLog: jest.SpyInstance;

  beforeEach(() => {
    fakeConsoleLog = jest.spyOn(console, 'log').mockImplementation();
  });

  afterAll(() => {
    fakeConsoleLog.mockRestore();
  });

  it('should run', () => {
    bird.run();

    expect(console.log).toBeCalledWith('Bird is running');
  });

  it('should fly', () => {
    bird.fly();

    expect(console.log).toBeCalledWith('Bird is flying');
  });

  it('should know it name', () => {
    bird.about();

    expect(console.log).toBeCalledWith('Cara, isso claramente é um Bird');
  });
});
