import { FastifyInstance } from "fastify";

import { createMissionBody } from "../schemas/mission.schema.js";
import { createMissionUseCase } from "../di/container.js";
import { NaoEncontradoErro } from "../../domain/errors/errors.js";
import { ZodError } from "zod";
import { formatZodError } from "../utils/utils.js";
export async function missionRoutes(app: FastifyInstance):Promise<void>{

    app.post("/missions", async (request,reply) => {
        const data = createMissionBody.parse(request.body)
        const mission = await createMissionUseCase.execute(data)
        return reply.status(201).send(mission)
        
    })


}


    
