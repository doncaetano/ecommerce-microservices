import { Response, Request, NextFunction } from 'express';
import { object, string, number } from 'yup';

import PostgresProductRepo from '../../repos/PostgresProductRepo';
import execute from './service';

const handler = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updateProductSchema = object({
      id: string().uuid().required(),
      name: string().optional(),
      price: number().optional(),
    });

    const { id, name, price } = await updateProductSchema.validate({
      ...request.params,
      name: request.body.name,
      price: request.body.price,
    });

    if (!name && !price) {
      response.status(200).json(undefined);
      return;
    }

    const productRepo = new PostgresProductRepo();
    const result = await execute(productRepo, { id, name, price });

    response.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export default handler;
