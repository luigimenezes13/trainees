import { SupplyRepository } from "../../domain/repositories/supplyRepository.js";
import { Supply } from "../../domain/entities/Supply.js";
import { CreateSupplyDto } from "../dto/CreateSupplyDto.js";


export class CreateSupplyUseCase{
    constructor(private supplyReposity: SupplyRepository){}
    
    async execute(data: CreateSupplyDto): Promise<Supply>{
        const supply = new Supply(data)
        const createdSupply = await this.supplyReposity.create(supply)
        return createdSupply
    }
}