import * as grpc from '@grpc/grpc-js';
import * as services from './cart/cart_grpc_pb';
import * as messages from './cart/cart_pb';

import CartService from '../../../module/CartService';

const run = async (port: number) => {
  const server = new grpc.Server();

  const cartService = new CartService(messages);

  // @ts-ignore
  server.addService(services.CartService, cartService);

  server.bindAsync(
    `localhost:${port}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.info(`🚀 gRPC API started at http://localhost:${port}`);
      server.start();
    }
  );
};

export default run;
