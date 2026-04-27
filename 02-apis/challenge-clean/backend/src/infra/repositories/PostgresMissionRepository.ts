import { Mission } from "../../domain/entities/Mission.js";
import { MissionRow } from "../../database/types.js";
import { pool } from "../../database/client.js";
import { MissionMapper } from "../mappers/MissionMappers.js";
import { MissionRepository } from "../../domain/repositories/missionRepository.js";

export class PostgresMissionRepositoy implements MissionRepository{
async create(data: Mission):Promise<Mission> {
    
    try{
    const {rows} = await pool.query<MissionRow>(
        `
            INSERT INTO missions (astronaut_id, supply_id)
            VALUES ($1,$2)
            RETURNING *
        `,
        [data.props.AstronautId, data.props.SupplyId]
    )
    return MissionMapper.toDomain(rows[0])
}catch(error: any){
    if(error.code === 23503){
        throw new Error("O astronauta ou supply enviado não existe")
    }
    throw Error
}
}
}