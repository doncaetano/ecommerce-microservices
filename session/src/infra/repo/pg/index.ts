import { Pool, PoolClient, QueryResult } from 'pg';
import {
  PG_HOST,
  PG_USER,
  PG_PORT,
  PG_PASSWORD,
  PG_DATABASE,
} from '../../../shared/environment';
import logger from '../../../shared/logger';

const createPostgresPool = () =>
  new Pool({
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USER,
    password: PG_PASSWORD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });

let pool: Pool;
export const getPostgresPool = () => {
  if (!pool) pool = createPostgresPool();

  pool.on('error', (err) => {
    logger.error(`postgres connection error : ${err}`);
  });

  return pool;
};

export const transaction = async <T>(
  client: PoolClient,
  query: string,
  values: any[]
): Promise<QueryResult<T>> => {
  let result;
  await client.query('BEGIN');

  try {
    try {
      result = await client.query(query, values);
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    }
  } finally {
    client.release();
  }

  return result;
};
