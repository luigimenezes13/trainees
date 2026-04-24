# 02 - DDD Fundamentos

> Em preparacao. Abaixo, o esqueleto do que sera coberto.

## Objetivo

- Modelar um pequeno dominio do zero aplicando linguagem ubiqua.
- Identificar Entidades, Value Objects e Aggregates corretos para o problema.

## Topicos previstos

1. Linguagem ubiqua e bounded contexts.
2. Entidade vs Value Object — quando cada um se aplica.
3. Aggregates: fronteira de consistencia e invariantes.
4. Repositories como interfaces — assinatura guiada pelo dominio.
5. Domain Events e Event Mappers.
6. Domain Services (so quando a regra nao cabe na entidade).

## Pre-requisitos

- `01-solid` concluido (todas as letras, com `notas.md` preenchido).

## Entregavel

- Um mini-dominio modelado em TypeScript, sem framework e sem banco, com:
  - pelo menos 1 Aggregate Root com invariantes testadas;
  - pelo menos 2 Value Objects imutaveis e auto-validados;
  - pelo menos 1 Domain Event + Event Mapper;
  - testes unitarios cobrindo as invariantes.
