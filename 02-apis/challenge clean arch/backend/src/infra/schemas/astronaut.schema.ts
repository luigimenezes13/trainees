import { z } from "zod"

export const CreateAstronautBody = z.object({
    name: z.string().trim().min(2),
    role: z.string().trim().min(1),
    nationality: z.string().trim().min(1)
})