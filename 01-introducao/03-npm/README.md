# 03 - npm (scripts)

## Objetivo
- Entender o papel do `npm` no dia a dia de projetos Node.js.
- Criar e configurar `package.json` manualmente.
- Praticar `npm scripts` com TypeScript usando `tsx`.
- Passar argumentos para scripts com `--`.

## Importante
Nesta aula, **o `package.json` nao vem pronto**.
Cada trainee deve criar e configurar o proprio arquivo.

## Estrutura da aula
- Pasta base: `modules/01-introducao/03-npm/01-npm-scripts`
- Exemplos: `src/`
- Desafios: `challenge/`

## Passo a passo (o que precisa ser feito)

### 1) Validar ambiente
```bash
node -v
npm -v
```

### 2) Entrar na pasta da aula
```bash
cd modules/01-introducao/03-npm/01-npm-scripts
```

### 3) Criar o package.json
```bash
npm init -y
```

### 4) Instalar dependencias
```bash
npm install chalk
npm install -D tsx typescript
```

### 5) Configurar scripts no package.json
Edite a secao `scripts` para ficar assim:

```json
{
  "scripts": {
    "exemplo:hello": "tsx src/01-hello-script.ts",
    "exemplo:args": "tsx src/02-args-script.ts",
    "hello": "tsx challenge/desafio-hello.ts",
    "calc": "tsx challenge/desafio-calc.ts"
  }
}
```

### 6) Rodar exemplos da aula
```bash
npm run exemplo:hello
npm run exemplo:args -- 10 20
```

### 7) Fazer o desafio
Arquivos do desafio (ja na pasta `challenge/`):
- `challenge/desafio-hello.ts`
- `challenge/desafio-calc.ts`

Requisitos:
1. `npm run hello` imprime mensagem com `chalk`.
2. `npm run calc -- 10 20` soma argumentos e imprime o resultado.

### 8) Validar resultado
```bash
npm run hello
npm run calc -- 10 20
```

Saida esperada do `calc`:
```bash
Resultado: 30
```

## Conceitos-chave
- `package.json`: manifesto do projeto e scripts.
- `npm run <script>`: forma padronizada de executar comandos.
- `--`: encaminha argumentos para o script.
- `dependencies`: libs de runtime (ex.: `chalk`).
- `devDependencies`: ferramentas de desenvolvimento (ex.: `tsx`, `typescript`).
