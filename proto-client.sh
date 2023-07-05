mkdir -p ./src/proto-gen
protoc -I=. ./proto/*.proto \
  --js_out=import_style=commonjs:./src/proto-gen \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:./src/grpc-web