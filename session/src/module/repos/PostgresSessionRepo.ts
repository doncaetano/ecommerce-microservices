import { Pool } from 'pg';
import { getPostgresPool, insert } from '../../infra/repo/pg';
import { IGetSessionDTO, ISessionDTO, ISessionRepo } from '../dtos';

class PostgresSessionRepo implements ISessionRepo {
  private pool: Pool;

  constructor() {
    this.pool = getPostgresPool();
  }

  async createSession(): Promise<ISessionDTO | undefined> {
    const client = await this.pool.connect();
    const result = await insert<ISessionDTO>(
      client,
      'INSERT INTO session DEFAULT VALUES RETURNING id, created_at AS "createdAt";',
      []
    );
    return result.rows[0];
  }

  async getSession({ id }: IGetSessionDTO): Promise<ISessionDTO | undefined> {
    const result = await this.pool.query<ISessionDTO>(
      `
      SELECT id, created_at AS "createdAt"
      FROM session
      WHERE id = $1
      LIMIT 1;
    `,
      [id]
    );
    return result.rows[0];
  }
}

export default PostgresSessionRepo;
