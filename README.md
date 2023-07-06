# gRPSeek - Alpha

[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)

![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
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

## Set Up 
Install dependencies
```
yarn install
```
Build/Run Containers:
```
docker-compose up
docker-compose up -d // detach mode
```
Transpile Code:
```
yarn build 
```
Then start gRPC Server:
```
yarn server
```
Lastly, start development server:
```
yarn start
```
For production:
```
cd build
npx serve
```
Visit the website at http://localhost:8081/

Code Formatting using Prettier 
```
yarn format 
```
Code Linting with ESLint. Optional to specify the files. 
```
yarn lint <fileNames>
```





<details>
  <summary>Personal Log of Work</summary>
  
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

11:52PM 
- Getting an import error in grpcServer.ts file. Going to split up tsconfig.json into two places, one in the server and one in the "client"(src). 

```
yarn tsc --project server/tsconfig.json
```
-> That worked. 
- TypeScript files were able to transpile because of webpack. Webpack uses tools such as 'ts-loader' to transpile TypeScript to JavaScript, so that's why I didn't have `tsc`.
- The `tsc` command is specifically tied to the TypeScript Compiler, which is not absolutely necessary if you are using build tools. 
-> To avoid installing TypeScript globally with `tsc`, since we have TypeScript installed as a **devDependency* we can use `tsc` as a script "tsc". 
```
"tsc": "tsc"
```
> This is kinda weird but it worked lmaooo. 

  
</details>


