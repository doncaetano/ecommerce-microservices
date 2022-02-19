import { IProductDTO, IProductRepo } from '../../dtos';

export const service = async (
  productRepo: IProductRepo
): Promise<IProductDTO[]> => {
  return productRepo.listProducts();
};

export default service;
