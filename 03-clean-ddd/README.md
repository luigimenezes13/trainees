# 2K26 - Modulo 3

## Slide 1 - Capa

- DDD e Clean Architecture.
- V4 Trainees Mars - Modulo 3.

---

## Slide 2 - O que vamos construir

- Base conceitual para escrever codigo orientado a dominio.
- Pratica de principios SOLID via katas (um exercicio por letra).
- Modelagem de entidades, value objects, aggregates e domain events.
- Refatoracao do desafio do Modulo 2 para uma arquitetura limpa, separada em camadas, com inversao de dependencia.

---

## Slide 3 - Por que SOLID antes de DDD

- DDD e Clean Architecture so funcionam se cada classe tiver uma unica razao para mudar.
- Aggregates, Use Cases e Repositories dependem de **interfaces pequenas** e **polimorfismo** no lugar de switch/if-else.
- Sem SOLID, o codigo DDD vira apenas "classes com nomes bonitos" e continua acoplado.

---

## Slide 4 - Domain-Driven Design (DDD)

- Linguagem ubiqua: o codigo fala a mesma lingua do negocio.
- Bounded contexts: modelos proprios, sem entidades compartilhadas.
- Entidades tem identidade. Value Objects sao imutaveis e auto-validados.
- Aggregates protegem invariantes; so o Root e acessado externamente.
- Domain Events sao disparados apenas pelo Aggregate Root.

---

## Slide 5 - Clean Architecture

- Dependencias apontam para dentro: Infra → Adapters → Application → Domain.
- Domain e 100% independente de framework, ORM e HTTP.
- Use Cases orquestram regras; Controllers sao burros.
- Ports (interfaces) no dominio; adapters (implementacoes) na infra.
- Trocar banco ou framework nao pode quebrar regra de negocio.

---

## Slide 6 - Event-Driven na borda

- Integracao entre modulos via Domain Events, nao chamadas diretas.
- Cada evento tem nome no passado e um Event Mapper dedicado.
- Preparacao para o Modulo 4 (NestJS + Event Catalog).

---

## Slide 7 - Estrutura da trilha

- `01-solid` — principios SOLID via kata (um exercicio por letra) + leitura curta.
- `02-ddd-fundamentos` — linguagem ubiqua, entidades, value objects, aggregates, domain events.
- `03-clean-arch` — camadas, use cases, ports e adapters, inversao de dependencia.
- `04-refatoracao` — entregavel: desafio do Modulo 2 refatorado para Clean Arch + DDD.

---

## Slide 8 - Entregavel do modulo

- API do Mars Mission Control reescrita com:
  - camadas Domain / Application / Interface Adapters / Infrastructure;
  - aggregates com invariantes protegidas;
  - use cases explicitos, sem regra de negocio em controller;
  - repositories como interfaces no dominio;
  - dominio testavel sem framework, sem banco.

---

## Slide 9 - Regras da casa (resumo)

- Zero regra de negocio em controller.
- Zero dependencia de framework no dominio.
- Zero DTO no dominio.
- Zero switch/if-else por tipo ou status — usar polimorfismo.
- Zero getter generico — metodos com intencao.
- Eventos disparados somente pelo Aggregate Root.

---
