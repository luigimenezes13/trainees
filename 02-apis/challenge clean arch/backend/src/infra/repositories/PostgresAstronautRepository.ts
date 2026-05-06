import { UpdateAstronautDto } from "../../app/dto/UpdateAstronautDto.js";
import { Astronaut } from "../../domain/entities/Astronaut.js";
import { AstronautRepository, AstronautResult } from "../../domain/repositories/astronautRepository.js";
import { Query } from "../../domain/value-objects/Query.js";
import { pool } from "../database/client.js";
import { AstronautRow } from "../database/types.js";
import { AstronautMapper } from "../mappers/AstronautMapper.js";
import { resolvePagination } from "../utils/pagination.js";

export class PostgresAstronautRepository implements AstronautRepository {

    async create(data: Astronaut): Promise<Astronaut> {
        const now = new Date();
        const { rows } = await pool.query<AstronautRow>(

            `INSERT INTO astronauts (id, name, role, nationality, status, created_at, updated_at)
           VALUES ($1, $2, $3, $4, 'active', $5, $5)
           RETURNING *`,
            [data.id, data.props.name, data.props.role, data.props.nationality, now]

        );

        return AstronautMapper.toDomain(rows[0]);

    }


    async find(query: Query): Promise<AstronautResult> {

        const pagination = resolvePagination(query)

        const { rows } = await pool.query<AstronautRow>(
            `SELECT * FROM astronauts
            ORDER BY id LIMIT $1 OFFSET $2`,
            [pagination.limit, pagination.offset]
        )

        return {data: rows, pagination:{
            page: pagination.page,
            limit: pagination.limit,
            offset: pagination. offset
        } }
    }

    async findById(id: string): Promise<Astronaut> {

        const { rows } = await pool.query<AstronautRow>(
            `SELECT * FROM astronauts
            WHERE id = $1`,
            [id]

        );

        if (!rows[0])
            return null

        return AstronautMapper.toDomain(rows[0]);

    }


    async softDelete(id: string): Promise<Astronaut> {

        const now = new Date();
        const { rows } = await pool.query<AstronautRow>(
            `UPDATE astronauts 
            SET updated_at = $1,
            status = 'inactive',
            deleted_at = $2
            WHERE id = $3
            RETURNING *;`,
            [now, now, id]
        );

        if (!rows[0])
            return null

        return AstronautMapper.toDomain(rows[0]);
    }



    async update(data: UpdateAstronautDto): Promise<Astronaut> {
        const now = new Date();

        const { rows } = await pool.query<AstronautRow>(
            `UPDATE astronauts SET 
            name = $1, 
            role = $2, 
            nationality = $3, 
            updated_at = $4
            WHERE id = $5
            RETURNING *`,

            [data.props.name, data.props.role, data.props.nationality, now, data.id]

        );

        if (!rows[0])
            return null

        return AstronautMapper.toDomain(rows[0]);

    }


}



