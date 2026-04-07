# 🚀 V4 Mars Astronauts Training (Backend)


## 🎯 Visao Geral
Esta pagina apresenta a trilha de **onboarding backend** do programa **V4 Mars: Astronauts Training**.

Objetivo central: acelerar a evolucao de novos trainees para um nivel de entrega consistente, com foco em:
- velocidade de desenvolvimento;
- qualidade de codigo;
- alinhamento com os padroes arquiteturais da V4.

No backend, a base tecnica e sustentada por:
- **DDD (Domain-Driven Design)**;
- **Clean Architecture**;
- **EDA (Event-Driven Architecture)**.

## ⚠️ Por que treinamento estruturado?
Sem uma trilha formal, os riscos aumentam rapidamente:
- **Produtividade mais lenta** no periodo inicial;
- **Divida tecnica** por implementacoes fora do padrao;
- **Fragilidade em fluxos assincronos**, especialmente em idempotencia, consistencia e transacoes distribuidas.

## 🧱 Pilares da Stack Backend
### 🧠 Domain-Driven Design (DDD)
- Linguagem ubiqua e foco total no dominio.
- Delimitacao clara de bounded contexts.
- Modelagem de entidades, agregados e regras de negocio.

### 🏛️ Clean Architecture
- Separacao de responsabilidades por camadas.
- Dependencias apontando para o core da aplicacao.
- Casos de uso explicitos, codigo testavel e desacoplado de framework.

### 📡 Event-Driven Architecture (EDA)
- Integracao entre servicos via eventos de dominio.
- Maior resiliencia e desacoplamento entre componentes.
- Base de escalabilidade para microsservicos da V4.

## 🗺️ Estrutura da Trilha Backend (4 modulos)
### Modulo 1 - JavaScript (ES6+), TypeScript e Node.js
- Revisao de linguagem, tipagem estatica e runtime.
- Fundamentos tecnicos da stack backend da V4.
- Entregavel: dominio pratico da base JS/TS/Node.

### Modulo 2 - Rotas e HTTP Requests (APIs RESTful)
- Criacao de endpoints e boas praticas REST.
- Integracao com dados e documentacao da API.
- Entregavel: API funcional + conclusao do desafio tecnico.

### Modulo 3 - DDD e Clean Architecture
- Aplicacao de entidades, agregados, use cases e portas.
- Inversao de dependencia e separacao de camadas.
- Entregavel: desafio refatorado para arquitetura limpa orientada ao dominio.

### Modulo 4 - Mars API, NestJS e Event Catalog
- Imersao no NestJS (framework adotado na V4).
- Publicacao e consumo de eventos com EDA.
- Entregavel: servico completo com DDD + Clean + EDA.

## 👥 Lideranca e Execucao
- **Backend**: Luigi Menezes
- **Frontend**: Felipe Augusto Reducino (trilha separada)
- **People & Performance**: Daniela Grippo Oliveira (trilha separada)
- Projetos praticos: desafio do processo seletivo + novo sistema com potencial de impacto real
- Colaboracao com Marlon Ferreira no uso de Event Catalog

## 🗓️ Cronograma Proposto
- Aulas de backend: **tercas e quintas**, das **13:30 as 14:30**, presencial no V4 Camp
- Duracao estimada da trilha: **4 a 5 meses** (ajustada conforme evolucao da turma)
# Como rodar o arquivo TypeScript (usando tsx)

Arquivo da aula:
- `01-conceitos.ts`
- Desafio:
  - `challenge/desafio-nota-final.ts`

## 0) Instalar Node.js e tsx global no WSL (Ubuntu)
Se voce estiver no WSL e ainda nao tiver Node.js:

```bash
sudo apt update
sudo apt install -y nodejs npm
```

Depois, instale `tsx` e `typescript` de forma global:

```bash
sudo npm install -g tsx typescript
```

## 1) Verifique se Node.js esta instalado
No terminal, rode:

```bash
node -v
npm -v
tsx --version
tsc -v
```

Se aparecer a versao dos dois, pode seguir.

## 2) Entre na pasta da aula
```bash
cd /01-introducao/01-fundamentos
```

## 3) Rode o arquivo .ts com tsx
```bash
npx tsx 01-conceitos.ts
```

Pronto. O `tsx` executa TypeScript direto, sem precisar gerar `.js` manualmente.

## 4) Rode o challenge
```bash
npx tsx challenge/desafio-nota-final.ts
```

Abra o arquivo do desafio e complete os TODOs.
