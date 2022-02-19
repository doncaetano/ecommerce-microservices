// package: cart
// file: cart/cart.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as cart_cart_pb from "../cart/cart_pb";

interface ICartService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getSessionOpenCart: ICartService_IGetSessionOpenCart;
}

interface ICartService_IGetSessionOpenCart extends grpc.MethodDefinition<cart_cart_pb.GetSessionOpenCartRequest, cart_cart_pb.GetSessionOpenCartResponse> {
    path: "/cart.Cart/GetSessionOpenCart";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<cart_cart_pb.GetSessionOpenCartRequest>;
    requestDeserialize: grpc.deserialize<cart_cart_pb.GetSessionOpenCartRequest>;
    responseSerialize: grpc.serialize<cart_cart_pb.GetSessionOpenCartResponse>;
    responseDeserialize: grpc.deserialize<cart_cart_pb.GetSessionOpenCartResponse>;
}

export const CartService: ICartService;

export interface ICartServer {
    getSessionOpenCart: grpc.handleUnaryCall<cart_cart_pb.GetSessionOpenCartRequest, cart_cart_pb.GetSessionOpenCartResponse>;
}

export interface ICartClient {
    getSessionOpenCart(request: cart_cart_pb.GetSessionOpenCartRequest, callback: (error: grpc.ServiceError | null, response: cart_cart_pb.GetSessionOpenCartResponse) => void): grpc.ClientUnaryCall;
    getSessionOpenCart(request: cart_cart_pb.GetSessionOpenCartRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cart_cart_pb.GetSessionOpenCartResponse) => void): grpc.ClientUnaryCall;
    getSessionOpenCart(request: cart_cart_pb.GetSessionOpenCartRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cart_cart_pb.GetSessionOpenCartResponse) => void): grpc.ClientUnaryCall;
}

export class CartClient extends grpc.Client implements ICartClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getSessionOpenCart(request: cart_cart_pb.GetSessionOpenCartRequest, callback: (error: grpc.ServiceError | null, response: cart_cart_pb.GetSessionOpenCartResponse) => void): grpc.ClientUnaryCall;
    public getSessionOpenCart(request: cart_cart_pb.GetSessionOpenCartRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: cart_cart_pb.GetSessionOpenCartResponse) => void): grpc.ClientUnaryCall;
    public getSessionOpenCart(request: cart_cart_pb.GetSessionOpenCartRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: cart_cart_pb.GetSessionOpenCartResponse) => void): grpc.ClientUnaryCall;
}
