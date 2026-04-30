import { ZodError } from "zod";
import { Astronaut } from "../../domain/entities/Astronaut.js";

export function formatRow(row: Astronaut) {
  return {
    ...row,
    created_at: row.props.created_at.toISOString(),
    updated_at: row.props.updated_at.toISOString()
  };
}

export function formatZodError(error: ZodError) {
  return {
    error: "Validation error",
    details: error.issues.map((i) => i.message)
  };
}
