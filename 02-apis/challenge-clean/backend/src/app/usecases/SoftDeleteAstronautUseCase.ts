import { NaoEncontradoErro } from "../../domain/errors/errors.js";
import { AstronautRepository } from "../../domain/repositories/astronautRepository.js";


export class SoftDeleteAstronautUseCase{
    
    constructor(private astronautRepository: AstronautRepository){}

    async execute(id: string){
        const isDeleted = await this.astronautRepository.softDelete(id)
        if(!isDeleted){
            throw new NaoEncontradoErro("Astronauta", id)
        }
        return isDeleted
    }
}