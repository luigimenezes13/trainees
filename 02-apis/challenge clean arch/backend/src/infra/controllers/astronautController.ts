import type { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { AstronautQuery, CreateAstronautBody, UpdateAstronautBody } from "../schemas/astronaut.schema.js";
import { createAstronautUseCase, deleteAstronautUseCase, findAllAstronautUseCase, findAstronautByIdUseCase, updateAstronautUseCase } from "../di/container.js";
import { AstronautId } from "../schemas/astronaut.schema.js";
import { Astronaut } from "../../domain/entities/Astronaut.js";

export async function astronautController(app: FastifyInstance): Promise<void> {
    app.post("/astronauts", async (request, reply) => {
        const dados = CreateAstronautBody.parse(request.body)
        const createdAstronaut = await createAstronautUseCase.execute(dados)

        // PRECISO DE UM MAPPER PARA FORMATAR ISSO ANTES DE ENVIAR
        return reply.status(201).send(createdAstronaut)
    })

    app.get<{ Params: { id: string } }>("/astronauts/:id", async (request, reply) => {
        const id = AstronautId.parse(request.params.id)
        const astronaut = await findAstronautByIdUseCase.execute(id)

        return reply.status(200).send(astronaut)
    })

    app.get("/astronauts", async (request, reply) => {
        const query = AstronautQuery.parse(request.query)
        const astronauts = await findAllAstronautUseCase.execute(query)

        return reply.status(200).send(astronauts)
    })

    app.delete<{ Params: { id: string } }>("/astronauts/:id", async (request, reply) => {
        const id = AstronautId.parse(request.params.id)
        const astronaut = await deleteAstronautUseCase.execute(id)

        return reply.status(200).send(astronaut)
    })

    app.put<{ Params: { id: string } }>("/astronauts/:id", async (request, reply) => {
        const id = AstronautId.parse(request.params.id)
        const props = UpdateAstronautBody.parse(request.body)

        const astronaut = new Astronaut(props, id)
        const updatedAstronaut = await updateAstronautUseCase.execute(astronaut)

        // PRECISO DE UM MAPPER PARA FORMATAR ISSO ANTES DE ENVIAR
        return reply.status(201).send(updatedAstronaut)
    })

}