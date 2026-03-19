# 2K26 - Modulo 1

## Slide 1 - Capa

- JavaScript (ES6+) e TypeScript.
- V4 Trainees Mars - Modulo 1.

---

## Slide 2 - Introducao ao contexto V4

- TypeScript no contexto de TECH: velocidade x qualidade.
- Linguagem popular, facil onboarding e facil adaptacao entre camadas.
- Facilita a criacao e manutencao de microsservicos.
- `Compute-intensive`: gargalo em CPU (simulacao, criptografia, ML, 3D).
- `Data-intensive`: gargalo em volume, movimento e consistencia de dados.

---

## Slide 3 - A estrutura de uma aplicacao web

- Visao geral dos blocos principais da aplicacao.
- Cliente (browser), backend (API) e camada de dados.

---

## Slide 4 - Aplicacao web

- Browser recebe interface e eventos.
- Backend processa regras de negocio.
- Banco e servicos sustentam persistencia e integracoes.

---

## Slide 5 - Browser view

- O navegador recebe HTML, CSS e JavaScript.
- HTML define estrutura; CSS define estilo; JS define comportamento.
- Resultado: pagina interativa para o usuario.

---

## Slide 6 - O que nos vamos fazer?

- Entender como o browser navega e executa JavaScript.
- Conectar esse fluxo com TypeScript e Node.js no dia a dia.

---

## Slide 7 - Browser navigation (fluxo de requisicao e resposta)

- Usuario aciona uma URL e o browser resolve DNS para obter IP de destino.
- Browser abre conexao TCP (`SYN -> SYN-ACK -> ACK`).
- Em HTTPS, ocorre `TLS handshake` (certificado + troca de chaves).
- Requisicao HTTP trafega em segmentos TCP com ACK, sequenciamento e retransmissao.
- Servidor responde; browser remonta dados e atualiza DOM/CSSOM/JS.

---

## Slide 8 - Browser JS (engine e pipeline)

- JavaScript roda em uma engine (ex.: V8).
- Execucao sincronizada em `call stack` e assincrona via filas/event loop.
- Pipeline: `JavaScript -> Parser -> AST -> Bytecode -> JIT -> Machine Code`.

---

## Slide 9 - Na pratica

- Relacao entre fluxo de rede, engine JS e comportamento da interface.
- Base para debugar performance, latencia e erros de execucao.

---

## Slide 10 - TypeScript (modelagem)

- JavaScript modela objetos, mas sem contrato de tipos nativo.
- TypeScript adiciona contrato com `type` e `interface`.
- Melhora representacao de entidades de dominio (ex.: `Aluno`).

---

## Slide 11 - Tipagem (generics)

- Generics criam funcoes reutilizaveis sem perder seguranca de tipo.
- Mesmo metodo atende varios tipos com consistencia.
- Exemplo: `primeiroItem<T>(itens: T[]): T | undefined`.

---

## Slide 12 - node

---

## Slide 13 - Node.js

- Runtime para executar JavaScript fora do navegador.
- Permite criar servidor, API, automacoes e scripts.
- Alto ganho de produtividade com stack JS/TS.
- Ecossistema forte com `npm`, build, teste e deploy.

---

## Slide 14 - Node.js na pratica (Buffer + Streams)

- `Buffer`: representa dados binarios (bytes) em memoria.
- `Readable stream`: dados chegam em partes (`chunks`).
- `Writable stream`: escrita incremental com baixo uso de memoria.
- `pipe()`: conecta leitura e escrita com fluxo eficiente.

---

