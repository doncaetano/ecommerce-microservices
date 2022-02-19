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
    });

    const { id, productId } = await addCartProductSchema.validate({
      ...request.params,
    });

    const cartRepo = new PostgresCartRepo();
    await service(cartRepo, { cartId: id, productId });

    response.status(200).json(undefined);
  } catch (err) {
    next(err);
  }
};

export default handler;
