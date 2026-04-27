
import { pool } from "../../database/client.js";
import { resolvePagination, totalPages } from "../../shared/pagination.js";

import type { AstronautRow } from "../../database/types.js";
import { AstronautRepository } from "../../domain/repositories/astronautRepository.js";
import { Astronaut } from "../../domain/entities/Astronaut.js";
import type { Query } from "../../domain/value-objects/Query.js";
import { AstronautsResult } from "../../domain/repositories/astronautRepository.js";
import { NaoEncontradoErro } from "../../errors.js";
import { AstronautMapper } from "../mappers/AstronautMapper.js";
// Isso representa exatamente as colunas da sua tabela no Postgres
export class PostgresAstronautRepository implements AstronautRepository {
    async find(params: Query): Promise<AstronautsResult> {
        const { page, limit, offset } = resolvePagination({ page: params.page, limit: params.limit, maxLimit: 50 });

        const conditions = ["deleted_at IS NULL"];
        const values: unknown[] = [];

        if (params.search?.trim()) {
            values.push(`%${params.search.trim()}%`);
            conditions.push(`name ILIKE $${values.length}`);
        }

        const where = `WHERE ${conditions.join(" AND ")}`;

        const countResult = await pool.query<{ count: string }>(`SELECT COUNT(id) AS count FROM astronauts ${where}`, values);
        const total = Number(countResult.rows[0].count);

        const dataResult = await pool.query<AstronautRow>(
            `SELECT * FROM astronauts ${where} ORDER BY created_at DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
            [...values, limit, offset]
        );

        const astronauts = dataResult.rows.map((row) => {return AstronautMapper.toDomain(row)})
        return {
            data: astronauts,
            pagination: { total, page, limit, totalPages: totalPages(total, limit) }
        };
    }

    async create(data: Astronaut): Promise<Astronaut> {
        const now = new Date();

        const { rows } = await pool.query<AstronautRow>(
            `INSERT INTO astronauts (name, role, nationality, status, created_at, updated_at)
     VALUES ($1, $2, $3, 'active', $4, $4)
     RETURNING *`,
            [data.props.name, data.props.role, data.props.nationality, now]
        );

        return AstronautMapper.toDomain(rows[0]);
    }

    // TODO: implementar updateAstronaut
    async update( data: Astronaut,id: number): Promise<Astronaut | null> {
        // Implemente aqui
        const now = new Date()
        const updatedData = { ...data, updated_at: now }
        const fields = Object.keys(updatedData).map((field, index) => {
            return `${field} = $${index + 2}`
        }).join(", ")
        const values = Object.values(updatedData)
        const { rows } = await pool.query<AstronautRow>(
            `
      UPDATE astronauts
      SET ${fields}
      WHERE id = $1
      RETURNING *
    `,
            [id, ...values]
        )
        if (rows.length <= 0) {
            throw new NaoEncontradoErro("Astronauta", id)
        }
        return AstronautMapper.toDomain(rows[0])
        //throw new Error("Not implemented");
    }

    async findById(id: number) {
        const { rows } = await pool.query<AstronautRow>(
            `
      SELECT * FROM astronauts WHERE id = $1
    `,
            [id]
        )
        if (rows.length == 0) {
            throw new NaoEncontradoErro("Astronauta", id)
        }
        return rows[0]
    }
    // TODO: implementar softDeleteAstronaut
    async softDelete(id: number): Promise<boolean> {
        // Implemente aqui
        const now = new Date()
        const { rows } = await pool.query<AstronautRow>(
            `
     UPDATE astronauts
     SET deleted_at = $1 , status = 'inactive'
     WHERE id = $2
     RETURNING *
    `,
            [now, id]
        )
        if (rows.length <= 0) {
            throw new NaoEncontradoErro("Astronauta", id)
        }
        console.log("passou")
        return true
    }
}