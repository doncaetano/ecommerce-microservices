import { IProductDTO, IProductRepo } from '../../dtos';

export interface ICreateProductInput {
  name: string;
  price?: number;
}

export const service = async (
  productRepo: IProductRepo,
  { name, price }: ICreateProductInput
): Promise<IProductDTO> => {
  return productRepo.createProduct({ name, price });
};

export default service;
