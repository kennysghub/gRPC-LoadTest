import { useState, useEffect } from 'react';
import '../styles/messageFormStyle.css';
import { ChatMessage } from '../proto/chat_pb';
import { ChatServiceClient } from '../proto/ChatServiceClientPb';

const MessageForm = () => {
  const [user, setUser] = useState('');
  const [time, setTime] = useState(0);
  const [message, setMessage] = useState('');
  
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

  return (
    <div>
      <h2>Contact Us</h2>
      <input className="input" onChange={handleUser} placeholder="Your Name" />
      <input className="input"  onChange={handleTime} placeholder="Your Time" />
      <input className="input"  onChange={handleMessage} placeholder="Your Message" />
      <button className="button" type="button"onClick={handleSubmit}>Send</button>
    </div>
  );
};

export default MessageForm;