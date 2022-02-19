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
    const createProductSchema = object({
      name: string().required(),
      price: number().optional(),
    });

    const { name, price } = await createProductSchema.validate(request.body);

    const productRepo = new PostgresProductRepo();
    const result = await execute(productRepo, { name, price });

    response.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export default handler;
