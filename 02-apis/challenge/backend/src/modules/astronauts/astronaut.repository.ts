import { pool } from "../../database/client.js";
import { resolvePagination, totalPages } from "../../shared/pagination.js";

import type { AstronautRow } from "../../database/types.js";
import { astronautId, type CreateAstronautData, type FindAstronautsParams, type UpdateAstronautData } from "./astronaut.schema.js";
import { NaoEncontradoErro } from "../../errors.js";

export interface AstronautsResult {
  data: AstronautRow[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export async function findAstronauts(params: FindAstronautsParams): Promise<AstronautsResult> {
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

  return {
    data: dataResult.rows,
    pagination: { total, page, limit, totalPages: totalPages(total, limit) }
  };
}

export async function createAstronaut(data: CreateAstronautData): Promise<AstronautRow> {
  const now = new Date();
  
  const { rows } = await pool.query<AstronautRow>(
    `INSERT INTO astronauts (name, role, nationality, status, created_at, updated_at)
     VALUES ($1, $2, $3, 'active', $4, $4)
     RETURNING *`,
    [data.name, data.role, data.nationality, now]
  );

  return rows[0];
}

// TODO: implementar updateAstronaut
export async function updateAstronaut(id: number, data: UpdateAstronautData): Promise<AstronautRow | null> {
  // Implemente aqui
  const now = new Date()
  const updatedData = {...data,updated_at: now}
  const fields  = Object.keys(updatedData).map((field,index)=>{
    return `${field} = $${index+2}`
  } ).join(", ")
  const values = Object.values(updatedData)
  const {rows} = await pool.query<AstronautRow>(
    `
      UPDATE astronauts
      SET ${fields}
      WHERE id = $1
      RETURNING *
    `,
    [id,...values]
  )
  if(rows.length <= 0){
    throw new NaoEncontradoErro("Astronauta",id)
  }
  return rows[0]
  //throw new Error("Not implemented");
}

export async function  findAstronautById(id:number) {
  const {rows} = await pool.query<AstronautRow>(
    `
      SELECT * FROM astronauts WHERE id = $1
    `,
    [id]
  )
  if(rows.length == 0){
    throw new NaoEncontradoErro("Astronauta",id)
  }
  return rows[0]
}
// TODO: implementar softDeleteAstronaut
export async function softDeleteAstronaut(id: number): Promise<boolean> {
  // Implemente aqui
  const now = new Date()
  const {rows} = await pool.query<AstronautRow>(
    `
     UPDATE astronauts
     SET deleted_at = $1 , status = 'inactive'
     WHERE id = $2
     RETURNING *
    `,
    [now, id]
  )
  if (rows.length <= 0){
    throw new NaoEncontradoErro("Astronauta",id)
  }
  console.log("passou")
  return true
}
