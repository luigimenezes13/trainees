# Desafio de aprendizado

Este arquivo mostra o que eu aprendi ao fazer o desafio 02-apis-challenge.

## Conceitos TypeScript/JavaScript

### Assíncrono e síncrono

Um código síncrono é executado de forma sequencial, um após o outro.

Quando um código assíncrono é executado, o Node deixa ele executando e realiza outras tarefas.

Antigamente, era necessário estabelecer *callbacks*, que são funções que serão executadas após o término do código assíncrono.

Porém, atualmente podemos facilitar a utilização de código assíncrono utilizando ferramentas que serão explicadas adiante.

#### Promises

*Promise* é um objeto que gerencia operações assíncronas.

Podemos envolver uma promessa ao redor de um código assíncrono.

Assim, estamos indicando que esse código irá eventualmente retornar um valor.

Esse objeto inicialmente estará no estado *pendente* e, depois de concluir a tarefa, ficará com status *resolved* (resolvido) ou *rejected* (rejeitado).

Criando uma promessa:

```
new Promise((resolve, reject) => { /* código assíncrono */ })
```

#### Async e Await

*Async* e *await* permitem que você escreva código assíncrono de maneira semelhante ao síncrono.

- **Async:** faz uma função se tornar assíncrona e retornar uma promessa.

Exemplo:

```typescript
// Podemos criar uma função assíncrona com a palavra-chave async
// Note que o retorno desta função é do tipo Promise<number>, ou seja, é
// uma Promise que eventualmente tornará um número
async function somar(): Promise<number> {
  return 10; // O JS/TS transforma isso em Promise.resolve(10)
}
```

No Node, devemos utilizar funções assíncronas em qualquer processo que possa ser demorado, como realizar uma requisição no banco de dados.

- **Await:** significa "espera assíncrona"; é uma palavra-chave que faz uma função assíncrona específica esperar outra função assíncrona.

Exemplo:

```typescript
// Note que estamos utilizando uma função assíncrona: async (request, reply)
app.post("/astronauts", async (request, reply) => {
  const body = createAstronautBody.parse(request.body);
  // Pedindo para criar astronauta no banco de dados
  const created = await createAstronaut(body);
  // Utilizamos await aqui, pois precisamos esperar o astronauta ser criado para depois enviar a resposta
  return reply.status(201).send(formatRow(created));
});
```

### Import e export

Colocar todo o código em um arquivo só pode ser complexo e difícil de manter; para evitar isso, podemos usar `import` e `export`.

- **Export:** palavra-chave que indica que uma função, variável, classe ou tipo pode ser utilizada em outros arquivos.

  Exemplo:

  ```typescript
  // Estamos exportando a função getSupplies(), fazendo com que ela seja utilizada em outros arquivos
  export async function getSupplies() {
    const { rows } = await pool.query<SupplyRow>(
      `
      SELECT * FROM supplies
    `
    );
    return rows;
  }
  ```

- **Import:** palavra-chave que indica que uma função, variável, classe ou tipo vem de outro arquivo.

  Exemplo:

  ```typescript
  // Aqui estamos importando as funções createSupply, deleteSupply, getSupplyById, getSupplies e updateSupply do arquivo ./supply.repository.js
  import {
    createSupply,
    deleteSupply,
    getSupplyById,
    getSupplies,
    updateSupply
  } from "./supply.repository.js";

  // Depois de importar, podemos utilizar as funções
  const result = await getSupplies();
  ```

Também podemos importar bibliotecas que foram instaladas no projeto.

Exemplo:

```typescript
// Importando a biblioteca Fastify
import Fastify from "fastify";
// Agora podemos utilizar a biblioteca
const app = Fastify({ logger: true });
```

## Database

Neste tópico, falaremos sobre o banco de dados utilizado na aplicação.

Nessa aplicação, utilizamos o banco de dados PostgreSQL, que está rodando dentro de um container.

### Subindo a database com Docker e PostgreSQL

Para subir a database, precisamos criar um arquivo `.env` e definir a variável de ambiente.

Desta forma, o servidor Node saberá como se conectar ao banco de dados.

