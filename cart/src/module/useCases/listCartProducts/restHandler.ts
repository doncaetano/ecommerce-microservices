import { Response, Request, NextFunction } from 'express';
import { object, string } from 'yup';

import PostgresCartRepo from '../../repos/PostgresCartRepo';
import service from './service';

const handler = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const listCartProductsSchema = object({
      id: string().uuid().required(),
    });

    const { id } = await listCartProductsSchema.validate({
      ...request.params,
    });

    const cartRepo = new PostgresCartRepo();
    const result = await service(cartRepo, { id });

    response.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export default handler;
