import type { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { formatZodError } from "../../shared/utils.js"; // TRATAR MENSAGEM DE ERRO ZOD
import { findSupplyById } from "../supplies/supply.repository.js";
import { findAstronautById } from "../astronauts/astronaut.repository.js";
import { findMissions, createMission } from "./mission.repository.js"; // QUERYS e FUNÇÕES
import { findMissionQuery, createMissionBody } from "./mission.schema.js"; // SCHEMAS para VALIDAÇÃO
import { Error404 } from "../../Error404.js";

export async function missionsRoutes(app: FastifyInstance): Promise<void> {
    app.get("/missions", async (request, reply) => {
        const query = findMissionQuery.parse(request.query)
        const result = await findMissions(query)

        return reply.status(200).send({ data: result.data })
    })

    app.post("/missions", async (request, reply) => {
        const query = createMissionBody.parse(request.body)

        // Validar a Existência de Suprimento e Astronautas
        await findSupplyById(query.supplyId)
        await findAstronautById(query.astronautId)

        const result = await createMission(query)

        return reply.status(201).send(result)
    })

    app.setErrorHandler((error, _request, reply) => {
        if (error instanceof ZodError) {
            return reply.status(400).send(formatZodError(error));
        }

        if (error instanceof Error404) {
            return reply.status(404).send({ error: error.message })
        }
        reply.status(500).send({ error: "Internal server error" });
    });
}