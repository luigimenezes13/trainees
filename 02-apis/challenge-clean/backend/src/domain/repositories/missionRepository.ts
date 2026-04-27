import { Mission } from "../entities/Mission.js";

export interface MissionRepository{
    create(data: Mission): Promise<Mission>
}