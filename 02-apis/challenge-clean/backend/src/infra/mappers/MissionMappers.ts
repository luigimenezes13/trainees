import { Mission } from "../../domain/aggregates/Mission.js";
import { Identifier } from "../../domain/value-objects/Identifier.js";
import type { MissionRow } from "../database/types.js";

export class MissionMapper {
  static toDomain(
    row: MissionRow,
    astronautIds: string[],
    supplyIds: string[]
  ): Mission {
    return new Mission(
      {
        astronautsId: astronautIds.map((id) => new Identifier(id)),
        suppliesId: supplyIds.map((id) => new Identifier(id))
      },
      row.id
    );
  }
}
