// package: product
// file: product/product.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as product_product_pb from "../product/product_pb";

interface IProductService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getProduct: IProductService_IGetProduct;
    getProductBatch: IProductService_IGetProductBatch;
}

interface IProductService_IGetProduct extends grpc.MethodDefinition<product_product_pb.GetProductRequest, product_product_pb.GetProductResponse> {
    path: "/product.Product/GetProduct";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<product_product_pb.GetProductRequest>;
    requestDeserialize: grpc.deserialize<product_product_pb.GetProductRequest>;
    responseSerialize: grpc.serialize<product_product_pb.GetProductResponse>;
    responseDeserialize: grpc.deserialize<product_product_pb.GetProductResponse>;
}
interface IProductService_IGetProductBatch extends grpc.MethodDefinition<product_product_pb.GetProductBatchRequest, product_product_pb.GetProductBatchResponse> {
    path: "/product.Product/GetProductBatch";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<product_product_pb.GetProductBatchRequest>;
    requestDeserialize: grpc.deserialize<product_product_pb.GetProductBatchRequest>;
    responseSerialize: grpc.serialize<product_product_pb.GetProductBatchResponse>;
    responseDeserialize: grpc.deserialize<product_product_pb.GetProductBatchResponse>;
}

export const ProductService: IProductService;

export interface IProductServer {
    getProduct: grpc.handleUnaryCall<product_product_pb.GetProductRequest, product_product_pb.GetProductResponse>;
    getProductBatch: grpc.handleUnaryCall<product_product_pb.GetProductBatchRequest, product_product_pb.GetProductBatchResponse>;
}

export interface IProductClient {
    getProduct(request: product_product_pb.GetProductRequest, callback: (error: grpc.ServiceError | null, response: product_product_pb.GetProductResponse) => void): grpc.ClientUnaryCall;
    getProduct(request: product_product_pb.GetProductRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: product_product_pb.GetProductResponse) => void): grpc.ClientUnaryCall;
    getProduct(request: product_product_pb.GetProductRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: product_product_pb.GetProductResponse) => void): grpc.ClientUnaryCall;
    getProductBatch(request: product_product_pb.GetProductBatchRequest, callback: (error: grpc.ServiceError | null, response: product_product_pb.GetProductBatchResponse) => void): grpc.ClientUnaryCall;
    getProductBatch(request: product_product_pb.GetProductBatchRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: product_product_pb.GetProductBatchResponse) => void): grpc.ClientUnaryCall;
    getProductBatch(request: product_product_pb.GetProductBatchRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: product_product_pb.GetProductBatchResponse) => void): grpc.ClientUnaryCall;
}

export class ProductClient extends grpc.Client implements IProductClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getProduct(request: product_product_pb.GetProductRequest, callback: (error: grpc.ServiceError | null, response: product_product_pb.GetProductResponse) => void): grpc.ClientUnaryCall;
    public getProduct(request: product_product_pb.GetProductRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: product_product_pb.GetProductResponse) => void): grpc.ClientUnaryCall;
    public getProduct(request: product_product_pb.GetProductRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: product_product_pb.GetProductResponse) => void): grpc.ClientUnaryCall;
    public getProductBatch(request: product_product_pb.GetProductBatchRequest, callback: (error: grpc.ServiceError | null, response: product_product_pb.GetProductBatchResponse) => void): grpc.ClientUnaryCall;
    public getProductBatch(request: product_product_pb.GetProductBatchRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: product_product_pb.GetProductBatchResponse) => void): grpc.ClientUnaryCall;
    public getProductBatch(request: product_product_pb.GetProductBatchRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: product_product_pb.GetProductBatchResponse) => void): grpc.ClientUnaryCall;
}
