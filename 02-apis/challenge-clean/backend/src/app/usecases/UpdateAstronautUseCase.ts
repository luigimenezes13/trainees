import { Astronaut } from "../../domain/entities/Astronaut.js";
import { NaoEncontradoErro } from "../../domain/errors/errors.js";
import { AstronautRepository } from "../../domain/repositories/astronautRepository.js";
import { UpdateAstronautDto } from "../dto/UpdateAstronautDto.js";


export class UpdateAstronautUseCase{
    constructor(private astronautRepository: AstronautRepository){}
    async execute(data: UpdateAstronautDto,id: string){
        const astronaut = await this.astronautRepository.findById(id)
        if(!astronaut){
            throw new NaoEncontradoErro("Astronauta",id)
        }
        const mergedProps = {
            ...astronaut.props,
            ...Object.fromEntries(
              Object.entries(data).filter(([, v]) => v !== undefined)
            ),
          };
        const updatedAstronaut = new Astronaut(mergedProps,astronaut.id.value)
        return await this.astronautRepository.update(updatedAstronaut,id)
        
    }
}