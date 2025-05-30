// test-db.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: 'aws-0-us-east-1.pooler.supabase.com',
  user: 'postgres.juanma_user',
  password: 'ProjectsJuanma412',
  database: 'postgres',
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error de conexión:', err);
  } else {
    console.log('Conexión exitosa:', res.rows);
  }
  pool.end();
});
