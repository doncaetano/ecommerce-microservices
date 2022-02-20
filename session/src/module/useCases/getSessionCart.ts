import { Response, Request, NextFunction } from 'express';
import { object, string } from 'yup';
import Cart from '../../infra/api/cart';
import RequestError from '../../shared/RequestError';

import { ICartAPI, ISessionRepo } from '../dtos';
import PostgresSessionRepo from '../repos/PostgresSessionRepo';

interface IGetSessionCartInput {
  id: string;
}

interface IGetSessionCartResult {
  cartId: string;
}

export const execute = async (
  sessionRepo: ISessionRepo,
  cartApi: ICartAPI,
  { id }: IGetSessionCartInput
): Promise<IGetSessionCartResult | undefined> => {
  const session = await sessionRepo.getSession({ id });
  if (!session)
    throw new RequestError({
      code: 'session',
      message: 'Invalid session.',
      status: 400,
    });

  const cartId = await cartApi.getSessionOpenCart({ sessionId: session.id });

  if (cartId) return { cartId };
  return undefined;
};

const handler = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const getSessionCartSchema = object({
      id: string().uuid().required(),
    });

    const { id } = await getSessionCartSchema.validate(request.params);

    const sessionRepo = new PostgresSessionRepo();
    const cartApi = new Cart();
    const result = await execute(sessionRepo, cartApi, { id });

    response.status(201).json({
      id: result?.cartId,
    });
  } catch (err) {
    next(err);
  }
};

export default handler;
