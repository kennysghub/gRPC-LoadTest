import  { useEffect, useState } from 'react'
import { ChatMessage } from './proto/chat_pb';
import { ChatServiceClient } from './proto/ChatServiceClientPb';
export default function SendMessage() {
    const [msg, setMsg] = useState('');
    const [user,setUser] = useState('');
    const sendToEnvoy = () => {
        const client = new ChatServiceClient('http://localhost:8080');
        const req = new ChatMessage();
        req.setUser(user || "Kenny");
        req.setMessage(msg || "Testing a message!");
        req.setTimestamp(400);
        client.sendMessage(req,{}, (err, resp)=> {
            console.log(resp.toObject())
        })
    }

    const handleMsg = (e:any) => {
        setMsg(e.target.value)
    };
    const handleUser = (e:any) => {
        setUser(e.target.value);
    }

    useEffect( ()=> {
        sendToEnvoy();
    }, []);
  
    return (
    <div>
       <h1>Send Message</h1>
       <label htmlFor="">UserName: </label>
       <input type="text" name="" id=""onChange={handleUser} />
       <label htmlFor="">Message</label>
       <input type="text" name="" id="" onChange={handleMsg}/>
       <button onClick={sendToEnvoy}>Submit Message</button>
    </div>
  )
}
