# Como rodar o arquivo TypeScript (usando tsx)

Arquivo da aula:
- `01-conceitos.ts`

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