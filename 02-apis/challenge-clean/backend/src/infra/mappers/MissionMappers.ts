// src/modules/astronauts/mappers/astronaut.mapper.ts
import { Mission } from "../../domain/entities/Mission.js";
import { MissionRow } from "../../database/types.js";


export class MissionMapper {

  static toDomain(raw: MissionRow): Mission {
    return new Mission({
      id: raw.id,
      AstronautId: raw.astronautId,
      SupplyId: raw.supplyId
    });
  }

  static toPersistence(mission: Mission) {
    return {
      id: mission.props.id,
      AstronautId: mission.props.AstronautId,
      SupplyId: mission.props.SupplyId
    };
  }
}