/**
 * Aula 02-APIs / 04 - Validacao de entrada com Zod
 *
 * Objetivo: usar Zod para validar dados antes de processar.
 * Zod e a mesma lib usada no projeto Mars Mission Control (trainee-program).
 *
 * Como testar:
 *   npx tsx src/01-validacao-entrada.ts
 *
 *   # Valido
 *   curl -X POST http://localhost:3000/astronautas \
 *     -H "Content-Type: application/json" \
 *     -d '{"nome": "Valentina Cruz", "funcao": "Commander", "nacionalidade": "Brazilian"}'
 *
 *   # Invalido: nome muito curto, funcao vazia
 *   curl -X POST http://localhost:3000/astronautas \
 *     -H "Content-Type: application/json" \
 *     -d '{"nome": "V", "funcao": "", "nacionalidade": "Brazilian"}'
 *
 *   # Invalido: campo faltando
 *   curl -X POST http://localhost:3000/astronautas \
 *     -H "Content-Type: application/json" \
 *     -d '{"nome": "Valentina"}'
 */

import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { z, ZodError } from "zod";

const PORT = 3000;

// ---------------------------------------------------------------
// Schemas Zod: definem a forma esperada dos dados
// ---------------------------------------------------------------

// Schema para criar astronauta — todos os campos obrigatorios
const criarAstronautaSchema = z.object({
  nome: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres"),
  funcao: z.string().trim().min(1, "Funcao e obrigatoria"),
  nacionalidade: z.string().trim().min(1, "Nacionalidade e obrigatoria"),
});

// Schema para atualizar — todos opcionais, mas pelo menos um obrigatorio
const atualizarAstronautaSchema = z
  .object({
    nome: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres").optional(),
    funcao: z.string().trim().min(1, "Funcao e obrigatoria").optional(),
    nacionalidade: z.string().trim().min(1, "Nacionalidade e obrigatoria").optional(),
    status: z.enum(["active", "inactive"], { message: "Status deve ser 'active' ou 'inactive'" }).optional(),
  })
  .refine((dados) => Object.values(dados).some((valor) => valor !== undefined), {
    message: "Pelo menos um campo deve ser enviado para atualizacao",
  });

// Zod infere os tipos automaticamente — nao precisamos definir interfaces manuais
type CriarAstronauta = z.infer<typeof criarAstronautaSchema>;
type AtualizarAstronauta = z.infer<typeof atualizarAstronautaSchema>;

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
// Funcao que formata erros do Zod em mensagem amigavel
// ---------------------------------------------------------------
function formatarErrosZod(erro: ZodError) {
  return {
    erro: "Dados invalidos",
    detalhes: erro.errors.map((detalhe) => ({
      campo: detalhe.path.join("."),
      mensagem: detalhe.message,
    })),
  };
}

// ---------------------------------------------------------------
// Servidor com validacao
// ---------------------------------------------------------------
const server = createServer(async (request, response) => {
  const method = request.method ?? "GET";
  const url = request.url ?? "/";

  if (url === "/astronautas" && method === "POST") {
    const corpo = await lerBody(request);

    // Tenta parsear JSON
    let dados: unknown;
    try {
      dados = JSON.parse(corpo);
    } catch {
      enviarJson(response, 400, { erro: "JSON invalido" });
      return;
    }

    // Valida com Zod
    const resultado = criarAstronautaSchema.safeParse(dados);

    if (!resultado.success) {
      enviarJson(response, 400, formatarErrosZod(resultado.error));
      return;
    }

    // Aqui resultado.data e tipado como CriarAstronauta
    const astronauta = resultado.data;
    console.log("Astronauta valido:", astronauta);

    enviarJson(response, 201, {
      mensagem: "Astronauta criado com sucesso",
      dados: { id: 1, ...astronauta, status: "active" },
    });
    return;
  }

  enviarJson(response, 404, { erro: "Rota nao encontrada" });
});

server.listen(PORT, () => {
  console.log(`Servidor com validacao Zod rodando em http://localhost:${PORT}`);
});
