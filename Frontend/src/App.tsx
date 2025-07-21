import { useEffect, useRef, useState } from 'react';
import './App.css'

const ws = new WebSocket("http://localhost:3000");

function App() {

  const [messages, setMessages] = useState(["Welcome to Chat Room", "Hello guys"]);
  const wsRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    const ws = new WebSocket("http://localhost:8080");
    ws.onmessage = (event) => {
      setMessages(m => [...m, event.data]) // ...m means display all the messages , means and also message from server which is event.data
    }
    wsRef.current = ws;
    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
        
      }))
    }
    return () => {
      ws.close
    }
  }, []);

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      <br />

      <div className='h-160'>
        {messages.map (messages => 
        <div className='m-8'> 
            <span className='bg-white text-black rounded-md p-4'> 
              {messages} 
              </span> 
          </div>)}

      </div>
        <div className='w-full bg-white flex'>
          <input ref = {inputRef} className='flex-1 p-4' ></input>
          <button onClick = { () => {
            const message = inputRef.current?.value;
            wsRef.current.send(JSON.stringify({
              type: "chat",
              payload: {
                message: message
              }
            }))
          }} className='bg-purple-600 text-white p-4 rounded hover:cursor-pointer hover:bg-purple-700'>Send message</button>
        </div>
       
    </div>
  )
}

export default App
