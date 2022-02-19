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
    const getCartSchema = object({
      id: string().uuid().required(),
      sessionId: string().optional(),
      open: bool().optional(),
    });

    const {
      id,
      sessionId,
      open: isOpen,
    } = await getCartSchema.validate({
      ...request.params,
      sessionId: request.query.sessionId,
      open: request.query.open,
    });

    const cartRepo = new PostgresCartRepo();
    const result = await service(cartRepo, { id, sessionId, isOpen });

    response.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export default handler;
