import RequestError from '../../../shared/RequestError';
import { IProductPromotionDTO, IProductRepo } from '../../dtos';

export interface ICreateProductPromotionInput {
  productId: string;
  name: string;
  fixedDiscount?: number;
  percentageDiscount?: number;
  validFrom: string;
  validTo: string;
}

export const service = async (
  productRepo: IProductRepo,
  {
    productId,
    name,
    fixedDiscount,
    percentageDiscount,
    validFrom,
    validTo,
  }: ICreateProductPromotionInput
): Promise<IProductPromotionDTO> => {
  const product = await productRepo.getProduct({ id: productId });
  if (!product)
    throw new RequestError({
      code: 'productId',
      message: 'Invalid product',
      status: 400,
    });

  return productRepo.createProductPromotion({
    productId,
    name,
    fixedDiscount,
    percentageDiscount,
    validFrom,
    validTo,
  });
};

export default service;
