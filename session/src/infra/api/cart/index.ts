import * as grpc from '@grpc/grpc-js';
import util from 'util';

import { CART_API_URL } from '../../../shared/environment';

import * as services from './cart_grpc_pb';
import * as messages from './cart_pb';
import { GetSessionOpenCartResponse } from './cart_pb';

interface IGetSessionOpenCartInput {
  sessionId: string;
}

let client;
const getClient = () => {
  if (!client)
    client = new services.CartClient(
      CART_API_URL,
      grpc.credentials.createInsecure()
    );
  return client;
};

class Cart {
  private client: services.CartClient;

  constructor() {
    this.client = getClient();
  }

  async getSessionOpenCart({ sessionId }: IGetSessionOpenCartInput) {
    const getSessionOpenCart = util
      .promisify(this.client.getSessionOpenCart)
      .bind(this.client);
    const message = new messages.GetSessionOpenCartRequest();
    message.setSessionid(sessionId);

    const result = (await getSessionOpenCart(
      message
    )) as GetSessionOpenCartResponse;

    return result.getId();
  }
}

export default Cart;
