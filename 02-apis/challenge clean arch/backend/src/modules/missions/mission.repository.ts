import { pool } from "../../infra/database/client.js";
import { resolvePagination } from "../../shared/pagination.js";
import type { MissionRow } from "../../infra/database/types.js";
import type { CreateMissionData, FindMissionParams } from "../missions/mission.schema.js";
import { Error404 } from "../../Error404.js"
import { findSupplyById } from "../supplies/supply.repository.js";
import { findAstronautById } from "../astronauts/astronaut.repository.js";

export interface MissionResult {
    data: MissionRow[];
    pagination: {
        page: number;
        limit: number;
    };
}

export async function findMissions(params: FindMissionParams): Promise<MissionResult> {
    const { page, limit, offset } = resolvePagination({ page: params.page, limit: params.limit, maxLimit: 50 });

    const dataResult = await pool.query<MissionRow>(
        `SELECT * FROM missions
      ORDER BY id LIMIT $1 OFFSET $2`,
        [limit, offset]
    )

    if (dataResult.rows.length <= 0)
        throw new Error404("Missões", "NADA FOI ENCONTRADO")

    return {
        data: dataResult.rows,
        pagination: { page, limit }
    }
}

export async function createMission(data: CreateMissionData): Promise<MissionRow> {

    const { rows } = await pool.query<MissionRow>(
        `INSERT INTO missions (titulo, astronauta_id, supply_id)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [data.titulo, data.astronautId, data.supplyId]
    );
    return rows[0];
}