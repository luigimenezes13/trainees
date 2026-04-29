CREATE TABLE astronauts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL,
  nationality VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  deleted_at TIMESTAMP DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO astronauts (name, role, nationality, status) VALUES
  ('Valentina Cruz', 'Commander', 'Brazilian', 'active'),
  ('Elena Markov', 'Pilot', 'Russian', 'active'),
  ('Noah Patel', 'Engineer', 'Indian', 'active'),
  ('Liam O''Connor', 'Scientist', 'Irish', 'active'),
  ('Aiko Tanaka', 'Biologist', 'Japanese', 'active'),
  ('Miguel Herrera', 'Medic', 'Mexican', 'active'),
  ('Sara Ndlovu', 'Geologist', 'South African', 'active'),
  ('Lucas Meyer', 'Technician', 'German', 'active'),
  ('Hana Kim', 'Communications', 'South Korean', 'active'),
  ('Omar Farouk', 'Navigator', 'Egyptian', 'active'),
  ('Camila Souza', 'Engineer', 'Brazilian', 'inactive'),
  ('Daniel Novak', 'Pilot', 'Czech', 'active'),
  ('Fatima Al-Sayed', 'Scientist', 'UAE', 'active'),
  ('Thomas Reed', 'Commander', 'American', 'active'),
  ('Priya Singh', 'Medic', 'Indian', 'active'),
  ('Julien Moreau', 'Biologist', 'French', 'active'),
  ('Ines Duarte', 'Geologist', 'Portuguese', 'active'),
  ('Mateo Rojas', 'Technician', 'Chilean', 'active'),
  ('Zoe Walker', 'Navigator', 'Australian', 'active'),
  ('Anika Berg', 'Communications', 'Swedish', 'active');

CREATE TABLE supplies (
  id SERIAL PRIMARY KEY,
  item VARCHAR(255) NOT NULL,
  categoria VARCHAR(255) NOT NULL,
  estoque INTEGER NOT NULL
);

INSERT INTO supplies (item, categoria, estoque) VALUES
  ('Oxigenio medicinal', 'Medico', 120),
  ('Agua potavel', 'Alimentacao', 2400),
  ('Racao liofilizada', 'Alimentacao', 800),
  ('Kit medico basico', 'Medico', 45),
  ('Combustivel de reserva', 'Propulsao', 12),
  ('Pecas de reposicao para traje EVA', 'Equipamento', 60),
  ('Baterias de alta capacidade', 'Energia', 200),
  ('Ferramentas de manutencao', 'Equipamento', 35),
  ('Sementes hidroponicas', 'Agricultura', 150),
  ('Filtros de ar', 'Suporte a vida', 90);

CREATE TABLE missions (
  id SERIAL PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  astronauta_id INTEGER NOT NULL REFERENCES astronauts (id),
  supply_id INTEGER NOT NULL REFERENCES supplies (id)
);

INSERT INTO missions (titulo, astronauta_id, supply_id) VALUES
  ('Reposicao de O2 na Cupula', 1, 1),
  ('Rota de abastecimento orbital', 2, 5),
  ('Manutencao do modulo de servico', 3, 8),
  ('Experimento hidroponico M-04', 4, 9),
  ('Ciclo de vida suportado - 90 dias', 5, 3);