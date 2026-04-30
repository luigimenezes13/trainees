import type { FastifyInstance, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { createAstronautUseCase, getAstronautsUseCase, softDeleteAstronautUseCase, updateAstronautUseCase } from "../di/container.js";
//import { createAstronaut, findAstronauts, softDeleteAstronaut, updateAstronaut } from "./astronaut.repository.js";
import { astronautId, createAstronautBody, findAstronautsQuery, updateAstronautBody } from "../schemas/astronaut.schema.js";
import { formatRow, formatZodError } from "../utils/utils.js";
import { NaoEncontradoErro } from "../../domain/errors/errors.js";

export async function astronautRoutes(app: FastifyInstance): Promise<void> {
  
  app.get("/astronauts", async (request, reply) => {
    const query = findAstronautsQuery.parse(request.query);
    const result = await getAstronautsUseCase.execute(query);

    return reply.status(200).send({
      data: result.data.map(formatRow),
      pagination: result.pagination
    });
  });

  app.post("/astronauts", async (request, reply) => {
    const body = createAstronautBody.parse(request.body);
    const created = await createAstronautUseCase.execute(body);

    return reply.status(201).send(created);
  });

  app.put("/astronauts/:id", async (request, reply) => {
    // TODO: implementar update de astronauta
    // 1. Validar o ID dos params com astronautId
    // 2. Validar o body com updateAstronautBody
    // 3. Chamar updateAstronaut do repository
    // 4. Retornar 200 com o astronauta atualizado (formatRow)
    // 5. Retornar 404 se nao encontrar
    const id = astronautId.parse(request.params.id )
    const body = updateAstronautBody.parse(request.body)
      const updated = await updateAstronautUseCase.execute(body,id)
      return reply.status(200).send(updated)
    

  });

  app.delete("/astronauts/:id", async (request, reply) => {
    
    // TODO: implementar soft delete de astronauta
    // 1. Validar o ID dos params com astronautId
    // 2. Chamar softDeleteAstronaut do repository
    // 3. Retornar 204 se deletou
    const id = astronautId.parse(request.params.id)
    const isDeleted = await softDeleteAstronautUseCase.execute(id)
    return reply.status(204).send()
  
    
    // 4. Retornar 404 se nao encontrar

  });
  

}
