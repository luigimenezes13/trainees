import { pool } from "../../database/client.js";
import { resolvePagination, totalPages } from "../../shared/pagination.js";

import type { SupplyRow} from "../../database/types.js";
import { type CreateSupplyData, type UpdateSupplyData } from "./supply.schema.js";
import { NaoEncontradoErro } from "../../errors.js";


export async function getSupplyById(id: number): Promise<SupplyRow> {
    const { rows } = await pool.query<SupplyRow>(
        `
        SELECT * FROM supplies 
        WHERE id = $1
        `,
        [id]
    )
    if(rows.length <= 0){
        throw new NaoEncontradoErro("Suprimento",id)
    }
    return rows[0]
}

export async function createSupply(data: CreateSupplyData): Promise<SupplyRow> {
  const { rows } = await pool.query<SupplyRow>(
    `INSERT INTO supplies (item, category, stock, quantity)
     VALUES ($1, $2, $3,$4)
     RETURNING *`,
    [ data.item, data.category,data.stock,data.quantity]
  );
  return rows[0];
}

// TODO: implementar updateAstronaut
export async function updateSupply(id: number, data: UpdateSupplyData): Promise<SupplyRow | null> {
  // Implemente aqui
  const fields = Object.keys(data).map((field,index) =>
    {
      return `${field} = $${index+2}`
    }).join(", ")
  const values = Object.values(data)
  const {rows} = await pool.query<SupplyRow>(
    `
      UPDATE supplies
      SET  ${fields}
      WHERE id = $1
      RETURNING *
    `,
    [id,...values]
  )
  if(rows.length <= 0){
    throw new NaoEncontradoErro("Suprimento",id)
  }
  return rows[0]
  //throw new Error("Not implemented");
}

export async function  getSupplies() {
  const {rows} = await pool.query<SupplyRow>(
    `
      SELECT * FROM supplies
    `
  )

  return rows
}
// TODO: implementar softDeleteAstronaut
export async function deleteSupply(id: number): Promise<boolean> {
  // Implemente aqui
  const {rows} = await pool.query<SupplyRow>(
    `
     DELETE FROM supplies
     WHERE id = $1
     RETURNING *
    `,
    [id]
  )
  
  if (rows.length == 0){
    throw new NaoEncontradoErro("Suprimento",id)
  }
  return true
}
