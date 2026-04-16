/**
 * Aula 02-APIs / 03 - Paginacao e Filtros
 *
 * Objetivo: adicionar query parameters para paginar e buscar dados.
 * Isso e essencial em qualquer API real — nunca retornamos tudo de uma vez.
 *
 * Pre-requisito: rode `npx tsx src/01-sqlite-setup.ts` antes.
 *
 * Como testar:
 *   npx tsx src/03-paginacao-e-filtros.ts
 *
 *   curl "http://localhost:3000/astronautas"
 *   curl "http://localhost:3000/astronautas?page=1&limit=2"
 *   curl "http://localhost:3000/astronautas?search=valentina"
 *   curl "http://localhost:3000/astronautas?page=1&limit=2&search=a"
 */

import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import Database from "better-sqlite3";

const PORT = 3000;
const database = new Database("mars.db");
database.pragma("journal_mode = WAL");

// ---------------------------------------------------------------
// Utilitarios HTTP
// ---------------------------------------------------------------
function enviarJson(response: ServerResponse, statusCode: number, dados: unknown): void {
  response.writeHead(statusCode, { "Content-Type": "application/json" });
  response.end(JSON.stringify(dados));
}

// ---------------------------------------------------------------
// Funcao de listagem com paginacao e filtro
// ---------------------------------------------------------------
interface ParametrosBusca {
  page: number;
  limit: number;
  search?: string;
}

function listarComPaginacao(parametros: ParametrosBusca) {
  const { page, limit, search } = parametros;
  const offset = (page - 1) * limit;

  // Monta WHERE dinamicamente
  const condicoes = ["deleted_at IS NULL"];
  const valores: unknown[] = [];

  if (search?.trim()) {
    condicoes.push("nome LIKE ?");
    valores.push(`%${search.trim()}%`);
  }

  const where = `WHERE ${condicoes.join(" AND ")}`;

  // Conta total de registros (para calcular total de paginas)
  const contagemSql = `SELECT COUNT(*) AS total FROM astronautas ${where}`;
  const contagem = database.prepare(contagemSql).get(...valores) as { total: number };

  // Busca a pagina solicitada
  const dadosSql = `SELECT * FROM astronautas ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`;
  const dados = database.prepare(dadosSql).all(...valores, limit, offset);

  const totalPaginas = Math.ceil(contagem.total / limit);

  return {
    data: dados,
    pagination: {
      total: contagem.total,
      page,
      limit,
      totalPages: totalPaginas,
    },
  };
}

// ---------------------------------------------------------------
// Extrai query parameters da URL
// ---------------------------------------------------------------
function extrairParametros(url: string): ParametrosBusca {
  const urlObj = new URL(url, "http://localhost");

  const page = Math.max(1, Number(urlObj.searchParams.get("page") ?? 1));
  const limit = Math.min(50, Math.max(1, Number(urlObj.searchParams.get("limit") ?? 10)));
  const search = urlObj.searchParams.get("search") ?? undefined;

  return { page, limit, search };
}

// ---------------------------------------------------------------
// Servidor
// ---------------------------------------------------------------
const server = createServer((request, response) => {
  const method = request.method ?? "GET";
  const url = request.url ?? "/";

  console.log(`${method} ${url}`);

  if (method === "GET" && url.startsWith("/astronautas")) {
    const parametros = extrairParametros(url);
    const resultado = listarComPaginacao(parametros);
    enviarJson(response, 200, resultado);
    return;
  }

  enviarJson(response, 404, { erro: "Rota nao encontrada" });
});

server.listen(PORT, () => {
  console.log(`API com paginacao rodando em http://localhost:${PORT}`);
  console.log("Teste: curl \"http://localhost:3000/astronautas?page=1&limit=2\"");
});
