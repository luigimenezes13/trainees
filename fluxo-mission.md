# Fluxo de criação de missão

Neste projeto, foi definido que uma **missão** (entidade `Mission`) é criada com vários astronautas e vários suprimentos:

```typescript
type MissionProps = {
  astronautsId: Identifier[];
  suppliesId: Identifier[];
};
```

## Rotas (Routes)

Quando o usuário faz uma requisição `POST` em `/missions`, é executada a função definida em `infra/routes/mission.routes.ts`:

```typescript
app.post("/missions", async (request, reply) => {
  const data = createMissionBody.parse(request.body);
  const mission = await createMissionUseCase.execute(data);
  return reply.status(201).send(mission);
});
```

## Caso de uso (UseCase)

A função nas rotas chama `createMissionUseCase.execute`, definida em `app/usecases/CreateMissionUseCase.ts`:

```typescript
import { Mission } from "../../domain/aggregates/Mission.js";
import { Astronaut } from "../../domain/entities/Astronaut.js";
import { Supply } from "../../domain/entities/Supply.js";
import { NaoEncontradoErro } from "../../domain/errors/errors.js";
import { AstronautRepository } from "../../domain/repositories/astronautRepository.js";
import { MissionRepository } from "../../domain/repositories/missionRepository.js";
import { SupplyRepository } from "../../domain/repositories/supplyRepository.js";
import { UseCase } from "../../domain/value-objects/UseCase.js";
import { CreateMissionDto } from "../dto/CreateMissionDto.js";

export class CreateMissionUseCase implements UseCase<CreateMissionDto, Promise<Mission>> {
  constructor(
    private missionRepository: MissionRepository,
    private astronautRepository: AstronautRepository,
    private supplyRepository: SupplyRepository
  ) {}

  async execute(data: CreateMissionDto): Promise<Mission> {
    // Verificando se astronautas existem
    const astronauts = await Promise.all(
      data.astronautIds.map((id) => this.astronautRepository.findById(id))
    );
    astronauts.forEach((astronaut, index) => {
      if (!astronaut) {
        throw new NaoEncontradoErro("Astronauta", data.astronautIds[index]);
      }
    });

    // Verificando se suprimentos existem
    const supplies = await Promise.all(
      data.supplyIds.map((id) => this.supplyRepository.findById(id))
    );

    supplies.forEach((supply, index) => {
      if (!supply) {
        throw new NaoEncontradoErro("Suprimento", data.supplyIds[index]);
      }
    });

    // Chamando método create definido no domain
    const mission = Mission.create(astronauts as Astronaut[], supplies as Supply[]);
    const createdMission = await this.missionRepository.create(mission);

    return createdMission;
  }
}
```

## Injeção de dependências (DI)

Para definir qual repositório o `CreateMissionUseCase` irá usar, foi realizada a injeção de dependência de forma manual (sem Inversify), em `infra/di/container.ts`:

```typescript
const postgresMissionRepository = new PostgresMissionRepository();
const postgresSupplyRepository = new PostigresSupplyRepository();
const postgressAstronautRepository = new PostgresAstronautRepository();

export const createMissionUseCase = new CreateMissionUseCase(
  postgresMissionRepository,
  postgressAstronautRepository,
  postgresSupplyRepository
);
```

## Agregado (Aggregate)

O `CreateMissionUseCase` chama o método `Mission.create`, definido pelo agregado `Mission`, localizado em `domain/aggregates/Mission.ts`:

```typescript
import { AggregateRoot } from "../value-objects/AggregateRoot.js";
import { Identifier } from "../value-objects/Identifier.js";
import { Astronaut } from "../entities/Astronaut.js";
import { Supply } from "../entities/Supply.js";
import { InactiveAstronautError, TooBigDataError } from "../errors/errors.js";

// Propriedades da missão
type MissionProps = {
  astronautsId: Identifier[];
  suppliesId: Identifier[];
};

export class Mission extends AggregateRoot<MissionProps> {
  constructor(public props: MissionProps, id?: string) {
    super(props, id);
  }

  // Método para criar missão
  static create(astronauts: Astronaut[], supplies: Supply[]) {
    // Verificando se tamanho é adequado
    if (astronauts.length > 10) {
      throw new TooBigDataError(astronauts.length, "astronautas");
    }
    if (supplies.length > 10) {
      throw new TooBigDataError(supplies.length, "suprimentos");
    }

    // Verificando se algum astronauta é inativo
    astronauts.forEach((astronaut) => {
      if (astronaut.props.status === "inactive") {
        throw new InactiveAstronautError(astronaut.props.name);
      }
    });

    // Construindo propriedades
    const missionProps: MissionProps = {
      astronautsId: astronauts.map((astronaut) => astronaut.id),
      suppliesId: supplies.map((supply) => supply.id),
    };

    // Criando nova missão, depois da validação
    return new Mission(missionProps);
  }
}
```

## Depois do domínio

Após a criação da missão pelo domínio, o caso de uso chama o repositório de missão para persistir uma nova missão no banco:

```typescript
const mission = Mission.create(astronauts as Astronaut[], supplies as Supply[]);
const createdMission = await this.missionRepository.create(mission);

return createdMission;
```

O caso de uso retorna a missão criada; com isso, as rotas devolvem a missão criada ao usuário:

```typescript
app.post("/missions", async (request, reply) => {
  const data = createMissionBody.parse(request.body);
  const mission = await createMissionUseCase.execute(data);

  return reply.status(201).send(mission);
});
```

Fim do fluxo.
