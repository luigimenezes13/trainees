import { PostgresAstronautRepository } from "../repositories/PostgresAstronautRepository.js";
import { CreateMissionUseCase } from "../../app/usecases/CreateMissionUseCase.js";
import { PostgresMissionRepository } from "../repositories/PostgresMissionRepository.js";
import { PostigresSupplyRepository } from "../repositories/PostgresSupplyRepository.js";
import { CreateSupplyUseCase } from "../../app/usecases/CreateSupplyUseCase.js";
import { GetAllSupplyUseCase } from "../../app/usecases/GetAllSupplyUseCase.js";
import { GetByIdSupplyUseCase } from "../../app/usecases/GetByIdSupplyUseCase.js";
import { DeleteSupplyUseCase } from "../../app/usecases/DeleteSupplyUseCase.js";
import { UpdateSupplyUseCase } from "../../app/usecases/UpdateSupplyUseCase.js";
import { CreateAstronautUseCase } from "../../app/usecases/CreateAstronautUseCase.js";
import { SoftDeleteAstronautUseCase } from "../../app/usecases/SoftDeleteAstronautUseCase.js";
import { GetAstronautsUseCase } from "../../app/usecases/GetAstronautsUseCase.js";
import { UpdateAstronautUseCase } from "../../app/usecases/UpdateAstronautUseCase.js";

const postgresMissionRepository = new PostgresMissionRepository
const postgresSupplyRepository = new PostigresSupplyRepository
const postgressAstronautRepository = new PostgresAstronautRepository
export const createMissionUseCase = new CreateMissionUseCase(postgresMissionRepository, 
    postgressAstronautRepository, postgresSupplyRepository)


export const createSupplyUseCase = new CreateSupplyUseCase(postgresSupplyRepository)
export const getAllSupplyUseCase = new GetAllSupplyUseCase(postgresSupplyRepository)
export const getSupplyByIdUseCase = new GetByIdSupplyUseCase(postgresSupplyRepository)
export const deleteSupplyUseCase = new DeleteSupplyUseCase(postgresSupplyRepository)
export const updateSupplyUseCase = new UpdateSupplyUseCase(postgresSupplyRepository)

export const createAstronautUseCase = new CreateAstronautUseCase(postgressAstronautRepository)
export const softDeleteAstronautUseCase = new SoftDeleteAstronautUseCase(postgressAstronautRepository)
export const getAstronautsUseCase = new GetAstronautsUseCase(postgressAstronautRepository)
export const updateAstronautUseCase = new UpdateAstronautUseCase(postgressAstronautRepository)