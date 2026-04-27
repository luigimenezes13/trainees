import { FastifyInstance } from "fastify";
import { createMission } from "./mission.repositoy.js";
import { createMissionBody } from "./mission.schema.js";

export async function missionRoutes(app: FastifyInstance):Promise<void>{

    app.post("/missions", async (request,reply) => {
        const data = createMissionBody.parse(request.body)
        try{
            await createMission(data)
            return reply.status(201).send()
        }catch(error: any){
            if(error.message == "O astronauta ou supply enviado não existe"){
                return reply.status(404).send()
            }
                return reply.status(500).send()
        }
    })
}
    
