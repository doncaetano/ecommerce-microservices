// package: product
// file: product/product.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class GetProductRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): GetProductRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetProductRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetProductRequest): GetProductRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetProductRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetProductRequest;
    static deserializeBinaryFromReader(message: GetProductRequest, reader: jspb.BinaryReader): GetProductRequest;
}

export namespace GetProductRequest {
    export type AsObject = {
        id: string,
    }
}

export class GetProductResponse extends jspb.Message { 
    getId(): string;
    setId(value: string): GetProductResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetProductResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetProductResponse): GetProductResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetProductResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetProductResponse;
    static deserializeBinaryFromReader(message: GetProductResponse, reader: jspb.BinaryReader): GetProductResponse;
}

export namespace GetProductResponse {
    export type AsObject = {
        id: string,
    }
}

export class GetProductBatchRequest extends jspb.Message { 
    clearIdList(): void;
    getIdList(): Array<string>;
    setIdList(value: Array<string>): GetProductBatchRequest;
    addId(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetProductBatchRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetProductBatchRequest): GetProductBatchRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetProductBatchRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetProductBatchRequest;
    static deserializeBinaryFromReader(message: GetProductBatchRequest, reader: jspb.BinaryReader): GetProductBatchRequest;
}

export namespace GetProductBatchRequest {
    export type AsObject = {
        idList: Array<string>,
    }
}

export class GetProductBatchResponse extends jspb.Message { 
    clearProductList(): void;
    getProductList(): Array<ProductDTO>;
    setProductList(value: Array<ProductDTO>): GetProductBatchResponse;
    addProduct(value?: ProductDTO, index?: number): ProductDTO;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetProductBatchResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetProductBatchResponse): GetProductBatchResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetProductBatchResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetProductBatchResponse;
    static deserializeBinaryFromReader(message: GetProductBatchResponse, reader: jspb.BinaryReader): GetProductBatchResponse;
}

export namespace GetProductBatchResponse {
    export type AsObject = {
        productList: Array<ProductDTO.AsObject>,
    }
}

export class ProductDTO extends jspb.Message { 
    getId(): string;
    setId(value: string): ProductDTO;
    getPrice(): number;
    setPrice(value: number): ProductDTO;
    getFixeddiscount(): number;
    setFixeddiscount(value: number): ProductDTO;
    getPercentagediscount(): number;
    setPercentagediscount(value: number): ProductDTO;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ProductDTO.AsObject;
    static toObject(includeInstance: boolean, msg: ProductDTO): ProductDTO.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ProductDTO, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ProductDTO;
    static deserializeBinaryFromReader(message: ProductDTO, reader: jspb.BinaryReader): ProductDTO;
}

export namespace ProductDTO {
    export type AsObject = {
        id: string,
        price: number,
        fixeddiscount: number,
        percentagediscount: number,
    }
}
