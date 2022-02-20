import service from '../service';
import Repo from '../../__mocks__/repo';

const repo = Repo();

describe('deleteCartProduct service', () => {
  it('should delete a cart product', async () => {
    repo.cartProducts = [
      {
        id: 'test-id',
        cartId: 'test-cart-id',
        productId: 'test-product-id',
        quantity: 1,
        createdAt: 'test-created-at',
        updatedAt: 'test-updated-at',
      },
    ];

    await service(repo, {
      cartId: 'test-cart-id',
      productId: 'test-product-id',
    });

    expect(repo.cartProducts).toHaveLength(0);
  });
});
