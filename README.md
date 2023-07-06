# gRPSeek - Alpha

```bash
├── README.md
├── build
│   ├── bundle.js
│   ├── bundle.js.LICENSE.txt
│   ├── bundle.js.map
│   └── index.html
├── package.json
├── proto
│   ├── chat
│   │   ├── ChatMessage.ts
│   │   ├── ChatResponse.ts
│   │   └── ChatService.ts
│   ├── chat.proto
│   └── chat.ts
├── proto-client.sh
├── proto-gen.sh
├── server
│   └── grpcServer.ts
├── server.ts
├── src
│   ├── App.tsx
│   ├── index.html
│   ├── index.tsx
│   ├── proto
│   │   ├── ChatServiceClientPb.ts
│   │   ├── chat_pb.d.ts
│   │   └── chat_pb.js
│   └── styles.css
├── tsconfig.json
├── webpack
│   ├── webpack.common.js
│   ├── webpack.config.js
│   ├── webpack.dev.js
│   └── webpack.prod.js
├── yarn-error.log
└── yarn.lock

```

- July 5th 12:08 AM
Added dependencies to compile proto files with *protoc*
```
yarn add -D @grpc/grpc-js @grpc/proto-loader protoc-gen-grpc-web ts-node typescript
```
-- yarn-error.log file appeared 

<hr>

**proto-clieint.sh**
```sh
mkdir -p ./src/proto-gen
protoc -I=. ./proto/*.proto \
  --js_out=import_style=commonjs:./src/proto-gen \
  --grpc-web_out=import_style=typescript,mode=grpcwebtext:./src/grpc-web
```
- Made a proto folder inside src/grpc-web 
- Made a proto folder inside proto-gen

>`mkdir -p ./src/proto-gen`: This command creates a directory structure for the generated protobuf code. It creates a folder named "proto-gen" inside the "./src" directory. The -p flag ensures that the command creates any necessary parent directories if they don't already exist.

>`protoc -I=. ./proto/*.proto`: This command invokes the Protocol Buffers compiler (protoc) to generate code based on the protobuf files (*.proto) located in the "./proto" directory. The -I flag specifies the include path, which is set to the current directory in this case.

> `--js_out=import_style=commonjs:./src/proto-gen`: This flag specifies the output format for the generated JavaScript code. In this case, the generated code will use the CommonJS module system, and the output directory is set to "./src/proto-gen". The --js_out flag is used for generating JavaScript code.

> `--grpc-web_out=import_style=typescript,mode=grpcwebtext:./src/grpc-web`: This flag specifies the output format for the generated gRPC-Web code. It generates TypeScript code using the specified import style and mode, and the output directory is set to "./src/grpc-web". The --grpc-web_out flag is used for generating gRPC-Web code.

<hr>
Added grpc dependencies 12:50AM
```
yarn add -D @grpc/grpc-js @grpc/proto-loader google-protobuf
```
<hr>

7/6/23 4:12PM
Added `proto-gen.sh` file. It added ts files. Seems like it added 
- TypeScript types for gRPC service definitions into the ./proto/chat folder 
The proto-gen.sh file:
```sh
#!/bin/bash
yarn proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=proto/ proto/*.proto
```
- 