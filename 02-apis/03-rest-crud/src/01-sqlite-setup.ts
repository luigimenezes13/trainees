/**
 * Aula 02-APIs / 03 - Setup do SQLite
 *
 * Objetivo: criar o banco, a tabela e inserir dados iniciais (seed).
 * Este script e executado uma vez para preparar o ambiente.
 *
 * Como usar:
 *   npx tsx src/01-sqlite-setup.ts
 *
 * Resultado: arquivo `mars.db` criado na pasta atual.
 * Voce pode inspecionar o banco com extensoes de SQLite no VSCode
 * ou com o comando: sqlite3 mars.db ".tables"
 */

import Database from "better-sqlite3";

const database = new Database("mars.db");

// ---------------------------------------------------------------
// Habilita WAL mode para melhor performance em leituras concorrentes
// ---------------------------------------------------------------
database.pragma("journal_mode = WAL");

// ---------------------------------------------------------------
// Cria a tabela de astronautas (IF NOT EXISTS evita erro se ja existir)
// ---------------------------------------------------------------
database.exec(`
  CREATE TABLE IF NOT EXISTS astronautas (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    nome        TEXT    NOT NULL,
    funcao      TEXT    NOT NULL,
    nacionalidade TEXT  NOT NULL,
    status      TEXT    NOT NULL DEFAULT 'active',
    deleted_at  TEXT    DEFAULT NULL,
    created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
    updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
  )
`);

console.log("Tabela 'astronautas' criada.\n");

// ---------------------------------------------------------------
// Seed: insere dados iniciais apenas se a tabela estiver vazia
// ---------------------------------------------------------------
const contagem = database.prepare("SELECT COUNT(*) AS total FROM astronautas").get() as { total: number };

if (contagem.total === 0) {
  const inserir = database.prepare(`
    INSERT INTO astronautas (nome, funcao, nacionalidade, status) VALUES (?, ?, ?, ?)
  `);

  const seed = [
    ["Valentina Cruz", "Commander", "Brazilian", "active"],
    ["Elena Markov", "Pilot", "Russian", "active"],
    ["Noah Patel", "Engineer", "Indian", "active"],
    ["Liam O'Connor", "Scientist", "Irish", "active"],
    ["Aiko Tanaka", "Biologist", "Japanese", "active"],
  ];

  const inserirTodos = database.transaction(() => {
    for (const astronauta of seed) {
      inserir.run(...astronauta);
    }
  });

  inserirTodos();
  console.log(`${seed.length} astronautas inseridos como seed.`);
} else {
  console.log(`Tabela ja contem ${contagem.total} registros. Seed ignorado.`);
}

// ---------------------------------------------------------------
// Verifica o resultado
// ---------------------------------------------------------------
const todos = database.prepare("SELECT id, nome, funcao, nacionalidade, status FROM astronautas").all();
console.log("\nAstronautas no banco:");
console.table(todos);

database.close();
