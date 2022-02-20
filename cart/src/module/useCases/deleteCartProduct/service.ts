import { ICartRepo } from '../../dtos';

export interface IDeleteCartProductInput {
  cartId: string;
  productId: string;
}

export const service = async (
  cartRepo: Pick<ICartRepo, 'deleteCartProduct'>,
  { cartId, productId }: IDeleteCartProductInput
): Promise<void> => {
  return cartRepo.deleteCartProduct({ cartId, productId });
};

export default service;
