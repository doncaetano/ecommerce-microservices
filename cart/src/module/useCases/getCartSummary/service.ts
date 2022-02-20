import Product from '../../../infra/api/product';
import RequestError from '../../../shared/RequestError';
import { ICartRepo, ICartSummaryDTO } from '../../dtos';

export interface IGetCartSummaryInput {
  id: string;
}

export const service = async (
  cartRepo: Pick<ICartRepo, 'listCartProducts' | 'getCart'>,
  productApi: Pick<Product, 'getProductBatch'>,
  { id }: IGetCartSummaryInput
): Promise<ICartSummaryDTO> => {
  const hasCart = await cartRepo.getCart({ id });
  if (!hasCart)
    throw new RequestError({
      code: 'id',
      message: 'Invalid cart id',
      status: 400,
    });

  const cartProducts = await cartRepo.listCartProducts({ cartId: id });
  const productIds = cartProducts.map(({ productId }) => productId);
  const products = await productApi.getProductBatch({ productIds });

  return products.reduce(
    (
      { total, subtotal, discounts },
      { price, fixedDiscount, percentageDiscount }
    ) => {
      const priceWithDiscount =
        (price - fixedDiscount) * (1 - percentageDiscount / 100);
      return {
        total: total + (priceWithDiscount > 0 ? priceWithDiscount : 0),
        subtotal: subtotal + price,
        discounts:
          discounts +
          (priceWithDiscount > 0 ? price - priceWithDiscount : price),
      };
    },
    {
      total: 0,
      subtotal: 0,
      discounts: 0,
    }
  );
};

export default service;
