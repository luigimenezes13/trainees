import { pool } from "../../database/client.js";
import { resolvePagination } from "../../shared/pagination.js";
import type { SupplyRow } from "../../database/types.js";
import type { CreateSupplyData, FindSupplyParams, UpdateSupplyData } from "./supply.schema.js";
import { Error404 } from "../../Error404.js"

export interface SuppliesResult {
  data: SupplyRow[];
  pagination: {
    page: number;
    limit: number;
  };
}

// BUSCAR TODOS OS SUPRIMENTOS
export async function findSupplies(params:FindSupplyParams): Promise<SuppliesResult> {
  const { page, limit, offset } = resolvePagination({ page: params.page, limit: params.limit, maxLimit: 50 });
  
  const dataResult = await pool.query<SupplyRow>(
    `SELECT * FROM supplies
    ORDER BY id LIMIT $1 OFFSET $2`,
    [limit, offset]
  )

  if (dataResult.rows.length <= 0)
    throw new Error404("Suprimentos", "NADA FOI ENCONTRADO" )


  return{
    data: dataResult.rows,
    pagination: {page, limit }
  }
}

// BUSCAR SUPRIMENTO POR ID
export async function findSupplyById(id: number): Promise<SupplyRow>{
  const {rows} = await pool.query<SupplyRow>(
    `SELECT * FROM supplies
     WHERE id = $1`,
    [id]
  );

  if (rows.length <= 0)
    throw new Error404("Suprimento", id)

  return rows[0];
}

// CRIAR SUPRIMENTO
export async function createSupply(data: CreateSupplyData): Promise<SupplyRow> {
  const { rows } = await pool.query<SupplyRow>(
    `INSERT INTO supplies (item, categoria, estoque)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [data.item, data.categoria, data.estoque]
  );

  return rows[0];
}

// ATUALIZAR SUPRIMENTO
export async function updateSupply(id: number, data: UpdateSupplyData ): Promise<SupplyRow>{
  const {rows} = await pool.query<SupplyRow>(
    `UPDATE supplies SET 
     item = $1, 
     categoria = $2, 
     estoque = $3 
     WHERE id = $4
     RETURNING *`,
    [data.item, data.categoria, data.estoque, id]
  );

  if (rows.length <= 0)
    throw new Error404("Suprimento", id)

  return rows[0];
}

// DELETAR SUPRIMENTO
export async function deleteSupply(id: number): Promise<SupplyRow>{
  const {rows} = await pool.query<SupplyRow>(
    `DELETE FROM supplies
     WHERE id = $1
     RETURNING *`,
    [id]
  );

  if (rows.length <= 0)
    throw new Error404("Suprimento", id)

  return rows[0];
}



