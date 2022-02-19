import * as grpc from '@grpc/grpc-js';
import productMessages from '../infra/http/grpc/product/product_pb';

export type ProductMessages = typeof productMessages;

export interface IProductDTO {
  id: string;
  name: string;
  price?: number;
  createdAt: string;
  updatedAt: string;
  removedAt: string;
}

export interface IProductPromotionDTO {
  id: string;
  name: string;
  fixedDiscount: number;
  percentageDiscount: number;
  validFrom: string;
  validTo: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProductBatchDTO {
  id: string;
  price: number;
  fixedDiscount: number;
  percentageDiscount: number;
}

export interface IGetProductDTO {
  id: string;
}

export interface ICreateProductDTO {
  name: string;
  price?: number;
}

export interface ICreateProductPromotionDTO {
  productId: string;
  name: string;
  fixedDiscount?: number;
  percentageDiscount?: number;
  validFrom: string;
  validTo: string;
}

export interface IListProductPromotionDTO {
  productId: string;
}

export interface IGetProductBatchDTO {
  idList: string[];
}

export interface IProductRepo {
  createProduct: (createProductDTO: ICreateProductDTO) => Promise<IProductDTO>;
  listProducts: () => Promise<IProductDTO[]>;
  getProduct: (
    getProductDTO: IGetProductDTO
  ) => Promise<IProductDTO | undefined>;
  createProductPromotion: (
    createProductPromotionDTO: ICreateProductPromotionDTO
  ) => Promise<IProductPromotionDTO>;
  listProductPromotions: (
    listProductPromotionDTO: IListProductPromotionDTO
  ) => Promise<IProductPromotionDTO[]>;
  getProductBatch: (
    getProductBatchDTO: IGetProductBatchDTO
  ) => Promise<IProductBatchDTO[]>;
}

export type UnaryHandler<Messages, Request, Response> = (
  call: grpc.ServerUnaryCall<Request, Response>,
  callback: grpc.sendUnaryData<Response>,
  messages: Messages
) => void;
