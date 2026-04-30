
import { CreateAstronautDto } from "../dto/CreateAstronautDto.js";
import { AstronautRepository } from "../../domain/repositories/astronautRepository.js";
import { Astronaut, AstronautProps } from "../../domain/entities/Astronaut.js";
import { UseCase } from "../../domain/value-objects/UseCase.js";

export class CreateAstronautUseCase implements UseCase<CreateAstronautDto,Promise<Astronaut>>{
    constructor(private astronautRepository: AstronautRepository){}

    async execute(data: CreateAstronautDto):Promise<Astronaut>{
        const props: AstronautProps = {...data, status: 'active'}
        const astronaut = new Astronaut(props)
        const createdAstronaut = await this.astronautRepository.create(astronaut)
        return createdAstronaut
    }
}