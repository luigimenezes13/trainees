/**
 * Aula 02-APIs / 04 - API completa com validacao + erros + SQLite
 *
 * Objetivo: juntar tudo — Zod, error handler, CRUD com SQLite, paginacao.
 * Este arquivo e a referencia completa do modulo de APIs.
 *
 * Pre-requisito: rode primeiro o setup do banco
 *   npx tsx ../03-rest-crud/src/01-sqlite-setup.ts
 *
 * Como testar:
 *   npx tsx src/03-status-codes-semanticos.ts
 *
 *   curl "http://localhost:3000/astronautas?page=1&limit=3"
 *   curl http://localhost:3000/astronautas/1
 *   curl http://localhost:3000/astronautas/999
 *   curl -X POST http://localhost:3000/astronautas \
 *     -H "Content-Type: application/json" \
 *     -d '{"nome": "Sara Ndlovu", "funcao": "Geologist", "nacionalidade": "South African"}'
 *   curl -X POST http://localhost:3000/astronautas \
 *     -H "Content-Type: application/json" \
 *     -d '{"nome": "S"}'
 *   curl -X PUT http://localhost:3000/astronautas/1 \
 *     -H "Content-Type: application/json" \
 *     -d '{"funcao": "Senior Commander"}'
 *   curl -X DELETE http://localhost:3000/astronautas/1
 */

import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import Database from "better-sqlite3";
import { z, ZodError } from "zod";

const PORT = 3000;
const database = new Database("../03-rest-crud/mars.db");
database.pragma("journal_mode = WAL");

// ---------------------------------------------------------------
// Schemas Zod
// ---------------------------------------------------------------
const criarAstronautaSchema = z.object({
  nome: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres"),
  funcao: z.string().trim().min(1, "Funcao e obrigatoria"),
  nacionalidade: z.string().trim().min(1, "Nacionalidade e obrigatoria"),
});

const atualizarAstronautaSchema = z
  .object({
    nome: z.string().trim().min(2).optional(),
    funcao: z.string().trim().min(1).optional(),
    nacionalidade: z.string().trim().min(1).optional(),
    status: z.enum(["active", "inactive"]).optional(),
  })
  .refine((dados) => Object.values(dados).some((valor) => valor !== undefined), {
    message: "Pelo menos um campo deve ser enviado",
  });

const parametrosBuscaSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
  search: z.string().trim().optional(),
});

// ---------------------------------------------------------------
// Erros customizados
// ---------------------------------------------------------------
class NaoEncontradoErro extends Error {
  constructor(recurso: string, identificador: string | number) {
    super(`${recurso} com identificador '${identificador}' nao encontrado`);
    this.name = "NaoEncontradoErro";
  }
}

// ---------------------------------------------------------------
// Error handler centralizado
// ---------------------------------------------------------------
function tratarErro(erro: unknown, response: ServerResponse): void {
  if (erro instanceof ZodError) {
    enviarJson(response, 400, {
      erro: "Dados invalidos",
      detalhes: erro.errors.map((detalhe) => ({
        campo: detalhe.path.join("."),
        mensagem: detalhe.message,
      })),
    });
    return;
  }

  if (erro instanceof NaoEncontradoErro) {
    enviarJson(response, 404, { erro: erro.message });
    return;
  }

  if (erro instanceof SyntaxError) {
    enviarJson(response, 400, { erro: "JSON invalido" });
    return;
  }

  console.error("Erro inesperado:", erro);
  enviarJson(response, 500, { erro: "Erro interno do servidor" });
}

// ---------------------------------------------------------------
// Utilitarios HTTP
// ---------------------------------------------------------------
function lerBody(request: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    request.on("data", (chunk: Buffer) => chunks.push(chunk));
    request.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
    request.on("error", reject);
  });
}

function enviarJson(response: ServerResponse, statusCode: number, dados: unknown): void {
  response.writeHead(statusCode, { "Content-Type": "application/json" });
  response.end(JSON.stringify(dados));
}

// ---------------------------------------------------------------
// Repository: acesso ao banco
// ---------------------------------------------------------------
function listarAstronautas(parametros: z.infer<typeof parametrosBuscaSchema>) {
  const { page, limit, search } = parametros;
  const offset = (page - 1) * limit;

  const condicoes = ["deleted_at IS NULL"];
  const valores: unknown[] = [];

  if (search?.trim()) {
    condicoes.push("nome LIKE ?");
    valores.push(`%${search.trim()}%`);
  }

  const where = `WHERE ${condicoes.join(" AND ")}`;

  const contagem = database.prepare(`SELECT COUNT(*) AS total FROM astronautas ${where}`).get(...valores) as { total: number };
  const dados = database.prepare(`SELECT * FROM astronautas ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`).all(...valores, limit, offset);

  return {
    data: dados,
    pagination: {
      total: contagem.total,
      page,
      limit,
      totalPages: Math.ceil(contagem.total / limit),
    },
  };
}

