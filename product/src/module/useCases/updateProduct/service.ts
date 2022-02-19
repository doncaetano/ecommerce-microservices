import { IProductDTO, IProductRepo } from '../../dtos';

export interface IUpdateProductInput {
  id: string;
  name?: string;
  price?: number;
}

export const service = async (
  productRepo: IProductRepo,
  { id, name, price }: IUpdateProductInput
): Promise<IProductDTO> => {
  return productRepo.updateProduct({ id, name, price });
};

export default service;
