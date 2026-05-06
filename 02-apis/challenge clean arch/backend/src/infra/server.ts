import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { astronautController } from "./controllers/astronautController.js";
import { NotFound } from "../domain/errors/errors.js";
import { ZodError } from "zod";
import { formatZodError } from "../shared/utils.js";


const app = Fastify({ logger: true });
const port = Number(process.env.PORT ?? 3333);

await app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
});


app.setErrorHandler((error, _request, reply) => {
  if(error instanceof NotFound){
    return reply.status(404).send(error)
  }

  if(error instanceof ZodError)
    return reply.status(400).send(formatZodError(error))

  return reply.status(500).send(error)
})

app.get("/health", async (_request, reply) => {
  return reply.status(200).send({ status: "ok", mission: "Mars Mission Control" });
});

await app.register(astronautController);


app.listen({ port, host: "0.0.0.0" }).catch((error) => {
  app.log.error(error);
  process.exit(1);
});
