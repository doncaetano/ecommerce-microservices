import { ICartDTO, ICartRepo } from '../../dtos';

export const service = async (cartRepo: ICartRepo): Promise<ICartDTO[]> => {
  return cartRepo.listCarts();
};

export default service;
