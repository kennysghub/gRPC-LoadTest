import { useState, useEffect } from 'react';
import '../styles/messageFormStyle.css';
import { ChatMessage } from '../proto/chat_pb';
import { ChatServiceClient } from '../proto/ChatServiceClientPb';

const MessageForm = () => {
  const [user, setUser] = useState('');
  const [time, setTime] = useState(0);
  const [message, setMessage] = useState('');
  const [vus, setVus] = useState(0);
  
  useEffect(()=> {
    sendToEnvoy()
  
  
  }, [])


  const sendToEnvoy = async() => {
    const client = new ChatServiceClient('http://localhost:8080');
    const req = new ChatMessage();
    req.setUser(user || "Kendawg");
    req.setMessage(message || "Sup");
    req.setTimestamp(19);
    client.sendMessage(req, {}, (err, resp)=> {
        if(resp){
          console.log(resp.toObject())
        }
    });
};
// rpc GetMessagesStream (ChatMessage) returns (stream ChatMessage) {}

    // const getFromEnvoy = () => {
    //   const client = new ChatServiceClient('http://localhost:8080');
    //   const stream = client.getMessagesStream(message, {});

    // } 
    const handleMessage = (e:any) => {
      setMessage(e.target.value)
    };
    const handleUser = (e:any) => {
      setUser(e.target.value)
    };
    const handleTime = (e:any) => {
      setTime(e.target.value)
    }
  const handleSubmit = (e:any) => {
    e.preventDefault();
    const newMsg ={
      user, time, message
    };
    console.log(newMsg)
    sendToEnvoy()
  }
  const handleLoadTest = (e:any) => {
    console.log(vus)
    loadTest('MessageForm.tsx',vus,20)
  }
  const handleVus = (e:any) => {
    setVus(e.target.value)
  };

  return (
    <div>
      <h2>Contact Us</h2>
      <input className="input" onChange={handleUser} placeholder="Your Name" />
      <input className="input"  onChange={handleTime} placeholder="Your Time" />
      <input className="input"  onChange={handleMessage} placeholder="Your Message" />
      <button className="button" type="button"onClick={handleSubmit}>Send</button>
      <h2>Enter Number of Concurrent Requests to Simulate:</h2>
      <p>100 Maximum</p>
      <input type="number"max="100"value={vus}onChange={handleVus}/>
      <button onClick={handleLoadTest}>Load Test</button>
    </div>
  );
};

export default MessageForm;








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

export const loadTest = (filepath: string, vu: number, seconds: number): void => {
  seconds *= 1000;
  const id = setInterval(() => {
    runTest(filepath, vu);
  }, 0);
  setTimeout(() => clearInterval(id), seconds);
};
