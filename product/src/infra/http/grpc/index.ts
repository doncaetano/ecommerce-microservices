import * as grpc from '@grpc/grpc-js';
import * as services from './product/product_grpc_pb';
import * as messages from './product/product_pb';

import ProductService from '../../../module/ProductService';

const run = async (port: number) => {
  const server = new grpc.Server();

  const productService = new ProductService(messages);

  // @ts-ignore
  server.addService(services.ProductService, productService);

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
