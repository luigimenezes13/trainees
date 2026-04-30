import { Mission } from "../aggregates/Mission.js";

export interface MissionRepository{
    create(data: Mission): Promise<Mission>
}