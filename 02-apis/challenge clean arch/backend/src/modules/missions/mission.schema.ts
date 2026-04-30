import { z } from "zod";
import { astronautId } from "../astronauts/astronaut.schema.js";
import { supplyId } from "../supplies/supply.schema.js";

export const missionId = z.coerce.number().int().positive();

export const findMissionQuery = z.object({
    search: z.string().trim().optional(),
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().optional()
  });
  

export const createMissionBody = z.object({
    titulo: z.string().trim().min(1),
    astronautId,
    supplyId,
});

export type FindMissionParams = z.infer<typeof findMissionQuery>;
export type CreateMissionData = z.infer<typeof createMissionBody>;

