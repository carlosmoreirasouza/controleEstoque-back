CREATE TABLE IF NOT EXISTS desejos (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  telefone VARCHAR(30) NOT NULL,
  item_desejado VARCHAR(120) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS estoque (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  caracteristicas_gerais TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_desejos_item_desejado ON desejos (LOWER(item_desejado));
