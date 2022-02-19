import * as grpc from '@grpc/grpc-js';

import serviceErrorHandler from './decorators/serviceErrorHandler';
import { CartMessages } from './dtos';

import getSessionOpenCartHandler from './useCases/getSessionOpenCart/grpcHandler';

import {
  GetSessionOpenCartRequest,
  GetSessionOpenCartResponse,
} from '../infra/http/grpc/cart/cart_pb';

class CartService {
  private messages: CartMessages;

  constructor(messages: CartMessages) {
    this.messages = messages;
  }

  @serviceErrorHandler()
  async getSessionOpenCart(
    call: grpc.ServerUnaryCall<
      GetSessionOpenCartRequest,
      GetSessionOpenCartResponse
    >,
    callback: grpc.sendUnaryData<GetSessionOpenCartResponse>
  ): Promise<void> {
    await getSessionOpenCartHandler(call, callback, this.messages);
  }
}

export default CartService;