Exemplo do arquivo `.env`:

```env
# Nesse caso, estamos enviando a variável DATABASE_URL com um link
# O link contém o protocolo (postgresql), o usuário da database (mars_user), a senha (mars_password),
# o IP e a porta (127.0.0.1:5432) e o nome do banco (mars)
DATABASE_URL=postgresql://mars_user:mars_password@127.0.0.1:5432/mars
```

Após configurar o arquivo, precisamos utilizar este comando para subir o container:

```bash
docker compose up -d
```

Certifique-se de estar no mesmo diretório do arquivo `docker-compose.yaml` (ou `docker-compose.yml`).

### Arquivo `client.ts`

Temos um arquivo `client.ts` para definir como nossa aplicação vai usar o banco de dados.

`client.ts`:

```typescript
// Importando módulo do postgres
import pg from "pg";

// Obtendo a pool para manter conexões abertas no banco de dados
const { Pool } = pg;

// Obtendo a URL do arquivo .env
const databaseUrl = process.env.DATABASE_URL;

// Conferindo se a URL foi passada
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined.");
}

// Estabelecendo uma nova conexão que se mantém aberta
export const pool = new Pool({
  connectionString: databaseUrl
});
```

### Docker Compose

O arquivo `docker-compose` define a regra ou a configuração de um ou mais containers.

`docker-compose.yml`:

```yaml
services:
  db:
    image: postgres:15  # imagem do container
    container_name: mars_db
    restart: unless-stopped
    environment: # Variáveis de ambiente
      POSTGRES_DB: mars
      POSTGRES_USER: mars_user
      POSTGRES_PASSWORD: mars_password
    ports: # porta
      - "5432:5432"
    volumes: # Volumes conseguem guardar dados mesmo que o container morra
      - postgres_data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql # copia o arquivo init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U mars_user -d mars"]
      interval: 5s
      timeout: 5s
      retries: 10

volumes:
  postgres_data:
```

### Arquivo `init.sql`

O arquivo `init.sql` é um arquivo com comandos SQL que é copiado para a pasta `docker-entrypoint-initdb.d` do container.

- A imagem do Postgres executa qualquer arquivo `.sql` dentro da pasta `/docker-entrypoint-initdb.d` quando o banco é criado.
- Desta forma, podemos colocar configurações iniciais do banco nesse arquivo.

Exemplo:

```sql
# Cria tabela de astronauts
CREATE TABLE astronauts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL,
  nationality VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  deleted_at TIMESTAMP DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

# Cria tabela de supplies
CREATE TABLE supplies(
  id SERIAL PRIMARY KEY,
  item VARCHAR (50),
  category VARCHAR (50),
  stock INT,
  quantity FLOAT
);
# Cria tabela de missões
CREATE TABLE missions(
  id SERIAL PRIMARY KEY,
  astronaut_id INT,
  supply_id INT,
  # Chave estrangeira indica que esse valor só pode ser igual ao de outra tabela
  # No caso, igual ao id de astronauts
  # Essa tabela contém uma relação one-to-one (um astronauta e um suprimento para cada missão)
  FOREIGN KEY (astronaut_id) REFERENCES astronauts(id),
  FOREIGN KEY (supply_id) REFERENCES supplies(id)
);
# Inserindo valores na tabela de astronautas
INSERT INTO astronauts (name, role, nationality, status) VALUES
  ('Valentina Cruz', 'Commander', 'Brazilian', 'active'),
  ('Elena Markov', 'Pilot', 'Russian', 'active'),
  ('Noah Patel', 'Engineer', 'Indian', 'active'),
  ('Liam O''Connor', 'Scientist', 'Irish', 'active'),
  ('Aiko Tanaka', 'Biologist', 'Japanese', 'active'),
  ('Miguel Herrera', 'Medic', 'Mexican', 'active'),
  ('Sara Ndlovu', 'Geologist', 'South African', 'active'),
  ('Lucas Meyer', 'Technician', 'German', 'active'),
  ('Hana Kim', 'Communications', 'South Korean', 'active'),
  ('Omar Farouk', 'Navigator', 'Egyptian', 'active'),
  ('Camila Souza', 'Engineer', 'Brazilian', 'inactive'),
  ('Daniel Novak', 'Pilot', 'Czech', 'active'),
  ('Fatima Al-Sayed', 'Scientist', 'UAE', 'active'),
  ('Thomas Reed', 'Commander', 'American', 'active'),
  ('Priya Singh', 'Medic', 'Indian', 'active'),
  ('Julien Moreau', 'Biologist', 'French', 'active'),
  ('Ines Duarte', 'Geologist', 'Portuguese', 'active'),
  ('Mateo Rojas', 'Technician', 'Chilean', 'active'),
  ('Zoe Walker', 'Navigator', 'Australian', 'active'),
  ('Anika Berg', 'Communications', 'Swedish', 'active');
```

