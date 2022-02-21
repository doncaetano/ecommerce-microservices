import { Response, Request, NextFunction } from 'express';
import { object, string, number, date } from 'yup';

import PostgresProductRepo from '../../repos/PostgresProductRepo';
import execute from './service';

const handler = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const createProductPromotionSchema = object({
      id: string().uuid().required(),
      name: string().required(),
      fixedDiscount: number().optional(),
      percentageDiscount: number().optional(),
      validFrom: string().required(),
      validTo: string().required(),
    });

    const { id, name, fixedDiscount, percentageDiscount, validFrom, validTo } =
      await createProductPromotionSchema.validate({
        ...request.params,
        name: request.body.name,
        fixedDiscount: request.body.fixedDiscount,
        percentageDiscount: request.body.percentageDiscount,
        validFrom: request.body.validFrom,
        validTo: request.body.validTo,
      });

    await object({
      validFrom: date(),
      validTo: date(),
    }).validate({
      validFrom,
      validTo,
    });

    const productRepo = new PostgresProductRepo();
    const result = await execute(productRepo, {
      productId: id,
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
