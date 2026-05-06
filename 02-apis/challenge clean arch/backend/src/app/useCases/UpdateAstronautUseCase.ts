import { UseCase } from "../../domain/value-objects/UseCase.js"
import { Astronaut } from "../../domain/entities/Astronaut.js"
import { AstronautRepository } from "../../domain/repositories/astronautRepository.js"
import { NotFound } from "../../domain/errors/errors.js";
import { UpdateAstronautDto } from "../dto/UpdateAstronautDto.js";

export class UpdateAstronautUseCase implements UseCase<UpdateAstronautDto, Promise<Astronaut>> {

    constructor(private astronautRepository: AstronautRepository) { }

    async execute(data: UpdateAstronautDto): Promise<Astronaut> {

        const astronaut = await this.astronautRepository.findById(data.id);
        if (!astronaut)
            throw new NotFound(`ID ${data.id}`, "Astronautas")

        const updatedAstronaut = await this.astronautRepository.update(data)

        return updatedAstronaut

    }

}

