import { cleanEnv, str, num } from 'envalid';

export const {
  NODE_ENV,
  REST_API_PORT,
  GRPC_API_PORT,
  PG_USER,
  PG_HOST,
  PG_PASSWORD,
  PG_DATABASE,
  PG_PORT,
} = cleanEnv(process.env, {
  NODE_ENV: str({
    desc: 'Execution environment',
    choices: ['development', 'staging', 'production', 'test'],
  }),
  REST_API_PORT: num({ desc: 'Rest API port', devDefault: 5000 }),
  GRPC_API_PORT: num({ desc: 'GRPC API port', devDefault: 5001 }),
  PG_USER: str({ desc: 'Postgres user name' }),
  PG_HOST: str({ desc: 'Postgres host' }),
  PG_PASSWORD: str({ desc: 'Postgres password' }),
  PG_DATABASE: str({ desc: 'Postgres database name' }),
  PG_PORT: num({ desc: 'Postgres port' }),
});
