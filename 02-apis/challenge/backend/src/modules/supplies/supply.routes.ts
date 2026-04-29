import type { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { createSupply, deleteSupply, findSupplies, findSupplyById, updateSupply } from "./supply.repository.js"; // QUERYS e FUNÇÕES
import { createSupplyBody, findSupplyQuery, supplyId, updateSupplyBody } from "./supply.schema.js"; // SCHEMAS para VALIDAÇÃO
import { formatZodError } from "../../shared/utils.js"; // TRATAR MENSAGEM DE ERRO ZOD
import { Error404 } from "../../Error404.js";

export async function suppliesRoutes(app: FastifyInstance): Promise<void> {

  app.get("/supplies", async(request, reply) => {
    
    const query = findSupplyQuery.parse(request.query)
    const result = await findSupplies(query)

    return reply.status(201).send({data: result.data})
  })

  // BUSCAR SUPPLY POR ID
  //  <{Params:{id: number}}> -> tipagem para o id recebido
  app.get <{Params:{id: number}}> ("/supplies/:id", async (request, reply) => {
    const id = supplyId.parse(request.params.id)
    const created = await findSupplyById(id);

    return reply.status(200).send(JSON.stringify(created));
  });


// CRIAR UM SUPPLY
  app.post("/supplies", async(request,reply)=>{ 
    const body = createSupplyBody.parse(request.body)
    const created = await createSupply(body)

    return reply.status(201).send(created)

  })

  app.put <{Params:{id: number}}> ("/supplies/:id", async (request, reply) => {
    const id = supplyId.parse(request.params.id)
    const body = updateSupplyBody.parse(request.body)

    const updated = await updateSupply(id, body);

    return reply.status(200).send(JSON.stringify(updated));
  });

// DELETAR UM SUPPLY
  app.delete <{Params:{id: number}}> ("/supplies/:id", async (request, reply) => {
    const id = supplyId.parse(request.params.id)
    await deleteSupply(id);

    return reply.status(200).send(JSON.stringify({deletado: `${id} deletado com sucesso...`}));
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