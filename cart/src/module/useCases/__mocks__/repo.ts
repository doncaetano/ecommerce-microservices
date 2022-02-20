import {
  IAddCartProductDTO,
  ICartDTO,
  ICartProductDTO,
  ICreateCartDTO,
  IDeleteCartProductDTO,
  IGetCartDTO,
  IGetCartProductDTO,
} from '../../dtos';

const getNewRepo = () => {
  const repo = {
    carts: [] as ICartDTO[],
    cartProducts: [] as ICartProductDTO[],
    getCart: async ({
      id,
      sessionId,
      isOpen,
    }: IGetCartDTO): Promise<ICartDTO | undefined> => {
      return repo.carts.find(
        (cart) =>
          (cart.id === id || cart.sessionId === sessionId) &&
          (!isOpen || cart.closedAt === '')
      );
    },
    getCartProduct: async ({
      productId,
      cartId,
    }: IGetCartProductDTO): Promise<ICartProductDTO | undefined> => {
      return repo.cartProducts.find(
        (cartProduct) =>
          cartProduct.cartId === cartId && cartProduct.productId === productId
      );
    },
    createCart: async (createCartDTO: ICreateCartDTO): Promise<ICartDTO> => {
      const cart = {
        ...createCartDTO,
        id: 'test-id',
        createdAt: 'test-created-at',
        updatedAt: 'test-updated-at',
        closedAt: '',
      };
      repo.carts.push(cart);

      return cart;
    },
    addCartProduct: async (
      addCartProductDTO: IAddCartProductDTO
    ): Promise<ICartProductDTO> => {
      const cartProduct = {
        ...addCartProductDTO,
        id: 'test-id',
        createdAt: 'test-created-at',
        updatedAt: 'test-updated-at',
      };
      repo.cartProducts.push(cartProduct);

      return cartProduct;
    },
    deleteCartProduct: async ({
      cartId,
      productId,
    }: IDeleteCartProductDTO): Promise<void> => {
      repo.cartProducts = repo.cartProducts.filter(
        (cartProduct) =>
          cartProduct.cartId !== cartId || cartProduct.productId !== productId
      );
    },
  };

  return repo;
};

export default getNewRepo;
