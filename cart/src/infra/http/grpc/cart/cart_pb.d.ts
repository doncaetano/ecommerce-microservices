// package: cart
// file: cart/cart.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class GetSessionOpenCartRequest extends jspb.Message { 
    getSessionid(): string;
    setSessionid(value: string): GetSessionOpenCartRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetSessionOpenCartRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetSessionOpenCartRequest): GetSessionOpenCartRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetSessionOpenCartRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetSessionOpenCartRequest;
    static deserializeBinaryFromReader(message: GetSessionOpenCartRequest, reader: jspb.BinaryReader): GetSessionOpenCartRequest;
}

export namespace GetSessionOpenCartRequest {
    export type AsObject = {
        sessionid: string,
    }
}

export class GetSessionOpenCartResponse extends jspb.Message { 
    getId(): string;
    setId(value: string): GetSessionOpenCartResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetSessionOpenCartResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetSessionOpenCartResponse): GetSessionOpenCartResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetSessionOpenCartResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetSessionOpenCartResponse;
    static deserializeBinaryFromReader(message: GetSessionOpenCartResponse, reader: jspb.BinaryReader): GetSessionOpenCartResponse;
}

export namespace GetSessionOpenCartResponse {
    export type AsObject = {
        id: string,
    }
}
