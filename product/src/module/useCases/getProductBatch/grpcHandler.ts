import { object, string, array } from 'yup';

import { ProductMessages, UnaryHandler } from '../../dtos';
import PostgresProductRepo from '../../repos/PostgresProductRepo';
import service from './service';
import {
  GetProductBatchRequest,
  GetProductBatchResponse,
} from '../../../infra/http/grpc/product/product_pb';

const handler: UnaryHandler<
  ProductMessages,
  GetProductBatchRequest,
  GetProductBatchResponse
> = async (call, callback, messages) => {
  const getProductSchema = object({
    idList: array().of(string().uuid().required()).required(),
  });

  const input = {
    idList: call.request.getIdList(),
  };
  const { idList } = await getProductSchema.validate(input);

  const productRepo = new PostgresProductRepo();
  const result = await service(productRepo, { idList });

  const getProductBatchResponse = new messages.GetProductBatchResponse();
  getProductBatchResponse.setProductList(
    result.map(({ id, price, fixedDiscount, percentageDiscount }) => {
      const product = new messages.ProductDTO();
      product.setId(id);
      product.setPrice(price);
      product.setFixeddiscount(fixedDiscount);
      product.setPercentagediscount(percentageDiscount);
      return product;
    })
  );

  callback(null, getProductBatchResponse);
};

export default handler;
