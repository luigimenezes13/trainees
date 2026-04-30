
import { NaoEncontradoErro } from "../../domain/errors/errors.js";
import { SupplyRepository } from "../../domain/repositories/supplyRepository.js";

export class DeleteSupplyUseCase{
    constructor(private supplyRepository: SupplyRepository){}

    async execute(id: string): Promise<boolean>{
        const isDeleted =await this.supplyRepository.delete(id)
        if(!isDeleted){
            throw new NaoEncontradoErro("Suprimento",id)
        }
        return isDeleted
    }
}