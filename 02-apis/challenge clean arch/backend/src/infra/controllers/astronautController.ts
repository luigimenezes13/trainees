import type { FastifyInstance } from "fastify";
import { request } from "http";
import { ZodError } from "zod";
import { CreateAstronautBody } from "../schemas/astronaut.schema.js";
import { createAstronautUseCase } from "../di/container.js";

export async function astronautController(app:FastifyInstance): Promise<void> {
    app.post("/astronauts", async(request, reply) => {
        const dados = CreateAstronautBody.parse(request.body)
        const createdAstronaut = await createAstronautUseCase.execute(dados)

        // PRECISO DE UM MAPPER PARA FORMATAR ISSO ANTES DE ENVIAR
        return reply.status(201).send(createAstronautUseCase)
    })
    
}