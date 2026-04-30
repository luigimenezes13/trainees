import { z } from "zod";

export const createMissionBody = z.object({
  astronautIds: z.array(z.uuid()).min(1, "A missão precisa de pelo menos um astronauta"),
  supplyIds: z.array(z.uuid()).min(1, "A missão precisa de pelo menos um suprimento")
});

export type CreateMissionData = z.infer<typeof createMissionBody>;