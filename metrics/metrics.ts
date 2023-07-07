import * as grpc from '@grpc/grpc-js';

import prometheusServer from './prometheusServer';

import { collectDefaultMetrics, register, Counter, Histogram, Summary } from 'prom-client';
collectDefaultMetrics();

const grpcRequestCounter: Counter<string> = new Counter({
    name: 'grpc_server_requests_total',
    help: 'Total number of gRPC requests received',
    labelNames: [ 'method' ],
  });
  
  const grpcMethodDurationHistogram: Histogram<string> = new Histogram({
    name: 'grpc_server_method_duration_seconds',
    help: 'Duration of gRPC methods in seconds',
    labelNames: [ 'method' ],
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
  
export default function observeRequest(method:any, request:any):void{
    const startTime = process.hrtime();
    //...observe other metrics
    const endTime = process.hrtime(startTime);
    const durationInSeconds = endTime[0] + endTime[1] / 1e9;
    grpcMethodDurationHistogram.observe({ method:method }, durationInSeconds);
  
    const requestSizeBytes = Buffer.byteLength(JSON.stringify(request));
    grpcRequestSizeHistogram.observe({ method:method }, requestSizeBytes);
}