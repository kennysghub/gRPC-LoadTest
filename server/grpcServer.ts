import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "../proto/chat";
import { ChatServiceClient, ChatServiceHandlers, ChatServiceDefinition } from "../proto/chat/ChatService";
import {Server, ServerWritableStream} from '@grpc/grpc-js';
import { ChatMessage, ChatResponse } from '../src/proto/chat_pb';

import prometheusServer from '../metrics/prometheusServer';
//
import { grpcMethodDurationHistogram } from "../metrics/prometheusServer";

const startTime = process.hrtime();
const endTime = process.hrtime(startTime);
const durationInSeconds = endTime[0] + endTime[1] / 1e9;


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
        grpcMethodDurationHistogram.observe({method:'SendMessage'},durationInSeconds)
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

//
// const app = express();
// const EXPRESS_PORT = 3500;

// app.use(cors());
// app.use('/metrics', async (req,res) => {
//   res.set('Content-Type', register.contentType);
//   const metrics = await register.getMetricsAsJSON();
//   res.header('Access-Control-Allow-Origin', '*');
//   res.json(metrics);
// });

// app.listen(EXPRESS_PORT, ()=> console.log(`Prometheus server listening on ${EXPRESS_PORT}`));

//

prometheusServer()

startServer()


