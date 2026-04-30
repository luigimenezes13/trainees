import type { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { createAstronaut, findAstronauts, softDeleteAstronaut, updateAstronaut, findAstronautById } from "./astronaut.repository.js";
import { astronautId, createAstronautBody, findAstronautsQuery } from "./astronaut.schema.js";
import { formatRow, formatZodError } from "../../shared/utils.js";
import { REFUSED } from "dns";
import { create } from "domain";
import { Error404 } from "../../Error404.js";

export async function astronautRoutes(app: FastifyInstance): Promise<void> {
  app.get("/astronauts", async (request, reply) => {
    const query = findAstronautsQuery.parse(request.query);
    const result = await findAstronauts(query);

    return reply.status(200).send({
      data: result.data.map(formatRow),
      pagination: result.pagination
    });

  });

  app.get <{Params:{id: number}}> ("/astronauts/:id", async (request, reply) => {
    const id = astronautId.parse(request.params.id)
    const created = await findAstronautById(id);

    return reply.status(200).send(JSON.stringify(created));
  });


  app.post("/astronauts", async (request, reply) => {
    const body = createAstronautBody.parse(request.body);

    const created = await createAstronaut(body);
    return reply.status(201).send(formatRow(created));

  });

  app.put <{Params:{id: number}}> ("/astronauts/:id", async (request, reply) => {

    // TODO: implementar update de astronauta
    // 1. Validar o ID dos params com astronautId
    // 2. Validar o body com updateAstronautBody
    // 3. Chamar updateAstronaut do repository
    // 4. Retornar 200 com o astronauta atualizado (formatRow)
    // 5. Retornar 404 se nao encontrar

    const id = astronautId.parse(request.params.id) // Não sei remover esse erro
    const body = createAstronautBody.parse(request.body);

    const created = await updateAstronaut(id, body)
    return reply.status(200).send(formatRow(created));


  });

  app.delete <{Params:{id: number}}>  ("/astronauts/:id", async (request, reply) => {

    // TODO: implementar soft delete de astronauta
    // 1. Validar o ID dos params com astronautId
    // 2. Chamar softDeleteAstronaut do repository
    // 3. Retornar 204 se deletou
    // 4. Retornar 404 se nao encontrar

    const id = astronautId.parse(request.params.id)

    const created = await softDeleteAstronaut(id);
    return reply.status(200).send(JSON.stringify(created));
  });

  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send(formatZodError(error));
    }

    if (error instanceof Error404){
      return reply.status(404).send({error: error.message})
    }
    reply.status(500).send({ error: "Internal server error" });
  });
}
