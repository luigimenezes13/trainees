# 01 - SOLID

## Objetivo

- Praticar os cinco principios SOLID escrevendo codigo — nao so lendo.
- Um principio por dia, um exercicio por letra: **S**RP, **O**CP, **L**SP, **I**SP, **D**IP.
- Construir a base que vamos usar em DDD (`02-ddd-fundamentos`) e Clean Architecture (`03-clean-arch`).

## O que ja esta aqui

Tudo ja vive nesta pasta, nao precisa clonar nada:

- [`leituras/`](leituras/) — leitura rapida (< 5 min por principio) do repo [`5-minutes-or-less-solid`](https://github.com/mikaelvesavuori/5-minutes-or-less-solid). Um arquivo por letra em `leituras/src/`.
- [`kata/`](kata/) — **kata principal** do repo [`solid-kata-ts`](https://github.com/charliemc/solid-kata-ts). TypeScript + Jest. Uma pasta por letra (`srp/`, `ocp/`, `lsp/`, `isp/`, `dip/`).
- [`solucoes/`](solucoes/) — exercicios de referencia do repo [`solid-kata`](https://github.com/jahs-es/solid-kata) (Java). Para cada letra, voce tem duas pastas lado a lado:
  - `solucoes/<letra>/` — codigo inicial, **violando** o principio;
  - `solucoes/<letra>-solucao/` — versao ja refatorada, para comparacao.

## Fluxo diario (20 a 40 min)

Para cada letra do SOLID, siga a ordem:

1. **Leitura rapida (< 5 min)** — abrir `leituras/src/<principio>.ts` e ler os comentarios do arquivo.
2. **Kata principal** — resolver `kata/<letra>/`. Rodar `npm test -- <letra>` ate passar.
3. **Checagem** — comparar com a versao de referencia em `solucoes/<letra>-solucao/` (diff contra `solucoes/<letra>/`).

## Setup inicial (uma vez)

```bash
cd modules/03-clean-ddd/01-solid/kata
npm install
```

> Os exemplos de `leituras/` sao auto-contidos — voce pode le-los direto ou rodar com `npx ts-node leituras/src/<arquivo>.ts` apos `cd leituras && npm install`.

## Cronograma sugerido (5 dias)

| Dia | Letra | Leitura (< 5 min)                                      | Kata (resolver)         | Solucao de referencia             |
| --- | ----- | ------------------------------------------------------ | ----------------------- | --------------------------------- |
| 1   | S     | [leituras/src/single-responsibility-principle.ts](leituras/src/single-responsibility-principle.ts) | [kata/srp/](kata/srp/) | [solucoes/srp-solucao/](solucoes/srp-solucao/) |
| 2   | O     | [leituras/src/open-closed-principle.ts](leituras/src/open-closed-principle.ts)                     | [kata/ocp/](kata/ocp/) | [solucoes/ocp-solucao/](solucoes/ocp-solucao/) |
| 3   | L     | [leituras/src/liskov-substitution-principle.ts](leituras/src/liskov-substitution-principle.ts)     | [kata/lsp/](kata/lsp/) | [solucoes/lsp-solucao/](solucoes/lsp-solucao/) |
| 4   | I     | [leituras/src/interface-segregation-principle.ts](leituras/src/interface-segregation-principle.ts) | [kata/isp/](kata/isp/) | [solucoes/isp-solucao/](solucoes/isp-solucao/) |
| 5   | D     | [leituras/src/dependency-inversion-principle.ts](leituras/src/dependency-inversion-principle.ts)   | [kata/dip/](kata/dip/) | [solucoes/dip-solucao/](solucoes/dip-solucao/) |

## Como rodar o kata

```bash
cd modules/03-clean-ddd/01-solid/kata

# roda todos os testes
npm test

# roda so os testes da letra do dia
npm test -- srp
npm test -- ocp
# ...
```

O objetivo e **refatorar** o codigo de cada pasta (`kata/srp/`, `kata/ocp/`, ...) de forma que ele **deixe de violar o principio correspondente**, sem quebrar os testes.

## Como comparar com a solucao de referencia

A versao de referencia esta em Java (nao precisa rodar — basta ler).

```bash
cd modules/03-clean-ddd/01-solid

# ver a diferenca entre o codigo inicial e a solucao da letra do dia
diff -ru solucoes/srp solucoes/srp-solucao
diff -ru solucoes/ocp solucoes/ocp-solucao
# ...
```

## Criterios de pronto (por letra)

- [ ] Leu o arquivo correspondente em `leituras/src/` (< 5 min).
- [ ] Refatorou o codigo em `kata/<letra>/` sem quebrar `npm test`.
- [ ] Consegue explicar, em uma frase, **o que mudou e por que violava o principio**.
- [ ] Comparou com a solucao de referencia em `solucoes/<letra>-solucao/`.
- [ ] Anotou, em `notas.md`, pelo menos um insight por principio (use [notas.exemplo.md](notas.exemplo.md) como template).

## Relacao com o restante do modulo

- **SRP** e base para separar Domain / Application / Adapters no `03-clean-arch`.
- **OCP** e o motivo de usar Strategy/Factory no lugar de `switch` por tipo.
- **LSP** aparece em hierarquias de Value Objects e Policies no `02-ddd-fundamentos`.
- **ISP** justifica repositories pequenos no lugar de "Repository Deus".
- **DIP** e o coracao da Clean Architecture: use cases dependem de **ports**, nao de implementacoes.

## Creditos

Materiais de terceiros incluidos nesta pasta, mantendo suas respectivas licencas:

- `kata/` — [charliemc/solid-kata-ts](https://github.com/charliemc/solid-kata-ts)
- `leituras/` — [mikaelvesavuori/5-minutes-or-less-solid](https://github.com/mikaelvesavuori/5-minutes-or-less-solid)
- `solucoes/` — [jahs-es/solid-kata](https://github.com/jahs-es/solid-kata) (pastas `<letra>-solucao/` extraidas das branches `<letra>-solution`)
