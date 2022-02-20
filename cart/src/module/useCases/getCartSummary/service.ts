import Product from '../../../infra/api/product';
import { ICartRepo } from '../../dtos';

export interface IGetCartSummaryInput {
  id: string;
}

export const service = async (
  cartRepo: Pick<ICartRepo, 'listCartProducts'>,
  productApi: Pick<Product, 'getProductBatch'>,
  { id }: IGetCartSummaryInput
): Promise<any> => {
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
