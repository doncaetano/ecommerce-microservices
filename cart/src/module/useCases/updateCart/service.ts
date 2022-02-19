import RequestError from '../../../shared/RequestError';
import { ICartDTO, ICartRepo } from '../../dtos';

export interface IGetCartInput {
  id: string;
  close?: boolean;
}

export const service = async (
  cartRepo: ICartRepo,
  { id, close }: IGetCartInput
): Promise<ICartDTO | undefined> => {
  const hasCart = cartRepo.getCart({ id });
  if (!hasCart)
    throw new RequestError({
      code: 'id',
      message: 'Invalid cart id',
      status: 400,
    });

  if (close)
    return cartRepo.updateCart({ id, closedAt: new Date().toISOString() });
  return undefined;
};

export default service;
