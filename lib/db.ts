import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('Defina DATABASE_URL no ambiente.');
}

export const pool = new Pool({ connectionString });
