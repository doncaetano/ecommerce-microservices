import { Pool } from 'pg';
import { getPostgresPool, insert } from '../../infra/repo/pg';
import {
  ICreateProductDTO,
  ICreateProductPromotionDTO,
  IGetProductBatchDTO,
  IGetProductDTO,
  IListProductPromotionDTO,
  IProductBatchDTO,
  IProductDTO,
  IProductPromotionDTO,
  IProductRepo,
} from '../dtos';

class PostgresProductRepo implements IProductRepo {
  private pool: Pool;

  constructor() {
    this.pool = getPostgresPool();
  }

  async createProduct({
    name,
    price,
  }: ICreateProductDTO): Promise<IProductDTO> {
    const client = await this.pool.connect();
    const result = await insert<IProductDTO>(
      client,
      `INSERT INTO product (
          name
          ${price ? `, price` : ''}
        )
      VALUES ($1 ${price ? `, $2` : ''})
      RETURNING id,
        name,
        price,
        created_at AS "createdAt",
        updated_at AS "updatedAt",
        removed_at AS "removedAt";`,
      [name, price].filter((value) => value !== undefined)
    );
    return result.rows[0];
  }

  async listProducts(): Promise<IProductDTO[]> {
    const result = await this.pool.query<IProductDTO>(
      `SELECT id,
        name,
        price,
        created_at AS "createdAt",
        updated_at AS "updatedAt",
        removed_at AS "removedAt"
      FROM product;`,
      []
    );

    return result.rows;
  }

  async getProduct({ id }: IGetProductDTO): Promise<IProductDTO | undefined> {
    const result = await this.pool.query<IProductDTO>(
      `
      SELECT id,
        name,
        price,
        created_at AS "createdAt",
        updated_at AS "updatedAt",
        removed_at AS "removedAt"
      FROM product
      WHERE id = $1;
    `,
      [id]
    );
    return result.rows[0];
  }

  async createProductPromotion({
    productId,
    name,
    fixedDiscount = 0,
    percentageDiscount = 0,
    validFrom,
    validTo,
  }: ICreateProductPromotionDTO): Promise<IProductPromotionDTO> {
    const client = await this.pool.connect();
    const result = await insert<IProductPromotionDTO>(
      client,
      `INSERT INTO product_promotion (
          product_id,
          name,
          fixed_discount,
          percentage_discount,
          valid_from,
          valid_to
        )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id,
        name,
        fixed_discount AS "fixedDiscount",
        percentage_discount AS "percentageDiscount",
        valid_from AS "validFrom",
        valid_to AS "validTo",
        product_id AS "productId",
        created_at AS "createdAt",
        updated_at AS "updatedAt";`,
      [productId, name, fixedDiscount, percentageDiscount, validFrom, validTo]
    );

    return result.rows[0];
  }

  async listProductPromotions({
    productId,
  }: IListProductPromotionDTO): Promise<IProductPromotionDTO[]> {
    const result = await this.pool.query<IProductPromotionDTO>(
      `SELECT id,
        name,
        fixed_discount AS "fixedDiscount",
        percentage_discount AS "percentageDiscount",
        valid_from AS "validFrom",
        valid_to AS "validTo",
        product_id AS "productId",
        created_at AS "createdAt",
        updated_at AS "updatedAt"
      FROM product_promotion
      WHERE product_id = $1;`,
      [productId]
    );

    return result.rows;
  }

  async getProductBatch({
    idList,
  }: IGetProductBatchDTO): Promise<IProductBatchDTO[]> {
    const result = await this.pool.query<IProductBatchDTO>(
      `SELECT id,
        price,
        fixed_discount AS "fixedDiscount",
        percentage_discount AS "percentageDiscount"
      FROM (
        SELECT P.id,
          P.price,
          PP.fixed_discount,
          PP.percentage_discount,
          ROW_NUMBER() OVER(PARTITION BY P.id ORDER BY PP.created_at DESC) row_number
        FROM product AS P
          LEFT JOIN product_promotion AS PP ON P.id = PP.product_id
            AND PP.valid_from <= NOW()
            AND NOW() <= PP.valid_to
        WHERE P.removed_at IS NULL
          AND P.price IS NOT NULL
          AND P.id = ANY($1::uuid[])
      ) F
      WHERE row_number = 1;`,
      [idList]
    );

    return result.rows;
  }
}

export default PostgresProductRepo;
