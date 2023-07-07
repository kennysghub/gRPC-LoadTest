import { Worker } from 'worker_threads';

//function to create new instances of worker threads
const createWorkers = (method: string): Promise<Worker> => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(method);
    worker.on('message', (message: any) => {
      console.log(message);
    });
    worker.on('error', (error: Error) => {
      reject(error);
    });
    worker.on('exit', (code: number) => {
      if (code !== 0) {
        reject(new Error(`worker stopped with exit code ${code}`));
      }
    });
    resolve(worker);
  });
};

//sleep will be optional
const runTest = (method: string, vu: number): void => {
  console.log(`Creating ${vu} virtual users`);
  //create desired workers
  const workerArr: Promise<Worker>[] = [];
  while (vu > 0) {
    workerArr.push(createWorkers(method));
    vu--;
  }
  console.log(` Sending gRPC requests...`);

  Promise.all(workerArr).then(result => result);
};

const loadTest = (filepath: string, vu: number, seconds: number): void => {
  seconds *= 1000;
  const id = setInterval(() => {
    runTest(filepath, vu);
  }, 0);
  setTimeout(() => clearInterval(id), seconds);
};

export default loadTest;
