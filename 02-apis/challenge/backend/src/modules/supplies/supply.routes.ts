import type { FastifyInstance, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import { createSupply,deleteSupply,getSupplyById,getSupplies,updateSupply } from "./supply.repository.js";
import { supplyId, createSupplyBody, updateSupplyBody } from "./supply.schema.js";
import { formatRow, formatZodError } from "../../shared/utils.js";
import { NaoEncontradoErro } from "../../errors.js";
import { get, request } from "http";
import { getSystemErrorMap } from "util";
import { resolve } from "path";

export async function suppliesRoutes(app: FastifyInstance): Promise<void> {
  app.get("/supplies", async (request, reply) => {
    const result = await getSupplies();
    return reply.status(200).send(result);
  });

  app.post("/supplies", async (request, reply) => {
    const body = createSupplyBody.parse(request.body);
    const created = await createSupply(body);

    return reply.status(201).send(created);
  });

  app.put("/supplies/:id", async (request, reply) => {

    const id = supplyId.parse(request.params.id)
    const body = updateSupplyBody.parse(request.body)
    try{
      const updated = await updateSupply(id,body)
      return reply.status(200).send(updated)
    }catch(error: any){
      throw error
    }

  });
  app.get("/supplies/:id", async (request,reply)=>{
    const id = supplyId.parse(request.params.id)
    try{
      const supply = await getSupplyById(id)
      
      return reply.status(200).send(supply)
    }catch(error: any){
      throw error
    }
  })
  
  

  app.delete("/supplies/:id", async (request, reply) => {
    
    const id = supplyId.parse(request.params.id)

    try{
    const supply = await deleteSupply(id)
    }catch(error: any){
      throw error
    }
    return reply.status(204).send()
  
  });

    app.setErrorHandler((error, _request, reply) => {
      if (error instanceof ZodError) {
        return reply.status(400).send(formatZodError(error));
      }
      if(error instanceof NaoEncontradoErro){
        reply.status(404).send({ error: error.message });
      }
        reply.status(500).send({ error: "Internal server error" });
    });
}
