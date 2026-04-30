import { Supply } from "../../domain/entities/Supply.js";
import { NaoEncontradoErro } from "../../domain/errors/errors.js";
import { SupplyRepository } from "../../domain/repositories/supplyRepository.js";
import { UpdateSupplyDto } from "../dto/UpdateSupplyDto.js";

export class UpdateSupplyUseCase {
    constructor(private supplyRepository: SupplyRepository) { }

    async execute(id: string, data: UpdateSupplyDto): Promise<Supply> {

        const supply = await this.supplyRepository.findById(id)
        if (!supply) {
            throw new NaoEncontradoErro("Suprimento", id)
        }
        const mergedProps = {
            ...supply.props,
            ...Object.fromEntries(
                Object.entries(data).filter(([, v]) => v !== undefined)
            ),
        };
        const updatedAstronaut = new Supply(mergedProps, supply.id.value)
        return await this.supplyRepository.update(updatedAstronaut, id)
    }


}