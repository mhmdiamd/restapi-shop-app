import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

export const dbRepo = new Pool({
  user: process.env.PG_USER,
  host: 'localhost',
  port: process.env.PG_PORT,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_NAME,
});
