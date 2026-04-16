/**
 * Desafio: Roteador HTTP manual
 *
 * Objetivo: criar um servidor HTTP que responda corretamente a diferentes
 * combinacoes de metodo + URL, usando apenas o modulo nativo `node:http`.
 *
 * Requisitos:
 *
 * 1) GET  /health       → 200, JSON: { "status": "ok" }
 *
 * 2) GET  /astronautas  → 200, JSON: lista fixa de 3 astronautas
 *    Cada astronauta deve ter: nome, funcao, nacionalidade
 *
 * 3) POST /astronautas  → leia o body JSON e responda 201 com o objeto recebido
 *    + campo "recebidoEm" com a data/hora atual (new Date().toISOString())
 *    Se o body nao for JSON valido → 400, JSON: { "erro": "JSON invalido" }
 *    Se Content-Type nao for application/json → 415
 *
 * 4) Qualquer outra rota → 404, JSON: { "erro": "Rota nao encontrada" }
 *
 * 5) Metodo nao suportado em rota existente → 405, JSON: { "erro": "Metodo nao permitido" }
 *
 * Como validar:
 *   npx tsx challenge/desafio-roteador.ts
 *
 *   curl http://localhost:3000/health
 *   curl http://localhost:3000/astronautas
 *   curl -X POST http://localhost:3000/astronautas \
 *     -H "Content-Type: application/json" \
 *     -d '{"nome": "Luigi", "funcao": "Engineer"}'
 *   curl -X PUT http://localhost:3000/astronautas
 *   curl http://localhost:3000/rota-qualquer
 */

import { createServer } from "node:http";

const PORT = 3000;

function lerBody(request: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    request.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });

    request.on("end", () => {
      resolve(Buffer.concat(chunks).toString("utf-8"));
    });

    request.on("error", reject);
  });
}


interface Astronaut {
    name : string,
    role : string,
    nationality: string
}

const astronautList : Astronaut[] = 
[
  {
    name: "joao",
    role: "chefe",
    nationality: "brasileiro"

  },
  {
    name: "jorge",
    role: "assistente",
    nationality: "alemão"
  },
  {
    name: "julia",
    role: "administrador",
    nationality: "australiana",
  }
]

// Implemente aqui

const server = createServer(async (request, response) => {
  // TODO: implemente o roteador conforme os requisitos acima

  const { method, url,headers} = request
  if(url == '/health'){
    if(method == 'GET'){
      response.writeHead(200,{ "Content-type": "application/json"})
      response.end(JSON.stringify({ status: "ok"}))
      return
    }
    response.writeHead(405,{ "Content-type": "application/json"})
    response.end(JSON.stringify({error: "metodo não suportado para essa rota"} ))
    return
  }
  if(url == '/astronautas'){
  if(method == 'GET' && url == '/astronautas'){
    response.writeHead(200,{"Content-type": "application/json"})
    response.end(JSON.stringify(astronautList))
    return
  }

  if(method == 'POST' && url == '/astronautas'){
    const contentType = headers["content-type"]
    if(!contentType?.includes("application/json")){
      response.writeHead(415, {"Content-type" : "application/json"})
      response.end(JSON.stringify({erro: "content type precisa ser application/json"}))
      return
    }
    const bodyText = await lerBody(request)
    try{
      const data = JSON.parse(bodyText)
      response.writeHead(201, {"Content-type" : "application/json"})
      response.end(JSON.stringify({
        message: "dados recebidos com sucesso",
        data
      }))

    }catch{
      response.writeHead(400, {"Content-type" : "application/json"})
      response.end(JSON.stringify({erro: "JSON inválido"}))
      
    }
    return

  }
  response.writeHead(405,{ "Content-type": "application/json"})
  response.end(JSON.stringify({error: "metodo não suportado para essa rota"} ))
  return
}

  response.writeHead(404, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ erro: "Rota não encontrada" }));

    

  
});

server.listen(PORT, () => {
  console.log(`Desafio rodando em http://localhost:${PORT}`);
});
