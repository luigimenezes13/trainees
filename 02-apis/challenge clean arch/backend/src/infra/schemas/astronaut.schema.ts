import { z } from "zod"

export const AstronautId = z.string().trim()

export const CreateAstronautBody = z.object({
    name: z.string().trim().min(2),
    role: z.string().trim().min(1),
    nationality: z.string().trim().min(1)
})

export const UpdateAstronautBody = z
  .object({
    name: z.string().trim().min(2).optional(),
    role: z.string().trim().min(1).optional(),
    nationality: z.string().trim().min(1).optional(),
    status: z.enum(["active", "inactive"]).optional()
  })
  .refine((data) => Object.values(data).some((v) => v !== undefined), {
    message: "at least one field is required"
  });

export const AstronautQuery = z.object({
  // Query HTTP sempre vem como string; coerce converte "1" → 1
  limit: z.coerce.number().int().positive().optional(),
  search: z.string().trim().optional(),
  page: z.coerce.number().int().positive().optional(),
});

export type UpdateAstronautData = z.infer<typeof UpdateAstronautBody>;