
CREATE TABLE astronauts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  role VARCHAR(100) NOT NULL,
  nationality VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'active',
  deleted_at TIMESTAMP DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE supplies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item VARCHAR(50),
  category VARCHAR(50),
  stock INT,
  quantity FLOAT
);


CREATE TABLE missions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);


CREATE TABLE mission_astronauts (
  mission_id UUID NOT NULL,
  astronaut_id UUID NOT NULL,
  PRIMARY KEY (mission_id, astronaut_id),
  CONSTRAINT fk_mission FOREIGN KEY (mission_id) REFERENCES missions(id) ON DELETE CASCADE,
  CONSTRAINT fk_astronaut FOREIGN KEY (astronaut_id) REFERENCES astronauts(id) ON DELETE CASCADE
);


CREATE TABLE mission_supplies (
  mission_id UUID NOT NULL,
  supply_id UUID NOT NULL,
  PRIMARY KEY (mission_id, supply_id),
  CONSTRAINT fk_mission FOREIGN KEY (mission_id) REFERENCES missions(id) ON DELETE CASCADE,
  CONSTRAINT fk_supply FOREIGN KEY (supply_id) REFERENCES supplies(id) ON DELETE CASCADE
);


INSERT INTO astronauts (id, name, role, nationality, status) VALUES
  (gen_random_uuid(), 'Valentina Cruz', 'Commander', 'Brazilian', 'active'),
  (gen_random_uuid(), 'Elena Markov', 'Pilot', 'Russian', 'active'),
  (gen_random_uuid(), 'Noah Patel', 'Engineer', 'Indian', 'active'),
  (gen_random_uuid(), 'Liam O''Connor', 'Scientist', 'Irish', 'active'),
  (gen_random_uuid(), 'Aiko Tanaka', 'Biologist', 'Japanese', 'active');