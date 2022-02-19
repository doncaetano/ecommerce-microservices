import { Response, Request, NextFunction } from 'express';
import { object, string, bool } from 'yup';

import PostgresCartRepo from '../../repos/PostgresCartRepo';
import service from './service';

const handler = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updateCartSchema = object({
      id: string().uuid().required(),
      close: bool().optional(),
    });

    const { id, close } = await updateCartSchema.validate({
      ...request.params,
      close: request.body.close,
    });

    const cartRepo = new PostgresCartRepo();
    const result = await service(cartRepo, { id, close });

    response.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export default handler;
