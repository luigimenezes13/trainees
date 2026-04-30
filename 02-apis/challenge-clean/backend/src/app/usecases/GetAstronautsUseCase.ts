import { AstronautRepository } from "../../domain/repositories/astronautRepository.js";
import { Query } from "../../domain/value-objects/Query.js";
import { AstronautsResult } from "../../domain/repositories/astronautRepository.js";
export class GetAstronautsUseCase{
    constructor(private astronautRepository: AstronautRepository){}

    async execute(query: Query): Promise<AstronautsResult>{
        const astronauts = await  this.astronautRepository.find(query)
        return astronauts
    }
}