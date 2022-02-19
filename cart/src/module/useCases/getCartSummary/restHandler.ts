import { Response, Request, NextFunction } from 'express';
import { object, string } from 'yup';
import Product from '../../../infra/api/product';

import PostgresCartRepo from '../../repos/PostgresCartRepo';
import service from './service';

const handler = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const getCartSchema = object({
      id: string().uuid().required(),
    });

    const { id } = await getCartSchema.validate({
      ...request.params,
    });

    const cartRepo = new PostgresCartRepo();
    const productApi = new Product();
    const result = await service(cartRepo, productApi, { id });

    response.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export default handler;
