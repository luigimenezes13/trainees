import { PostgresAstronautRepository } from "../repositories/PostgresAstronautRepository.js";
import { CreateAstronautUseCase } from "../../app/useCases/CreateAstronautUseCase.js";

// Instancia dos Repositories
const postgresAstronautRepository = new PostgresAstronautRepository

// Injeção de Dependências
export const createAstronautUseCase = new CreateAstronautUseCase(postgresAstronautRepository)