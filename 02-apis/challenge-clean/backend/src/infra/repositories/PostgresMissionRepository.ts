import { Mission } from "../../domain/aggregates/Mission.js";
import { MissionRepository } from "../../domain/repositories/missionRepository.js";
import type { MissionRow } from "../database/types.js";
import { pool } from "../database/client.js";
import { MissionMapper } from "../mappers/MissionMappers.js";

export class PostgresMissionRepository implements MissionRepository {
  async create(data: Mission): Promise<Mission> {
    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const missionQuery = `
        INSERT INTO missions (id) 
        VALUES ($1) 
      `;
      await client.query(missionQuery, [data.id.value]);

      for (const astronautId of data.props.astronautsId) {
        await client.query(
          `INSERT INTO mission_astronauts (mission_id, astronaut_id) VALUES ($1, $2)`,
          [data.id.value, astronautId.value]
        );
      }

      for (const supplyId of data.props.suppliesId) {
        await client.query(
          `INSERT INTO mission_supplies (mission_id, supply_id) VALUES ($1, $2)`,
          [data.id.value, supplyId.value]
        );
      }

      const missionResult = await client.query<MissionRow>(
        `SELECT id, created_at FROM missions WHERE id = $1`,
        [data.id.value]
      );
      const astronautResult = await client.query<{ astronaut_id: string }>(
        `SELECT astronaut_id FROM mission_astronauts WHERE mission_id = $1 ORDER BY astronaut_id`,
        [data.id.value]
      );
      const supplyResult = await client.query<{ supply_id: string }>(
        `SELECT supply_id FROM mission_supplies WHERE mission_id = $1 ORDER BY supply_id`,
        [data.id.value]
      );

      const row = missionResult.rows[0];
      if (!row) {
        throw new Error(`Missão persistida não encontrada ao recarregar: ${data.id.value}`);
      }

      await client.query("COMMIT");

      return MissionMapper.toDomain(
        row,
        astronautResult.rows.map((r) => r.astronaut_id),
        supplyResult.rows.map((r) => r.supply_id)
      );
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Erro na transação de Missão:", error);
      throw error;
    } finally {
      client.release();
    }
  }
}
