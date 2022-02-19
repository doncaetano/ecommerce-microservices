import { IProductDTO, IProductRepo } from '../../dtos';

export interface IListProductPromotionsInput {
  id: string;
}

export const service = async (
  productRepo: IProductRepo,
  { id }: IListProductPromotionsInput
): Promise<IProductDTO | undefined> => {
  return productRepo.getProduct({ id });
};

export default service;
