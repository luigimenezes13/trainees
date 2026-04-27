import { z } from "zod";

export const supplyId = z.coerce.number().int().positive();

/*
export const findAstronautsQuery = z.object({
  search: z.string().trim().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional()
});
*/

export const createSupplyBody = z.object({
  item: z.string().trim().min(1),
  category: z.string().trim().min(1),
  stock: z.int(),
  quantity: z.float32()
});

export const updateSupplyBody = z
  .object({
    item: z.string().trim().min(1).optional(),
    category: z.string().trim().min(1).optional(),
    stock: z.int().optional(),
    quantity: z.float32().optional()
  })
  .refine((data) => Object.values(data).some((v) => v !== undefined), {
    message: "at least one field is required"
  });


export type CreateSupplyData = z.infer<typeof createSupplyBody>;
export type UpdateSupplyData = z.infer<typeof updateSupplyBody>;
