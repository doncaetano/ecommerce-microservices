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
    const createProductPromotionSchema = object({
      productId: string().uuid().required(),
      name: string().required(),
      fixedDiscount: number().optional(),
      percentageDiscount: number().optional(),
      validFrom: string().required(),
      validTo: string().required(),
    });

    const {
      productId,
      name,
      fixedDiscount,
      percentageDiscount,
      validFrom,
      validTo,
    } = await createProductPromotionSchema.validate({
      ...request.body,
      productId: request.params.id,
    });

    const productRepo = new PostgresProductRepo();
    const result = await execute(productRepo, {
      productId,
      name,
      fixedDiscount,
      percentageDiscount,
      validFrom,
      validTo,
    });

    response.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

export default handler;
