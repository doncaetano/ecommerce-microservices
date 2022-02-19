import { IProductPromotionDTO, IProductRepo } from '../../dtos';

export interface IListProductPromotionsInput {
  productId: string;
}

export const service = async (
  productRepo: IProductRepo,
  { productId }: IListProductPromotionsInput
): Promise<IProductPromotionDTO[]> => {
  return productRepo.listProductPromotions({ productId });
};

export default service;
