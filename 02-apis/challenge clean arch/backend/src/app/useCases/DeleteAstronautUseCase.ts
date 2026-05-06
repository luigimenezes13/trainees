import { UseCase } from "../../domain/value-objects/UseCase.js";
import { Astronaut } from "../../domain/entities/Astronaut.js";
import { AstronautRepository } from "../../domain/repositories/astronautRepository.js";
import { AstronautMapper } from "../../infra/mappers/AstronautMapper.js";
import { NotFound } from "../../domain/errors/errors.js";

export class DeleteAstronautUseCase implements UseCase<string, Promise<Astronaut>> {

    constructor(private astronautRepository: AstronautRepository) {}

    async execute(id: string): Promise<Astronaut> {

        const astronaut = await this.astronautRepository.softDelete(id);

        if (!astronaut){
            throw new NotFound(`ID ${id}`, "Astronautas")
        }

        return astronaut;
    }
}

