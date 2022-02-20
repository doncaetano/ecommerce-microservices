import { ICartDTO, ICartRepo } from '../../dtos';

export interface IGetCartInput {
  id: string;
  sessionId?: string;
  isOpen?: boolean;
}

export const service = async (
  cartRepo: Pick<ICartRepo, 'getCart'>,
  { id, sessionId, isOpen }: IGetCartInput
): Promise<ICartDTO | undefined> => {
  return cartRepo.getCart({ id, sessionId, isOpen });
};

export default service;
