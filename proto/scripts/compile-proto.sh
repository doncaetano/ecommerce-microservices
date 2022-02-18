#!/usr/bin/env bash

PROTOC="$(npm bin)/grpc_tools_node_protoc"
PLUGIN="$(npm bin)/grpc_tools_node_protoc_plugin"
PROTO_PATH=./packages
OUT_DIR=$1

mkdir -p ./__generated__/$OUT_DIR/

$PROTOC \
  --plugin=$PLUGIN \
  --js_out=import_style=commonjs,binary:./__generated__/ \
  --grpc_out=grpc_js:./__generated__/ \
  --proto_path=$PROTO_PATH \
  ./packages/$OUT_DIR/$OUT_DIR.proto

$PROTOC \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --ts_out=./__generated__/ \
  --proto_path=$PROTO_PATH \
  ./packages/$OUT_DIR/$OUT_DIR.proto

