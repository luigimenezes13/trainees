import { PostgresAstronautRepository } from "../repositories/PostgresAstronautRepository.js";

// Astronaut Use Cases
import { CreateAstronautUseCase } from "../../app/useCases/CreateAstronautUseCase.js";
import { FindAstronautByIdUseCase } from "../../app/useCases/FindAstronautByIdUseCase.js";
import { DeleteAstronautUseCase } from "../../app/useCases/DeleteAstronautUseCase.js";
import { UpdateAstronautUseCase } from "../../app/useCases/UpdateAstronautUseCase.js";
import { FindAllAstronautsUseCase } from "../../app/useCases/FindAllAstronautsUseCase.js";

// Instancia dos Repositories
const postgresAstronautRepository = new PostgresAstronautRepository

// Injeção de Dependências
export const createAstronautUseCase = new CreateAstronautUseCase(postgresAstronautRepository)
export const findAstronautByIdUseCase = new FindAstronautByIdUseCase(postgresAstronautRepository)
export const deleteAstronautUseCase = new DeleteAstronautUseCase(postgresAstronautRepository)
export const updateAstronautUseCase = new UpdateAstronautUseCase(postgresAstronautRepository)
export const findAllAstronautUseCase = new FindAllAstronautsUseCase(postgresAstronautRepository)