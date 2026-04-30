
import { Supply } from "../../domain/entities/Supply.js";
import { NaoEncontradoErro } from "../../domain/errors/errors.js";
import { SupplyRepository } from "../../domain/repositories/supplyRepository.js";
export class GetByIdSupplyUseCase{
    constructor(private supplyRepository: SupplyRepository){}

    async execute(id: string): Promise<Supply>{
        const supply = await this.supplyRepository.findById(id)
        if(!supply){
            throw new NaoEncontradoErro("Suprimento",id)
        }
        return supply
    }
}