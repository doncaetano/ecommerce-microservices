import { Response, Request, NextFunction } from 'express';

import PostgresCartRepo from '../../repos/PostgresCartRepo';
import service from './service';

const handler = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const cartRepo = new PostgresCartRepo();
    const result = await service(cartRepo);

    response.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export default handler;
