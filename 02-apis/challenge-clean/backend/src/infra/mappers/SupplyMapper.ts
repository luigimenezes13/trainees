// src/modules/astronauts/mappers/astronaut.mapper.ts
import { Supply } from "../../domain/entities/Supply.js";
import { SupplyRow } from "../../database/types.js";
export class SupplyMapper {

  static toDomain(raw: SupplyRow): Supply {
    return new Supply({
      id: raw.id,
      item: raw.item,
      category: raw.category,
      stock: raw.stock,
      quantity: raw.quantity
    });
  }

  static toPersistence(supply: Supply) {
    return {
      id: supply.props.id,
      item: supply.props.item,
      category: supply.props.category,
      stock: supply.props.stock,
      quantity: supply.props.quantity
    };
  }
}