## Servidor

Utilizamos Node para subir um servidor.

- Para facilitar o trabalho com requisições HTTP, utilizamos o pacote Fastify.

Para iniciar o servidor, precisamos utilizar estes comandos:

```bash
npm i
npm run dev
```

- `npm i` instala as dependências externas da aplicação.
- `npm run dev` executa o comando definido na parte `scripts` / `dev` do arquivo `package.json`.
- Neste projeto, o comando executado ao rodar `npm run dev` é `tsx watch src/server.ts`.

### Arquivo `server.ts`

O arquivo `server.ts` é onde tudo começa; nele, realizamos as configurações iniciais e chamamos outras funções do servidor, como as rotas.

`server.ts`:

```typescript
import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { astronautRoutes } from "./modules/astronauts/astronaut.routes.js";
import { suppliesRoutes } from "./modules/supplies/supply.routes.js";
import { missionRoutes } from "./modules/missions/mission.routes.js";

// Iniciando fastify, a variável app conterá todas as funcionalidades do servidor
// logger: true significa que estamos ativando o sistema de log
const app = Fastify({ logger: true });
// Definindo porta do servidor
const port = Number(process.env.PORT ?? 3333);

// Registrando cors (para permitir comunicação com o frontend)
await app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
});

// Definindo rota de status
app.get("/health", async (_request, reply) => {
  return reply.status(200).send({ status: "ok", mission: "Mars Mission Control" });
});

// Registrando rotas definidas em outros arquivos
await app.register(astronautRoutes);
await app.register(suppliesRoutes);
await app.register(missionRoutes);

// Iniciando servidor
// { port, host: "0.0.0.0" } significa que estamos iniciando o servidor localmente
app.listen({ port, host: "0.0.0.0" }).catch((error) => {
  app.log.error(error);
  process.exit(1);
});
```

## Arquivos `.routes`

Os arquivos `.routes` definem as URLs e o que acontece quando um endpoint é acessado.

Neste projeto, temos 3 arquivos de rotas, cada um relacionado a uma tabela do banco de dados.

Essa é a função principal do arquivo de rotas:

```typescript
// Note que estamos passando app como parâmetro; esse app é o que foi criado
// no arquivo server.ts e contém as funcionalidades do servidor
export async function astronautRoutes(app: FastifyInstance): Promise<void>
```

### Rotas GET

- Utilizando o método `.get` da variável `app`, podemos registrar um novo endpoint que utiliza o método GET.
- Esse método recebe dois argumentos: o primeiro parâmetro é a URL do endpoint; o segundo parâmetro é uma função que será executada quando o endpoint for acessado.
- A função executada apresenta dois argumentos, `request` e `reply`. `request` é o que foi enviado ao endpoint; `reply` é a resposta que será enviada a quem acessou o endpoint.

Segue o exemplo de um endpoint que retorna os astronautas do banco de dados conforme a query enviada:

```typescript
app.get("/astronauts", async (request, reply) => {
  // Verificando se a query está correta
  // A query de pesquisa é enviada pela URL. Exemplo: /astronauts?name=Luigi
  const query = findAstronautsQuery.parse(request.query);
  // Buscando astronautas do banco de dados de acordo com a query
  const result = await findAstronauts(query);

  // Enviando os astronautas encontrados em forma de página
  return reply.status(200).send({
    data: result.data.map(formatRow),
    pagination: result.pagination
  });
});
```

