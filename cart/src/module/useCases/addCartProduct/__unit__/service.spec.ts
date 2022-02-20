import RequestError from '../../../../shared/RequestError';
import service from '../service';
import Repo from '../../__mocks__/repo';
import productApi from '../../__mocks__/productApi';

const repo = Repo();

beforeEach(() => {
  repo.carts = [
    {
      id: 'stored-cart-id',
      sessionId: 'test-session-id',
      createdAt: 'test-created-at',
      updatedAt: 'test-updated-at',
      closedAt: '',
    },
  ];
  repo.cartProducts = [
    {
      id: 'test-id',
      cartId: 'stored-cart-id',
      productId: 'stored-product-id',
      quantity: 1,
      createdAt: 'test-created-at',
      updatedAt: 'test-updated-at',
    },
  ];
});

describe('addCartProduct service', () => {
  it('should add a cart product', async () => {
    const result = await service(repo, productApi, {
      cartId: 'stored-cart-id',
      productId: 'valid-product-id',
      quantity: 10,
    });

    expect(result).toBeTruthy();
    expect(result?.id).toBe('test-id');
    expect(result?.cartId).toBe('stored-cart-id');
    expect(result?.productId).toBe('valid-product-id');
    expect(result?.quantity).toBe(10);
    expect(result?.createdAt).toBe('test-created-at');
    expect(result?.updatedAt).toBe('test-updated-at');
    expect(repo.cartProducts).toHaveLength(2);
  });

  it('should throw invalid quantity error', async () => {
    try {
      expect(
        await service(repo, productApi, {
          cartId: 'test-cart-id',
          productId: 'test-product-id',
          quantity: 0,
        })
      ).toThrow(RequestError);
    } catch (err) {
      if (err instanceof RequestError) {
        const response = err.response();
        expect(response.body.error.code).toBe('quantity');
        expect(response.body.error.message).toBe('Invalid quantity');
        expect(response.status).toBe(400);
      }
    }
  });

  it('should throw invalid cart id error', async () => {
    try {
      expect(
        await service(repo, productApi, {
          cartId: 'test-cart-id',
          productId: 'test-product-id',
          quantity: 10,
        })
      ).toThrow(RequestError);
    } catch (err) {
      if (err instanceof RequestError) {
        const response = err.response();
        expect(response.body.error.code).toBe('cartId');
        expect(response.body.error.message).toBe('Invalid cart id');
        expect(response.status).toBe(400);
      }
    }
  });

  it('should throw product is already added error', async () => {
    try {
      expect(
        await service(repo, productApi, {
          cartId: 'stored-cart-id',
          productId: 'stored-product-id',
          quantity: 10,
        })
      ).toThrow(RequestError);
    } catch (err) {
      if (err instanceof RequestError) {
        const response = err.response();
        expect(response.body.error.code).toBe('productId');
        expect(response.body.error.message).toBe('Product is already added');
        expect(response.status).toBe(400);
      }
    }
  });

  it('should throw invalid product error due to invalid id', async () => {
    try {
      expect(
        await service(repo, productApi, {
          cartId: 'stored-cart-id',
          productId: 'invalid-product-id',
          quantity: 10,
        })
      ).toThrow(RequestError);
    } catch (err) {
      if (err instanceof RequestError) {
        const response = err.response();
        expect(response.body.error.code).toBe('productId');
        expect(response.body.error.message).toBe('Invalid product');
        expect(response.status).toBe(400);
      }
    }
  });

  it('should throw invalid product error due to invalid price', async () => {
    try {
      expect(
        await service(repo, productApi, {
          cartId: 'stored-cart-id',
          productId: 'invalid-product-price',
          quantity: 10,
        })
      ).toThrow(RequestError);
    } catch (err) {
      if (err instanceof RequestError) {
        const response = err.response();
        expect(response.body.error.code).toBe('productId');
        expect(response.body.error.message).toBe('Invalid product');
        expect(response.status).toBe(400);
      }
    }
  });

  it('should throw invalid product error due to product removed date', async () => {
    try {
      expect(
        await service(repo, productApi, {
          cartId: 'stored-cart-id',
          productId: 'removed-product',
          quantity: 10,
        })
      ).toThrow(RequestError);
    } catch (err) {
      if (err instanceof RequestError) {
        const response = err.response();
        expect(response.body.error.code).toBe('productId');
        expect(response.body.error.message).toBe('Invalid product');
        expect(response.status).toBe(400);
      }
    }
  });
});
