# 04 - Refatoracao (Entregavel do Modulo)

> Em preparacao. Abaixo, o esqueleto do entregavel.

## Objetivo

- Pegar o desafio do Modulo 2 (`modules/02-apis/challenge`) e **refatorar** para Clean Architecture + DDD, sem mudar o contrato HTTP existente.

## Pre-requisitos

- `01-solid`, `02-ddd-fundamentos` e `03-clean-arch` concluidos.
- Desafio do Modulo 2 funcionando ponta-a-ponta.

## Criterios de pronto

- [ ] Camadas Domain / Application / Interface Adapters / Infrastructure separadas em pastas.
- [ ] Nenhuma regra de negocio em controller.
- [ ] Nenhum import de framework no dominio.
- [ ] Aggregates protegem invariantes; todas as mudancas de estado passam por metodos do dominio.
- [ ] Repositories sao interfaces no dominio; SQLite fica na infra.
- [ ] Use cases explicitos e nomeados por acao (ex.: `RegistrarAstronauta`, `DespacharMissao`).
- [ ] Pelo menos um Domain Event + Event Mapper.
- [ ] Testes de dominio rodam **sem banco** e **sem HTTP**.
- [ ] Troca do repositorio SQLite por um in-memory nao quebra nenhum teste de use case.

## Como validar

- Rodar a mesma suite de requests do Modulo 2 (curl/Postman) contra a API refatorada — respostas identicas.
- Executar `npm test` com cobertura minima de 80% nas camadas de dominio e aplicacao.
