import { object, string } from 'yup';

import { ProductMessages, UnaryHandler } from '../../dtos';
import PostgresProductRepo from '../../repos/PostgresProductRepo';
import service from './service';
import {
  GetProductRequest,
  GetProductResponse,
} from '../../../infra/http/grpc/product/product_pb';

const handler: UnaryHandler<
  ProductMessages,
  GetProductRequest,
  GetProductResponse
> = async (call, callback, messages) => {
  const getProductSchema = object({
    id: string().uuid().required(),
  });

  const input = {
    id: call.request.getId(),
  };
  const { id } = await getProductSchema.validate(input);

  const productRepo = new PostgresProductRepo();
  const result = await service(productRepo, { id });

  const getProductResponse = new messages.GetProductResponse();
  if (result) {
    const { id: productId, price, removedAt } = result;
    getProductResponse.setId(productId);
    if (price) getProductResponse.setPrice(price);
    if (removedAt) getProductResponse.setRemovedat(removedAt);
  }

  callback(null, getProductResponse);
};

export default handler;
