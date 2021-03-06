import { Response, Request, NextFunction } from 'express';
import { object, string, number } from 'yup';

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
      quantity: number().required(),
    });

    const { id, productId, quantity } = await addCartProductSchema.validate({
      ...request.params,
      quantity: request.body.quantity,
    });

    const cartRepo = new PostgresCartRepo();
    const result = await service(cartRepo, { cartId: id, productId, quantity });

    response.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export default handler;
