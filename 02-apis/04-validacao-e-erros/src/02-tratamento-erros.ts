/**
 * Aula 02-APIs / 04 - Tratamento de erros centralizado
 *
 * Objetivo: criar um error handler unico que converte erros em respostas
 * HTTP adequadas. Mesmo padrao usado por frameworks como Fastify e Express.
 *
 * Como testar:
 *   npx tsx src/02-tratamento-erros.ts
 *
 *   curl http://localhost:3000/astronautas/1       (200 - encontrado)
 *   curl http://localhost:3000/astronautas/999     (404 - nao encontrado)
 *   curl -X POST http://localhost:3000/astronautas \
 *     -H "Content-Type: application/json" \
 *     -d '{"nome": "V"}'                           (400 - validacao)
 *   curl http://localhost:3000/erro-interno         (500 - erro inesperado)
 */

import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { z, ZodError } from "zod";

const PORT = 3000;

// ---------------------------------------------------------------
// Erros customizados: cada tipo de erro gera um status code diferente
// ---------------------------------------------------------------
class NaoEncontradoErro extends Error {
  constructor(recurso: string, identificador: string | number) {
    super(`${recurso} com identificador '${identificador}' nao encontrado`);
    this.name = "NaoEncontradoErro";
  }
}

class ConflitErro extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = "ConflitErro";
  }
}

// ---------------------------------------------------------------
// Error handler centralizado
// ---------------------------------------------------------------
function tratarErro(erro: unknown, response: ServerResponse): void {
  // Erro de validacao (Zod) → 400
  if (erro instanceof ZodError) {
    response.writeHead(400, { "Content-Type": "application/json" });
    response.end(JSON.stringify({
      erro: "Dados invalidos",
      detalhes: erro.errors.map((detalhe) => ({
        campo: detalhe.path.join("."),
        mensagem: detalhe.message,
      })),
    }));
    return;
  }

  // Recurso nao encontrado → 404
  if (erro instanceof NaoEncontradoErro) {
    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ erro: erro.message }));
    return;
  }

  // Conflito de estado → 409
  if (erro instanceof ConflitErro) {
    response.writeHead(409, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ erro: erro.message }));
    return;
  }

  // Erro inesperado → 500
  // IMPORTANTE: log no servidor, mensagem generica pro cliente
  console.error("Erro inesperado:", erro);
  response.writeHead(500, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ erro: "Erro interno do servidor" }));
}

// ---------------------------------------------------------------
// Schema Zod
// ---------------------------------------------------------------
const criarAstronautaSchema = z.object({
  nome: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres"),
  funcao: z.string().trim().min(1, "Funcao e obrigatoria"),
  nacionalidade: z.string().trim().min(1, "Nacionalidade e obrigatoria"),
});

// ---------------------------------------------------------------
// Utilitarios
// ---------------------------------------------------------------
function lerBody(request: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    request.on("data", (chunk: Buffer) => chunks.push(chunk));
    request.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
    request.on("error", reject);
  });
}

// ---------------------------------------------------------------
// "Banco" fake para demonstracao
// ---------------------------------------------------------------
const astronautas = [
  { id: 1, nome: "Valentina Cruz", funcao: "Commander", nacionalidade: "Brazilian" },
  { id: 2, nome: "Noah Patel", funcao: "Engineer", nacionalidade: "Indian" },
];

// ---------------------------------------------------------------
// Servidor com error handler
// ---------------------------------------------------------------
const server = createServer(async (request, response) => {
  const method = request.method ?? "GET";
  const url = request.url ?? "/";

  try {
    // GET /astronautas/:id
    const matchId = url.match(/^\/astronautas\/(\d+)$/);
    if (matchId && method === "GET") {
      const id = Number(matchId[1]);
      const astronauta = astronautas.find((a) => a.id === id);

      if (!astronauta) {
        throw new NaoEncontradoErro("Astronauta", id);
      }

      response.writeHead(200, { "Content-Type": "application/json" });
      response.end(JSON.stringify(astronauta));
      return;
    }

    // POST /astronautas
    if (url === "/astronautas" && method === "POST") {
      const corpo = await lerBody(request);
      const dados = criarAstronautaSchema.parse(JSON.parse(corpo));

      response.writeHead(201, { "Content-Type": "application/json" });
      response.end(JSON.stringify({ id: 3, ...dados }));
      return;
    }

    // Rota para simular erro inesperado
    if (url === "/erro-interno") {
      throw new Error("Algo deu muito errado!");
    }

    response.writeHead(404, { "Content-Type": "application/json" });
    response.end(JSON.stringify({ erro: "Rota nao encontrada" }));
  } catch (erro) {
    tratarErro(erro, response);
  }
});

server.listen(PORT, () => {
  console.log(`Servidor com error handler rodando em http://localhost:${PORT}`);
});