### Rotas POST

- Utilizando o método `.post` da variável `app`, podemos definir um endpoint que utiliza o método POST.
- Normalmente, endpoints que utilizam o método POST exigem que um body seja enviado ao acessar o endpoint.
- Um body é basicamente onde são transportados os dados de uma requisição HTTP.

Neste exemplo, estamos utilizando o body enviado para criar um novo astronauta no nosso banco de dados:

```typescript
app.post("/astronauts", async (request, reply) => {
  // Verificando se o body está correto
  const body = createAstronautBody.parse(request.body);
  // Criando astronauta no banco
  const created = await createAstronaut(body);
  // Enviando resposta
  return reply.status(201).send(formatRow(created));
});
```

### Método PUT

Utilizando o método `.put` da variável `app`, podemos definir um endpoint que utiliza o método PUT.

O método PUT é utilizado para modificar um recurso já existente.

Podemos utilizar o body para enviar os novos dados que serão atualizados.

Podemos utilizar o `.params` da requisição para indicar qual recurso queremos editar; `params` são variáveis enviadas diretamente pela URL do endpoint.

Exemplo: `/astronauts/1` — nessa URL, estamos pedindo para editar o astronauta com o `id` 1.

Esse endpoint realiza o *update* de um astronauta do banco:

```typescript
// Estamos colocando ":id" na URL para especificar que queremos receber um id em params
app.put("/astronauts/:id", async (request, reply) => {
  // Verificando se um id do .params foi enviado corretamente
  const id = astronautId.parse(request.params.id);
  // Conferindo se um body foi enviado corretamente
  const body = updateAstronautBody.parse(request.body);

  try {
    // Atualizando astronauta do banco
    const updated = await updateAstronaut(id, body);
    // Enviando resposta
    return reply.status(200).send(updated);
  } catch (error: any) {
    throw error;
  }
});
```

### Método DELETE

Podemos utilizar o método `.delete` da variável `app` para registrar um endpoint que utiliza o método DELETE.

Podemos utilizar o `params` para definir qual recurso excluir.

Esse endpoint faz um *soft delete* de um astronauta no banco de dados:

```typescript
app.delete("/astronauts/:id", async (request, reply) => {
  // Verificando se o id foi enviado corretamente
  const id = astronautId.parse(request.params.id);
  try {
    // Realizando soft delete
    const astronaut = await softDeleteAstronaut(id);
    return reply.status(204).send();
  } catch (error: any) {
    throw error;
  }
});
```

## Arquivos `.schemas`

Nos arquivos `.routes`, podemos notar que fazemos uma verificação dos dados enviados; essa verificação é definida por meio dos arquivos `.schema`.

Para facilitar a verificação dos dados, utilizamos a biblioteca Zod.

Exemplo de arquivo `.schema`:

```typescript
import { z } from "zod";

// Definindo como o astronaut id deve ser verificado
export const astronautId = z.coerce.number().int().positive();

// Definindo como a query de pesquisa deve ser feita
export const findAstronautsQuery = z.object({
  search: z.string().trim().optional(),
  page: z.coerce.number().int().positive().optional(),
  limit: z.coerce.number().int().positive().optional()
});
// Definindo os dados que o body da requisição de criação deve ter
export const createAstronautBody = z.object({
  name: z.string().trim().min(2),
  role: z.string().trim().min(1),
  nationality: z.string().trim().min(1)
});

// Definindo os dados que o body da requisição de update deve ter
export const updateAstronautBody = z
  .object({
    name: z.string().trim().min(2).optional(),
    role: z.string().trim().min(1).optional(),
    nationality: z.string().trim().min(1).optional(),
    status: z.enum(["active", "inactive"]).optional()
  })
  .refine((data) => Object.values(data).some((v) => v !== undefined), {
    message: "at least one field is required"
  });

// Criando tipos do TypeScript com base nas configurações feitas
export type FindAstronautsParams = z.infer<typeof findAstronautsQuery>;
export type CreateAstronautData = z.infer<typeof createAstronautBody>;
export type UpdateAstronautData = z.infer<typeof updateAstronautBody>;
```

