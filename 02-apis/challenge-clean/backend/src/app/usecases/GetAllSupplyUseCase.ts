import { Supply } from "../../domain/entities/Supply.js";
import { SupplyRepository } from "../../domain/repositories/supplyRepository.js";




export class GetAllSupplyUseCase{
    constructor(private supplyRepository: SupplyRepository){}

    async execute(): Promise<Supply[]>{
        const supplies = await this.supplyRepository.getAll()
        return supplies
    }
}