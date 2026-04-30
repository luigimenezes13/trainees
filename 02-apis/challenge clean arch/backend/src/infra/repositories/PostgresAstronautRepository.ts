import { Astronaut } from "../../domain/entities/Astronaut.js";
import { AstronautRepository } from "../../domain/repositories/astronautRepository.js";
import { pool } from "../database/client.js";
import { AstronautRow } from "../database/types.js";

export class PostgresAstronautRepository implements AstronautRepository {
    async create(data: Astronaut): Promise<Astronaut> {
        const now = new Date();
        const { rows } = await pool.query<AstronautRow>(
            `INSERT INTO astronauts (name, role, nationality, status, created_at, updated_at)
           VALUES ($1, $2, $3, 'active', $4, $4)
           RETURNING *`,
            [data.props.name, data.props.role, data.props.nationality, now]
        );

        // PRECISA ADICIONAR UM MAPPER PARA TRATAR O RETORNO
        return rows[0];
    }
}

