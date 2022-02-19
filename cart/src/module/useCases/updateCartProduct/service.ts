import { ICartProductDTO, ICartRepo } from '../../dtos';
import RequestError from '../../../shared/RequestError';

export interface IUpdateCartProductInput {
  cartId: string;
  productId: string;
  quantity: number;
}

export const service = async (
  cartRepo: ICartRepo,
  { cartId, productId, quantity }: IUpdateCartProductInput
): Promise<ICartProductDTO> => {
  if (quantity < 1)
    throw new RequestError({
      code: 'quantity',
      message: 'Invalid quantity',
      status: 400,
    });

  const hasProduct = await cartRepo.getCartProduct({ cartId, productId });
  if (!hasProduct)
    throw new RequestError({
      code: 'productId',
      message: 'Invalid product id',
      status: 400,
    });

  return cartRepo.updateCartProduct({ cartId, productId, quantity });
};

export default service;
