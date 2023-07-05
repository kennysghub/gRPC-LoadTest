import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";

const PORT = 8082;
const PROTO_FILE = '../proto/chat.proto';

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE),{});
const grpcObj = grpc.loadPackageDefinition(packageDef);
const chatPkg = grpcObj.chat;

function main() {
    const server = getServer();
  
    server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err);
        return;
      };
      console.log(`Your server as started on port ${port}`);
      server.start();
    });
  };

function getServer(){
    const server = new grpc.Server();
    server.addService(chatPkg.ChatService.service, {

    })
    return server;
}