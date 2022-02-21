import { Response, Request, NextFunction } from 'express';

import PostgresProductRepo from '../../repos/PostgresProductRepo';
import execute from './service';

const handler = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const productRepo = new PostgresProductRepo();
    const result = await execute(productRepo);

    response.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export default handler;
