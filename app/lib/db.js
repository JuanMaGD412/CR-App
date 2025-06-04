import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL_NON_POOLING,
  ssl: false, // importante para el pooler de Supabase
});

export default pool;
