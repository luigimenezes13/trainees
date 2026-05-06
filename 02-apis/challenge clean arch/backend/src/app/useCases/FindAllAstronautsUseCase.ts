import { UseCase } from "../../domain/value-objects/UseCase.js"
import { Astronaut } from "../../domain/entities/Astronaut.js"
import { AstronautRepository, AstronautResult } from "../../domain/repositories/astronautRepository.js"
import { Query } from "../../domain/value-objects/Query.js";
import { NotFound } from "../../domain/errors/errors.js";


export class FindAllAstronautsUseCase implements UseCase<Query, Promise<AstronautResult>> {

    constructor(private astronautRepository: AstronautRepository) { }

    async execute(query: Query): Promise<AstronautResult> {
        const astronauts = await this.astronautRepository.find(query)

        if (!astronauts.data) {
            throw new NotFound("Astronautas", "Astronautas")
        }

        return astronauts

    }

}

