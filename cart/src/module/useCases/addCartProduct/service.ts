import { ICartProductDTO, ICartRepo } from '../../dtos';
import Product from '../../../infra/api/product';
import RequestError from '../../../shared/RequestError';

export interface IAddCartProductInput {
  cartId: string;
  productId: string;
  quantity?: number;
}

export const service = async (
  cartRepo: Pick<ICartRepo, 'getCartProduct' | 'addCartProduct' | 'getCart'>,
  productApi: Pick<Product, 'getProduct'>,
  { cartId, productId, quantity = 1 }: IAddCartProductInput
): Promise<ICartProductDTO> => {
  const hasCart = await cartRepo.getCart({ id: cartId });
  if (!hasCart)
    throw new RequestError({
      code: 'cartId',
      message: 'Invalid cart id',
      status: 400,
    });

  const hasProduct = await cartRepo.getCartProduct({ cartId, productId });
  if (hasProduct)
    throw new RequestError({
      code: 'productId',
      message: 'Product is already added',
      status: 400,
    });

  const validProduct = await productApi.getProduct({ productId });
  if (!validProduct.id || !validProduct.price || validProduct.removedAt)
    throw new RequestError({
      code: 'productId',
      message: 'Invalid product',
      status: 400,
    });

  return cartRepo.addCartProduct({ cartId, productId, quantity });
};

export default service;
