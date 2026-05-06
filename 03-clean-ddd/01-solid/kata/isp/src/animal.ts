export abstract class Animal{
  animal: string

  constructor(animal: string ){
    this.animal = animal
  }

  about() {
    console.log(`Cara, isso claramente é um ${this.animal}`)
  }

}

export interface Flyable{
  fly(): void
}

export interface Runnable{
  run(): void
}

export interface Barkable{
  bark(): void
}



