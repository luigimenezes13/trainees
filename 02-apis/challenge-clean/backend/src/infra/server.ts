import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { astronautRoutes } from "./routes/astronaut.routes.js";
import { suppliesRoutes } from "./routes/supply.routes.js";
import { missionRoutes } from "./routes/mission.routes.js";
import { ZodError } from "zod";
import { NaoEncontradoErro, TooBigDataError } from "../domain/errors/errors.js";
import { InactiveAstronautError } from "../domain/errors/errors.js";

const app = Fastify({ logger: true });
const port = Number(process.env.PORT ?? 3333);

await app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
});
app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send(error);
  }
  if(error instanceof NaoEncontradoErro){
    return reply.status(404).send({ error: error.message });
  }
  if(error instanceof InactiveAstronautError){
    return reply.status(500).send({error: error.message})
  }
  if(error instanceof TooBigDataError){
    return reply.status(500).send({error: error.message})
  }
    console.log(error)
    return reply.status(500).send({ error: "Internal server error" });
});

app.get("/health", async (_request, reply) => {
  return reply.status(200).send({ status: "ok", mission: "Mars Mission Control" });
});

await app.register(astronautRoutes);
await app.register(suppliesRoutes);
await app.register(missionRoutes);




app.listen({ port, host: "0.0.0.0" }).catch((error) => {
  app.log.error(error);
  process.exit(1);
});
