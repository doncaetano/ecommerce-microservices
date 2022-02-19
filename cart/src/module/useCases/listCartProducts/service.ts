import { ICartProductDTO, ICartRepo } from '../../dtos';

export interface IGetCartInput {
  id: string;
}

export const service = async (
  cartRepo: ICartRepo,
  { id }: IGetCartInput
): Promise<ICartProductDTO[]> => {
  return cartRepo.listCartProducts({ cartId: id });
};

export default service;
