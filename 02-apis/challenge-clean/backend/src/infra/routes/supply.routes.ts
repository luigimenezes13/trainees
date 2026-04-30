import type { FastifyInstance, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { supplyId, createSupplyBody, updateSupplyBody } from "../schemas/supply.schema.js";
import { formatZodError } from "../utils/utils.js";
import { NaoEncontradoErro } from "../../domain/errors/errors.js";
import { createSupplyUseCase } from "../di/container.js";
import { getAllSupplyUseCase } from "../di/container.js";
import { getSupplyByIdUseCase } from "../di/container.js";
import { deleteSupplyUseCase } from "../di/container.js";
import { updateSupplyUseCase } from "../di/container.js";
export async function suppliesRoutes(app: FastifyInstance): Promise<void> {
  app.get("/supplies", async (request, reply) => {
    const result = await getAllSupplyUseCase.execute();
    return reply.status(200).send(result);
  });

  app.post("/supplies", async (request, reply) => {
    const body = createSupplyBody.parse(request.body);
    const created = await createSupplyUseCase.execute(body)

    return reply.status(201).send(created);
  });

  app.put("/supplies/:id", async (request, reply) => {

    const id = supplyId.parse(request.params.id)
    const body = updateSupplyBody.parse(request.body)
    const updated = await updateSupplyUseCase.execute(id,body)
    return reply.status(200).send(updated)

  });
  app.get("/supplies/:id", async (request,reply)=>{
    const id = supplyId.parse(request.params.id)
      const supply = await getSupplyByIdUseCase.execute(id)
      
      return reply.status(200).send(supply)
  })
  
  

  app.delete("/supplies/:id", async (request, reply) => {
    
    const id = supplyId.parse(request.params.id)

    const supply = await deleteSupplyUseCase.execute(id)
    return reply.status(204).send()
  
  });


}
