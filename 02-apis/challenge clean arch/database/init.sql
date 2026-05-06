CREATE TABLE astronauts (
  id VARCHAR(255) NOT NULL PRIMARY KEY,
  name VARCHAR(255),
  role VARCHAR(100),
  nationality VARCHAR(100),
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  deleted_at TIMESTAMPTZ DEFAULT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO astronauts (id, name, role, nationality) VALUES
  ('10000000-0000-4000-8000-000000000001', 'Vicente Collin', 'Commander', 'Brazilian'),
  ('10000000-0000-4000-8000-000000000002', 'Elena Markov', 'Pilot', 'Russian'),
  ('10000000-0000-4000-8000-000000000003', 'Noah Patel', 'Engineer', 'Indian'),
  ('10000000-0000-4000-8000-000000000004', 'Liam O''Connor', 'Scientist', 'Irish'),
  ('10000000-0000-4000-8000-000000000005', 'Aiko Tanaka', 'Biologist', 'Japanese');
