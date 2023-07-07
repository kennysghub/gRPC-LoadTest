import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/chat";
import { ChatServiceClient, ChatServiceHandlers, ChatServiceDefinition } from "../proto/chat/ChatService";
import {Server, ServerWritableStream} from '@grpc/grpc-js';
import { ChatMessage, ChatResponse } from '../src/proto/chat_pb';


// const chatHistory = [];


const PORT = 8082;
const PROTO_FILE = '../proto/chat.proto';

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE),{});
const grpcObj = (grpc.loadPackageDefinition(packageDef)as unknown ) as ProtoGrpcType;
const chatPkg = grpcObj.chat;

export function startServer() {
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
      SendMessage: (call:any, callback:any) => {
        console.table(call.request)
        if(call.request){
          return callback(null, "Yay")
        }
        if(call.request.message === ''){
          return callback("error")
        }
      }
    });
    return server;
};

startServer()


