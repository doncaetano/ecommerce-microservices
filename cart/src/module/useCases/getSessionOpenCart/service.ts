import { ICartDTO, ICartRepo } from '../../dtos';

export interface IGetSessionOpenCartInput {
  sessionId: string;
}

export const service = async (
  cartRepo: Pick<ICartRepo, 'getCart' | 'createCart'>,
  { sessionId }: IGetSessionOpenCartInput
): Promise<ICartDTO> => {
  const openCart = await cartRepo.getCart({ sessionId, isOpen: true });
  if (openCart) return openCart;

  return cartRepo.createCart({ sessionId });
};

export default service;
