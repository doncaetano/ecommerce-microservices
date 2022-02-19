import { ICartDTO, ICartRepo } from '../../dtos';

export interface IGetSessionOpenCartInput {
  sessionId: string;
}

export const service = async (
  cartRepo: ICartRepo,
  { sessionId }: IGetSessionOpenCartInput
): Promise<ICartDTO | undefined> => {
  const openCart = await cartRepo.getCart({ sessionId, isOpen: true });
  if (openCart) return openCart;

  return cartRepo.createCart({ sessionId });
};

export default service;
