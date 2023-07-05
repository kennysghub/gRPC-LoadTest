# gRPSeek - Alpha

```bash
├── build
│   ├── bundle.js
│   ├── bundle.js.LICENSE.txt
│   ├── bundle.js.map
│   └── index.html
├── package.json
├── proto
│   └── chat.proto
├── src
│   ├── App.tsx
│   ├── index.html
│   ├── index.tsx
│   └── styles.css
├── tsconfig.json
├── webpack
│   ├── webpack.common.js
│   ├── webpack.config.js
│   ├── webpack.dev.js
│   └── webpack.prod.js
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


