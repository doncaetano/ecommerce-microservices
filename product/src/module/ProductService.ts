import * as grpc from '@grpc/grpc-js';

import serviceErrorHandler from './decorators/serviceErrorHandler';
import { ProductMessages } from './dtos';

import getProductHandler from './useCases/getProduct/grpcHandler';
import getProductBatchHandler from './useCases/getProductBatch/grpcHandler';

import {
  GetProductRequest,
  GetProductResponse,
  GetProductBatchRequest,
  GetProductBatchResponse,
} from '../infra/http/grpc/product/product_pb';

class ProductService {
  private messages: ProductMessages;

  constructor(messages: ProductMessages) {
    this.messages = messages;
  }

  @serviceErrorHandler()
  async getProduct(
    call: grpc.ServerUnaryCall<GetProductRequest, GetProductResponse>,
    callback: grpc.sendUnaryData<GetProductResponse>
  ): Promise<void> {
    await getProductHandler(call, callback, this.messages);
  }

  @serviceErrorHandler()
  async getProductBatch(
    call: grpc.ServerUnaryCall<GetProductBatchRequest, GetProductBatchResponse>,
    callback: grpc.sendUnaryData<GetProductBatchResponse>
  ): Promise<void> {
    await getProductBatchHandler(call, callback, this.messages);
  }
}

export default ProductService;
