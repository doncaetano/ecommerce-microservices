import { IProductBatchDTO, IProductRepo } from '../../dtos';

export interface IGetProductBatchInput {
  idList: string[];
}

export const service = async (
  productRepo: IProductRepo,
  { idList }: IGetProductBatchInput
): Promise<IProductBatchDTO[]> => {
  return productRepo.getProductBatch({ idList });
};

export default service;
