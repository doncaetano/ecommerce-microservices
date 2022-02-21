import { Response, Request, NextFunction } from 'express';
import { object, string } from 'yup';

import PostgresProductRepo from '../../repos/PostgresProductRepo';
import execute from './service';

const handler = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const listProductPromotionsSchema = object({
      id: string().uuid().required(),
    });

    const { id } = await listProductPromotionsSchema.validate(request.params);

    const productRepo = new PostgresProductRepo();
    const result = await execute(productRepo, { productId: id });

    response.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export default handler;
