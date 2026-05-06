import { ZodError } from "zod";

export function formatZodError(error: ZodError) {
    return {
      error: "Validation error",
      details: error.issues.map((i) => i.message)
    };
  }