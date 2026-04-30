CREATE TABLE astronauts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL,
  nationality VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  deleted_at TIMESTAMPTZ DEFAULT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


INSERT INTO astronauts (name, role, nationality, status) VALUES
  ('Vicente Collin', 'Commander', 'Brazilian', 'active'),
  ('Elena Markov', 'Pilot', 'Russian', 'active'),
  ('Noah Patel', 'Engineer', 'Indian', 'active'),
  ('Liam O''Connor', 'Scientist', 'Irish', 'active'),
  ('Aiko Tanaka', 'Biologist', 'Japanese', 'active'),
  ('Miguel Herrera', 'Medic', 'Mexican', 'active'),
  ('Sara Ndlovu', 'Geologist', 'South African', 'active'),
  ('Lucas Meyer', 'Technician', 'German', 'active'),
  ('Hana Kim', 'Communications', 'South Korean', 'active');
