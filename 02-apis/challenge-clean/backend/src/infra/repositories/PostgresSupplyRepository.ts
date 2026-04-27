import { pool } from "../../database/client.js"
import type { SupplyRow} from "../../database/types.js";
import { SupplyMapper } from "../mappers/SupplyMapper.js";
import { NaoEncontradoErro } from "../../errors.js";
import { Supply } from "../../domain/entities/Supply.js";
import { SupplyRepositoy } from "../../domain/repositories/supplyRepository.js";

export class PostigresSupplyRepositoy implements SupplyRepositoy{

async findById(id: number): Promise<Supply> {
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
    return SupplyMapper.toDomain(rows[0])
}

async  create(data: Supply): Promise<Supply> {
  const { rows } = await pool.query<SupplyRow>(
    `INSERT INTO supplies (item, category, stock, quantity)
     VALUES ($1, $2, $3,$4)
     RETURNING *`,
    [ data.props.item, data.props.category,data.props.stock,data.props.quantity]
  );
  return SupplyMapper.toDomain(rows[0]);
}

// TODO: implementar updateAstronaut
async  update(data: Supply,id: number): Promise<Supply | null> {
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
  return SupplyMapper.toDomain(rows[0])
  //throw new Error("Not implemented");
}

async  getAll() {
  const {rows} = await pool.query<SupplyRow>(
    `
      SELECT * FROM supplies
    `
  )
  const supplies = rows.map((row) => {return SupplyMapper.toDomain(row)})
  return supplies
}
// TODO: implementar softDeleteAstronaut
async delete(id: number): Promise<boolean> {
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
}