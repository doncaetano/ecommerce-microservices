import { IGetProductInput } from '../../../infra/api/product';

const productApi = {
  getProduct: async ({
    productId,
  }: IGetProductInput): Promise<{
    id: string;
    price: number;
    removedAt: string;
  }> => {
    if (productId === 'valid-product-id')
      return {
        id: productId,
        price: 1,
        removedAt: '',
      };

    if (productId === 'invalid-product-id')
      return {
        id: '',
        price: 1,
        removedAt: '',
      };

    if (productId === 'invalid-product-price')
      return {
        id: productId,
        price: 0,
        removedAt: '',
      };

    if (productId === 'removed-product')
      return {
        id: productId,
        price: 1,
        removedAt: 'test-removed-at',
      };

    return {
      id: '',
      price: 0,
      removedAt: 'test-removed-at',
    };
  },
};

export default productApi;
