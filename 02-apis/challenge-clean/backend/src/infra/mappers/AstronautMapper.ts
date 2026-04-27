// src/modules/astronauts/mappers/astronaut.mapper.ts
import { Astronaut } from "../../domain/entities/Astronaut.js";
import { AstronautRow } from "../../database/types.js";
export class AstronautMapper {

  static toDomain(raw: AstronautRow): Astronaut {
    return new Astronaut({
      id: Number(raw.id),
      name: raw.name,
      role: raw.role,
      nationality: raw.nationality,
      status: raw.status,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
      deleted_at: raw.deleted_at,
    });
  }

  static toPersistence(astronaut: Astronaut) {
    return {
      name: astronaut.props.name,
      role: astronaut.props.role,
      nationality: astronaut.props.nationality,
      status: astronaut.props.status,
    };
  }
}