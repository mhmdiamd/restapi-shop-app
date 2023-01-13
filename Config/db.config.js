import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

export const dbRepo = new Pool({
  user: 'penpbpcl',
  host: 'floppy.db.elephantsql.com',
  port: 5432,
  password: 'rYASqKwGLnY4mlW3ptfTRbH_bGijsC8O',
  database: 'penpbpcl',
});