function buscarPorId(id: number) {
  const astronauta = database.prepare("SELECT * FROM astronautas WHERE id = ? AND deleted_at IS NULL").get(id);
  if (!astronauta) throw new NaoEncontradoErro("Astronauta", id);
  return astronauta;
}

function criarAstronauta(dados: z.infer<typeof criarAstronautaSchema>) {
  const resultado = database.prepare(
    "INSERT INTO astronautas (nome, funcao, nacionalidade) VALUES (?, ?, ?)"
  ).run(dados.nome, dados.funcao, dados.nacionalidade);

  return database.prepare("SELECT * FROM astronautas WHERE id = ?").get(resultado.lastInsertRowid);
}

function atualizarAstronauta(id: number, dados: z.infer<typeof atualizarAstronautaSchema>) {
  buscarPorId(id); // garante que existe

  const campos = Object.entries(dados)
    .filter(([, valor]) => valor !== undefined)
    .map(([campo]) => `${campo} = ?`);

  const valores = Object.values(dados).filter((valor) => valor !== undefined);

  database.prepare(
    `UPDATE astronautas SET ${campos.join(", ")}, updated_at = datetime('now') WHERE id = ?`
  ).run(...valores, id);

  return database.prepare("SELECT * FROM astronautas WHERE id = ?").get(id);
}

function softDeleteAstronauta(id: number) {
  buscarPorId(id); // garante que existe
  database.prepare("UPDATE astronautas SET deleted_at = datetime('now'), updated_at = datetime('now') WHERE id = ?").run(id);
}

// ---------------------------------------------------------------
// Middlewares
// ---------------------------------------------------------------
function aplicarCors(response: ServerResponse): void {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

// ---------------------------------------------------------------
// Servidor
// ---------------------------------------------------------------
function extrairId(url: string): number | null {
  const match = url.match(/^\/astronautas\/(\d+)$/);
  return match ? Number(match[1]) : null;
}

const server = createServer(async (request, response) => {
  const method = request.method ?? "GET";
  const url = request.url ?? "/";
  const path = url.split("?")[0];
  const inicio = Date.now();

  aplicarCors(response);

  // Preflight CORS
  if (method === "OPTIONS") {
    response.writeHead(204);
    response.end();
    return;
  }

  response.on("finish", () => {
    console.log(`${method} ${url} → ${response.statusCode} (${Date.now() - inicio}ms)`);
  });

  try {
    // GET /astronautas
    if (path === "/astronautas" && method === "GET") {
      const urlObj = new URL(url, "http://localhost");
      const parametros = parametrosBuscaSchema.parse({
        page: urlObj.searchParams.get("page") ?? undefined,
        limit: urlObj.searchParams.get("limit") ?? undefined,
        search: urlObj.searchParams.get("search") ?? undefined,
      });
      enviarJson(response, 200, listarAstronautas(parametros));
      return;
    }

    // POST /astronautas
    if (path === "/astronautas" && method === "POST") {
      const corpo = await lerBody(request);
      const dados = criarAstronautaSchema.parse(JSON.parse(corpo));
      const criado = criarAstronauta(dados);
      enviarJson(response, 201, criado);
      return;
    }

    const id = extrairId(path);

    // GET /astronautas/:id
    if (id !== null && method === "GET") {
      enviarJson(response, 200, buscarPorId(id));
      return;
    }

    // PUT /astronautas/:id
    if (id !== null && method === "PUT") {
      const corpo = await lerBody(request);
      const dados = atualizarAstronautaSchema.parse(JSON.parse(corpo));
      const atualizado = atualizarAstronauta(id, dados);
      enviarJson(response, 200, atualizado);
      return;
    }

    // DELETE /astronautas/:id
    if (id !== null && method === "DELETE") {
      softDeleteAstronauta(id);
      response.writeHead(204);
      response.end();
      return;
    }

    enviarJson(response, 404, { erro: "Rota nao encontrada" });
  } catch (erro) {
    tratarErro(erro, response);
  }
});

server.listen(PORT, () => {
  console.log(`API completa rodando em http://localhost:${PORT}`);
});
