import {z} from "zod"


export const createMissionBody = z.object({
  astronautId: z.int(),
  supplyId: z.int()
});

export type CreateMissionData = z.infer<typeof createMissionBody>