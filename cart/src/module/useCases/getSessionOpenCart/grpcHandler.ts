import { object, string } from 'yup';

import { CartMessages, UnaryHandler } from '../../dtos';
import PostgresCartRepo from '../../repos/PostgresCartRepo';
import service from './service';
import {
  GetSessionOpenCartRequest,
  GetSessionOpenCartResponse,
} from '../../../infra/http/grpc/cart/cart_pb';

const handler: UnaryHandler<
  CartMessages,
  GetSessionOpenCartRequest,
  GetSessionOpenCartResponse
> = async (call, callback, messages) => {
  const getCartSchema = object({
    sessionId: string().uuid().required(),
  });

  const input = {
    sessionId: call.request.getSessionid(),
  };
  const { sessionId } = await getCartSchema.validate(input);

  const cartRepo = new PostgresCartRepo();
  const result = await service(cartRepo, { sessionId });

  const getCartResponse = new messages.GetSessionOpenCartResponse();
  if (result) {
    const { id: cartId } = result;
    getCartResponse.setId(cartId);
  }

  callback(null, getCartResponse);
};

export default handler;
