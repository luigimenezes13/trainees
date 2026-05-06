# 03 - Clean Architecture

> Em preparacao. Abaixo, o esqueleto do que sera coberto.

## Objetivo

- Separar o codigo em camadas com dependencias apontando sempre para dentro:
  **Infrastructure → Interface Adapters → Application → Domain**.
- Escrever Use Cases explicitos que orquestram o dominio sem conter regra de negocio.
- Isolar o framework (HTTP, ORM) da logica de negocio atraves de ports e adapters.

## Topicos previstos

1. As quatro camadas e a regra de dependencia.
2. Use Cases: entrada, orquestracao, saida.
3. Controllers burros: validar → chamar use case → responder.
4. Ports (interfaces) no dominio/aplicacao; adapters na infraestrutura.
5. Inversao de dependencia na pratica (injecao por construtor).
6. Testes por camada: dominio sem mocks; use cases com fakes; adapters com integracao.

## Pre-requisitos

- `01-solid` e `02-ddd-fundamentos` concluidos.

## Entregavel

- Um use case completo ponta-a-ponta, com:
  - Controller burro (HTTP);
  - Use Case aplicativo;
  - Aggregate com invariantes;
  - Repository como interface no dominio e implementacao em memoria/SQLite na infra;
  - Troca de adapter (in-memory ↔ SQLite) sem alterar uma linha do dominio.
