import { z } from "zod";

export const supplyId = z.coerce.number().int().positive();

export const findSupplyQuery = z.object({
  search: z.string().trim().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional()
});

export const createSupplyBody = z.object({
  item: z.string().trim().min(1),
  categoria: z.string().trim().min(1),
  estoque: z.coerce.number().int().positive()
});

export const updateSupplyBody = z
  .object({
    item: z.string().trim().min(1),
    categoria: z.string().trim().min(1),
    estoque: z.coerce.number().int().positive()
  })
  .refine((data) => Object.values(data).some((v) => v !== undefined), {
    message: "Pelo menos um campo é necessário..."
  });

export type FindSupplyParams = z.infer<typeof findSupplyQuery>;
export type CreateSupplyData = z.infer<typeof createSupplyBody>;
export type UpdateSupplyData = z.infer<typeof updateSupplyBody>;
