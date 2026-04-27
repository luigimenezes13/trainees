
import { CreateMissionData } from "./mission.schema.js";
import { MissionRow } from "../../database/types.js";
import { pool } from "../../database/client.js";

export async function createMission(data: CreateMissionData):Promise<MissionRow> {
    
    try{
    const {rows} = await pool.query<MissionRow>(
        `
            INSERT INTO missions (astronaut_id, supply_id)
            VALUES ($1,$2)
            RETURNING *
        `,
        [data.astronautId, data.supplyId]
    )
    return rows[0]
}catch(error: any){
    if(error.code === 23503){
        throw new Error("O astronauta ou supply enviado não existe")
    }
    throw Error
}
}