Não se esqueça de importar essas configurações para utilizá-las em outros arquivos.

Exemplo:

```typescript
import { astronautId, createAstronautBody, findAstronautsQuery, updateAstronautBody } from "./astronaut.schema.js";
```

## Arquivos `.repository`

Repositórios são arquivos que definem ações realizadas no banco de dados.

Nos arquivos `.routes` podemos perceber que realizamos ações no banco de dados por meio de funções como `createAstronaut(body)`; essas funções são declaradas nos repositórios.

### Função `create`

Podemos definir uma função que cria um novo astronauta na tabela.

Essa função recebe como parâmetro o body enviado na requisição.

Exemplo:

```typescript
export async function createAstronaut(data: CreateAstronautData): Promise<AstronautRow> {
  // Obtendo a data atual
  const now = new Date();

  // Realizando query no banco de dados para criar novo astronauta
  // Note que os valores marcados com $ serão substituídos pelo conteúdo enviado no segundo
  // argumento: no caso, data.name, data.role, data.nationality e now
  const { rows } = await pool.query<AstronautRow>(
    `INSERT INTO astronauts (name, role, nationality, status, created_at, updated_at)
     VALUES ($1, $2, $3, 'active', $4, $4)
     RETURNING *`,
    [data.name, data.role, data.nationality, now]
  );

  // Retornando o astronauta criado
  return rows[0];
}
```

### Função `update`

Podemos criar uma função que atualiza linhas do nosso banco de dados.

Exemplo de função que atualiza astronauta:

```typescript
// Essa função recebe como argumento o body e o id (params)
export async function updateAstronaut(id: number, data: UpdateAstronautData): Promise<AstronautRow | null> {
  const now = new Date();
  // Criando objeto que terá os dados atualizados
  const updatedData = { ...data, updated_at: now };
  // Obtendo array de strings que conterá valores nesse formato: "campo = $numero"
  const fields = Object.keys(updatedData)
    .map((field, index) => {
      return `${field} = $${index + 2}`;
    })
    .join(", ");
  const values = Object.values(updatedData);
  // Realizando query
  const { rows } = await pool.query<AstronautRow>(
    `
      UPDATE astronauts
      SET ${fields}
      WHERE id = $1
      RETURNING *
    `,
    [id, ...values]
  );
  if (rows.length <= 0) {
    throw new NaoEncontradoErro("Astronauta", id);
  }
  // Retornando astronauta atualizado
  return rows[0];
}
```

## Lidando com erros

O Fastify oferece uma função geral para lidar com erros; para utilizá-la, usamos o método `app.setErrorHandler`.

Esse manipulador de erros consegue identificar qual erro ocorreu e enviar uma resposta adequada.

Neste projeto, esse método foi configurado nos arquivos de rotas.

```typescript
  app.setErrorHandler((error, _request, reply) => {
    // Verificando se foi erro do Zod (dados inválidos)
    if (error instanceof ZodError) {
      return reply.status(400).send(formatZodError(error));
    }
    // Verificando se ocorreu erro de valor não encontrado
    if (error instanceof NaoEncontradoErro) {
      reply.status(404).send({ error: error.message });
    }
    // Caso contrário, responde com erro de status 500
    reply.status(500).send({ error: "Internal server error" });
  });
```

Com o método definido, qualquer erro que ocorrer será tratado por essa função.

### Criando erros customizados

Podemos criar erros customizados estendendo a classe `Error`.

```typescript
// Criando erro customizado
export class NaoEncontradoErro extends Error {
  constructor(recurso: string, identificador: string | number) {
    // Configurando propriedades de mensagem e nome
    super(`${recurso} com identificador '${identificador}' não encontrado`);
    this.name = "NaoEncontradoErro";
  }
}
```

Para utilizar um erro customizado, precisamos importá-lo e utilizar o comando `throw`.

```typescript
import { NaoEncontradoErro } from "../../errors.js";

if (rows.length <= 0) {
  throw new NaoEncontradoErro("Astronauta", id);
}
```
