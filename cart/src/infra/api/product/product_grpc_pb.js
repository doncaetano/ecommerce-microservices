// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var product_product_pb = require('../product/product_pb.js');

function serialize_product_GetProductBatchRequest(arg) {
  if (!(arg instanceof product_product_pb.GetProductBatchRequest)) {
    throw new Error('Expected argument of type product.GetProductBatchRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_product_GetProductBatchRequest(buffer_arg) {
  return product_product_pb.GetProductBatchRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_product_GetProductBatchResponse(arg) {
  if (!(arg instanceof product_product_pb.GetProductBatchResponse)) {
    throw new Error('Expected argument of type product.GetProductBatchResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_product_GetProductBatchResponse(buffer_arg) {
  return product_product_pb.GetProductBatchResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_product_GetProductRequest(arg) {
  if (!(arg instanceof product_product_pb.GetProductRequest)) {
    throw new Error('Expected argument of type product.GetProductRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_product_GetProductRequest(buffer_arg) {
  return product_product_pb.GetProductRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_product_GetProductResponse(arg) {
  if (!(arg instanceof product_product_pb.GetProductResponse)) {
    throw new Error('Expected argument of type product.GetProductResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_product_GetProductResponse(buffer_arg) {
  return product_product_pb.GetProductResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ProductService = exports.ProductService = {
  getProduct: {
    path: '/product.Product/GetProduct',
    requestStream: false,
    responseStream: false,
    requestType: product_product_pb.GetProductRequest,
    responseType: product_product_pb.GetProductResponse,
    requestSerialize: serialize_product_GetProductRequest,
    requestDeserialize: deserialize_product_GetProductRequest,
    responseSerialize: serialize_product_GetProductResponse,
    responseDeserialize: deserialize_product_GetProductResponse,
  },
  getProductBatch: {
    path: '/product.Product/GetProductBatch',
    requestStream: false,
    responseStream: false,
    requestType: product_product_pb.GetProductBatchRequest,
    responseType: product_product_pb.GetProductBatchResponse,
    requestSerialize: serialize_product_GetProductBatchRequest,
    requestDeserialize: deserialize_product_GetProductBatchRequest,
    responseSerialize: serialize_product_GetProductBatchResponse,
    responseDeserialize: deserialize_product_GetProductBatchResponse,
  },
};

exports.ProductClient = grpc.makeGenericClientConstructor(ProductService);
