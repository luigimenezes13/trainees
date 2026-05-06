import { UseCase} from "../../domain/value-objects/UseCase.js"
import { Astronaut } from "../../domain/entities/Astronaut.js"
import { AstronautRepository } from "../../domain/repositories/astronautRepository.js"
import { NotFound } from "../../domain/errors/errors.js";



export class FindAstronautByIdUseCase implements UseCase<string, Promise<Astronaut>>{

    constructor(private astronautRepository: AstronautRepository){}

    async execute(id: string): Promise<Astronaut> {

        const astronaut = await this.astronautRepository.findById(id);
        if (!astronaut)
            throw new NotFound(`ID ${id}`, "Astronautas")
        
        return astronaut;
    }

}

