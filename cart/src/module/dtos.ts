import * as grpc from '@grpc/grpc-js';
import cartMessages from '../infra/http/grpc/cart/cart_pb';

export interface ICartDTO {
  id: string;
  sessionId: string;
  createdAt: string;
  updatedAt: string;
  closedAt: string;
}

export interface ICartProductDTO {
  id: string;
  productId: string;
  cartId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface IGetCartDTO {
  id?: string;
  sessionId?: string;
  isOpen?: boolean;
}

export interface IUpdateCartDTO {
  id: string;
  closedAt: string;
}

export interface ICreateCartDTO {
  sessionId: string;
}

export interface IGetCartProductDTO {
  cartId: string;
  productId: string;
}

export interface IListCartProductsDTO {
  cartId: string;
}

export interface IAddCartProductDTO {
  cartId: string;
  productId: string;
  quantity: number;
}

export interface IUpdateCartProductDTO {
  cartId: string;
  productId: string;
  quantity: number;
}

export interface IDeleteCartProductDTO {
  cartId: string;
  productId: string;
}

export type CartMessages = typeof cartMessages;

export interface ICartRepo {
  createCart(createCartDTO: ICreateCartDTO): Promise<ICartDTO | undefined>;
  getCart: (getCartDTO: IGetCartDTO) => Promise<ICartDTO | undefined>;
  listCarts: () => Promise<ICartDTO[]>;
  updateCart: (updateCartDTO: IUpdateCartDTO) => Promise<ICartDTO>;
  getCartProduct: (
    getCartProductDTO: IGetCartProductDTO
  ) => Promise<ICartProductDTO | undefined>;
  deleteCartProduct: (
    deleteCartProductDTO: IDeleteCartProductDTO
  ) => Promise<void>;
  listCartProducts: (
    listCartProductsDTO: IListCartProductsDTO
  ) => Promise<ICartProductDTO[]>;
  addCartProduct: (
    addCartProductDTO: IAddCartProductDTO
  ) => Promise<ICartProductDTO>;
  updateCartProduct: (
    updateCartProductDTO: IUpdateCartProductDTO
  ) => Promise<ICartProductDTO>;
}

export type UnaryHandler<Messages, Request, Response> = (
  call: grpc.ServerUnaryCall<Request, Response>,
  callback: grpc.sendUnaryData<Response>,
  messages: Messages
) => void;
