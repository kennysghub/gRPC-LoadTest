import express from 'express';
import cors from 'cors';

import { collectDefaultMetrics, register, Counter, Histogram, Summary } from 'prom-client';
collectDefaultMetrics();

const grpcRequestCounter: Counter<string> = new Counter({
    name: 'grpc_server_requests_total',
    help: 'Total number of gRPC requests received',
    labelNames: [ 'method' ],
  });
  
 export const grpcMethodDurationHistogram: Histogram<string> = new Histogram({
    name: 'grpc_server_method_duration_seconds',
    help: 'Duration of gRPC methods in seconds',
    labelNames: [ 'method', 'code' ],
    buckets: [ 0.1, 0.5, 1, 2, 5 ],
  });
  
  const grpcMethodLatencySummary: Summary<string> = new Summary({
    name: 'grpc_server_method_latency_seconds',
    help: 'Latency of gRPC methods in seconds',
    labelNames: [ 'method' ],
    percentiles: [ 0.1, 0.3, .4, 0.5, 0.9, 0.99 ],
  });
  
  const grpcRequestSizeHistogram: Histogram<string> = new Histogram({
    name: 'grpc_server_request_size_bytes',
    help: 'Size of incoming gRPC requests in bytes',
    labelNames: [ 'method' ],
    buckets: [ 100, 500, 1000, 2000 ],
  });
  
export function observeRequest(method:any, request:any):void{
    const startTime = process.hrtime();
    //...observe other metrics
    const endTime = process.hrtime(startTime);
    const durationInSeconds = endTime[0] + endTime[1] / 1e9;
    grpcMethodDurationHistogram.observe({ method:method }, durationInSeconds);
  
    // const requestSizeBytes = Buffer.byteLength(JSON.stringify(request));
    // grpcRequestSizeHistogram.observe({ method:method }, requestSizeBytes);
}


grpcMethodDurationHistogram.observe({code:'200'}, 0.4)
const app = express();
const PORT = 3500;

app.use(cors())
app.use('/metrics', async (req, res) => {
    const startTime = process.hrtime();
     console.dir(req);
     const endTime = process.hrtime(startTime);
     const durationInSeconds = endTime[0] + endTime[1] / 1e9;
    //  grpcMethodDurationHistogram.observe({ method:"SendMessage" }, durationInSeconds);
    //  const requestSizeBytes = Buffer.byteLength(JSON.stringify({req}));
    //  grpcRequestSizeHistogram.observe({ method:req.method }, requestSizeBytes)
  res.set('Content-Type', register.contentType);
  const metrics = await register.metrics()
  res.header('Access-Control-Allow-Origin', '*');
  res.send(metrics);

});

export default  function startServer(): void {
  app.listen(PORT, () => console.log(`Prometheus metrics server listening on ${PORT}`));
}




