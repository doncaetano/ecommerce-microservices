import { Pool } from 'pg';
import { getPostgresPool, transaction } from '../../infra/repo/pg';
import {
  IAddCartProductDTO,
  ICartDTO,
  ICartProductDTO,
  ICartRepo,
  ICreateCartDTO,
  IDeleteCartProductDTO,
  IGetCartDTO,
  IGetCartProductDTO,
  IListCartProductsDTO,
  IUpdateCartDTO,
  IUpdateCartProductDTO,
} from '../dtos';

class PostgresCartRepo implements ICartRepo {
  private pool: Pool;

  constructor() {
    this.pool = getPostgresPool();
  }

  async createCart({ sessionId }: ICreateCartDTO): Promise<ICartDTO> {
    const client = await this.pool.connect();
    const result = await transaction<ICartDTO>(
      client,
      `INSERT INTO cart (session_id)
        VALUES ($1)
        RETURNING id,
          session_id AS "sessionId",
          created_at AS "createdAt",
          updated_at AS "updatedAt",
          closed_at AS "closedAt"
      `,
      [sessionId]
    );

    return result.rows[0];
  }

  async getCart({
    id,
    isOpen,
    sessionId,
  }: IGetCartDTO): Promise<ICartDTO | undefined> {
    const filters = [
      {
        query: id ? 'id = $index' : '',
        value: id,
      },
      {
        query: sessionId ? 'session_id = $index' : '',
        value: sessionId,
      },
      {
        query: isOpen ? 'closed_at IS NULL' : '',
        value: undefined,
      },
    ];

    let param = 0;
    const result = await this.pool.query<ICartDTO>(
      `
      SELECT id,
        session_id AS "sessionId",
        created_at AS "createdAt",
        updated_at AS "updatedAt",
        closed_at AS "closedAt"
      FROM cart
      WHERE
        ${filters
          .map(({ query, value }) => {
            if (value === undefined) return query;
            param += 1;
            return query.replace('$index', `$${param}`);
          })
          .filter((query) => query !== '')
          .join(' AND ')}
      ORDER BY closed_at DESC
      LIMIT 1;
    `,
      filters.map(({ value }) => value).filter((value) => value !== undefined)
    );
    return result.rows[0];
  }

  async listCarts(): Promise<ICartDTO[]> {
    const result = await this.pool.query<ICartDTO>(
      `
      SELECT id,
        session_id AS "sessionId",
        created_at AS "createdAt",
        updated_at AS "updatedAt",
        closed_at AS "closedAt"
      FROM cart
    `,
      []
    );
    return result.rows;
  }

  async getCartProduct({
    cartId,
    productId,
  }: IGetCartProductDTO): Promise<ICartProductDTO | undefined> {
    const result = await this.pool.query<ICartProductDTO>(
      `
      SELECT id,
        cart_id AS "cartId",
        product_id AS "productId",
        quantity,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM cart_product
      WHERE cart_id = $1
        AND product_id = $2
      `,
      [cartId, productId]
    );

    return result.rows[0];
  }

  async updateCart({ id, closedAt }: IUpdateCartDTO): Promise<ICartDTO> {
    const client = await this.pool.connect();
    const result = await transaction<ICartDTO>(
      client,
      `
        UPDATE cart
        SET closed_at = $2
        WHERE id = $1
        RETURNING id,
          session_id AS "sessionId",
          created_at AS "createdAt",
          updated_at AS "updatedAt",
          closed_at AS "closedAt"
      `,
      [id, closedAt]
    );

    return result.rows[0];
  }

  async addCartProduct({
    cartId,
    productId,
    quantity,
  }: IAddCartProductDTO): Promise<ICartProductDTO> {
    const client = await this.pool.connect();
    const result = await transaction<ICartProductDTO>(
      client,
      `INSERT INTO cart_product (cart_id, product_id, quantity)
        VALUES ($1, $2, $3)
        RETURNING id,
          cart_id AS "cartId",
          product_id AS "productId",
          quantity,
          created_at AS "createdAt",
          updated_at AS "updatedAt"
      `,
      [cartId, productId, quantity]
    );

    return result.rows[0];
  }

  async updateCartProduct({
    cartId,
    productId,
    quantity,
  }: IUpdateCartProductDTO): Promise<ICartProductDTO> {
    const client = await this.pool.connect();
    const result = await transaction<ICartProductDTO>(
      client,
      `
      UPDATE cart_product
      SET quantity = $3
      WHERE cart_id = $1
        AND product_id = $2
      RETURNING id,
        cart_id AS "cartId",
        product_id AS "productId",
        quantity,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      `,
      [cartId, productId, quantity]
    );

    return result.rows[0];
  }

  async listCartProducts({
    cartId,
  }: IListCartProductsDTO): Promise<ICartProductDTO[]> {
    const result = await this.pool.query<ICartProductDTO>(
      `
      SELECT id,
        cart_id AS "cartId",
        product_id AS "productId",
        quantity,
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM cart_product
      WHERE cart_id = $1
      `,
      [cartId]
    );

    return result.rows;
  }

  async deleteCartProduct({
    cartId,
    productId,
  }: IDeleteCartProductDTO): Promise<void> {
    const client = await this.pool.connect();
    await transaction<ICartProductDTO>(
      client,
      `
      DELETE FROM cart_product
      WHERE cart_id = $1
        AND product_id = $2
      `,
      [cartId, productId]
    );
  }
}

export default PostgresCartRepo;
