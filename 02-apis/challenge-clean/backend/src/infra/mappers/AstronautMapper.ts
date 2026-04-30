// src/modules/astronauts/mappers/astronaut.mapper.ts
import { Astronaut } from "../../domain/entities/Astronaut.js";
import { AstronautRow } from "../database/types.js";
export class AstronautMapper {

  static toDomain(raw: AstronautRow): Astronaut {
    return new Astronaut(
    {
      name: raw.name,
      role: raw.role,
      nationality: raw.nationality,
      status: raw.status,
      created_at: raw.created_at,
      updated_at: raw.updated_at,
      deleted_at: raw.deleted_at,
    },raw.id
  );
  }

  static toPersistence(astronaut: Astronaut): AstronautRow {
    return {
      id: astronaut.id.value,
      name: astronaut.props.name,
      role: astronaut.props.role,
      nationality: astronaut.props.nationality,
      status: astronaut.props.status,
      deleted_at: astronaut.props.deleted_at,
      created_at: astronaut.props.created_at,
      updated_at: astronaut.props.updated_at
    };
  }
}