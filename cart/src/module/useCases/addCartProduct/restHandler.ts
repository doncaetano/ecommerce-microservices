import { Response, Request, NextFunction } from 'express';
import { object, string, number } from 'yup';
import Product from '../../../infra/api/product';

import PostgresCartRepo from '../../repos/PostgresCartRepo';
import service from './service';

const handler = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const addCartProductSchema = object({
      id: string().uuid().required(),
      productId: string().uuid().required(),
      quantity: number().optional(),
    });

    const { id, productId, quantity } = await addCartProductSchema.validate({
      ...request.params,
      productId: request.body.productId,
      quantity: request.body.quantity,
    });

    const productApi = new Product();
    const cartRepo = new PostgresCartRepo();
    const result = await service(cartRepo, productApi, {
      cartId: id,
      productId,
      quantity,
    });

    response.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export default handler;
