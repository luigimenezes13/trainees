import { Mission } from "../../domain/aggregates/Mission.js";
import { Astronaut } from "../../domain/entities/Astronaut.js";
import { Supply } from "../../domain/entities/Supply.js";
import { NaoEncontradoErro } from "../../domain/errors/errors.js";
import { AstronautRepository } from "../../domain/repositories/astronautRepository.js";
import { MissionRepository } from "../../domain/repositories/missionRepository.js";
import { SupplyRepository } from "../../domain/repositories/supplyRepository.js";
import { UseCase } from "../../domain/value-objects/UseCase.js";
import { CreateMissionDto } from "../dto/CreateMissionDto.js";



export class CreateMissionUseCase implements UseCase<CreateMissionDto,Promise<Mission>> {
    constructor(
        private missionRepository: MissionRepository,
        private astronautRepository: AstronautRepository,
        private supplyRepository: SupplyRepository
    ) {}

    async execute(data: CreateMissionDto): Promise<Mission> {
        const astronauts = await Promise.all(
            data.astronautIds.map(id => this.astronautRepository.findById(id))
        );
        astronauts.forEach((astronaut, index) => {
            if (!astronaut) {
                throw new NaoEncontradoErro("Astronauta", data.astronautIds[index]);
            }
        });

        
        const supplies = await Promise.all(
            data.supplyIds.map(id => this.supplyRepository.findById(id))
        );

        supplies.forEach((supply, index) => {
            if (!supply) {
                throw new NaoEncontradoErro("Suprimento", data.supplyIds[index]);
            }
        });

        const mission = Mission.create(
            astronauts as Astronaut[], 
            supplies as Supply[]
        );
        const createdMission = await this.missionRepository.create(mission);
        
        return createdMission;
        
       
    }
}