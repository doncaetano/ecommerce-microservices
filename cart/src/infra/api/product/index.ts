import * as grpc from '@grpc/grpc-js';
import util from 'util';

import { PRODUCT_API_URL } from '../../../shared/environment';

import * as services from './product_grpc_pb';
import * as messages from './product_pb';
import { GetProductResponse, GetProductBatchResponse } from './product_pb';

export interface IGetProductInput {
  productId: string;
}

export interface IGetProductBatchInput {
  productIds: string[];
}

let client;
const getClient = () => {
  if (!client)
    client = new services.ProductClient(
      PRODUCT_API_URL,
      grpc.credentials.createInsecure()
    );
  return client;
};

class Product {
  private client: services.ProductClient;

  constructor() {
    this.client = getClient();
  }

  async getProduct({ productId }: IGetProductInput) {
    const getProduct = util.promisify(this.client.getProduct).bind(this.client);
    const message = new messages.GetProductRequest();
    message.setId(productId);

    const result = (await getProduct(message)) as GetProductResponse;

    return {
      id: result.getId(),
      price: result.getPrice(),
      removedAt: result.getRemovedat(),
    };
  }

  async getProductBatch({ productIds }: IGetProductBatchInput) {
    const getProduct = util
      .promisify(this.client.getProductBatch)
      .bind(this.client);
    const message = new messages.GetProductBatchRequest();
    message.setIdList(productIds);

    const result = (await getProduct(message)) as GetProductBatchResponse;

    return result.getProductList().map((product) => ({
      id: product.getId(),
      price: product.getPrice(),
      fixedDiscount: product.getFixeddiscount(),
      percentageDiscount: product.getPercentagediscount(),
    }));
  }
}

export default Product;
