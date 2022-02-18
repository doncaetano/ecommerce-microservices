// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var cart_cart_pb = require('../cart/cart_pb.js');

function serialize_cart_GetSessionOpenCartRequest(arg) {
  if (!(arg instanceof cart_cart_pb.GetSessionOpenCartRequest)) {
    throw new Error('Expected argument of type cart.GetSessionOpenCartRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cart_GetSessionOpenCartRequest(buffer_arg) {
  return cart_cart_pb.GetSessionOpenCartRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_cart_GetSessionOpenCartResponse(arg) {
  if (!(arg instanceof cart_cart_pb.GetSessionOpenCartResponse)) {
    throw new Error('Expected argument of type cart.GetSessionOpenCartResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_cart_GetSessionOpenCartResponse(buffer_arg) {
  return cart_cart_pb.GetSessionOpenCartResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// import "google/protobuf/empty.proto";
//
var CartService = exports.CartService = {
  getSessionOpenCart: {
    path: '/cart.Cart/GetSessionOpenCart',
    requestStream: false,
    responseStream: false,
    requestType: cart_cart_pb.GetSessionOpenCartRequest,
    responseType: cart_cart_pb.GetSessionOpenCartResponse,
    requestSerialize: serialize_cart_GetSessionOpenCartRequest,
    requestDeserialize: deserialize_cart_GetSessionOpenCartRequest,
    responseSerialize: serialize_cart_GetSessionOpenCartResponse,
    responseDeserialize: deserialize_cart_GetSessionOpenCartResponse,
  },
};

exports.CartClient = grpc.makeGenericClientConstructor(CartService);
