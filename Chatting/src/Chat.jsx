import React, { useState } from 'react'


const Chat = ({socket, username, room}) => {
  const [currentMessage, setcurrentMessage] = useState("")

  const sendMessage = async ()=>{
    if (currentMessage !== ""){
        const messageData = {
            id:Math.random(),
            room:room,
            author:username,
            message: currentMessage,
            time: `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`
        }


        await socket.emit("sendMessage",messageData);
    }
  }

  return (
    <>
     <div className="chatroom">
        <h1>Welcome {username}</h1>
        <div className="chatbox">
            <div className="chatbody">
                <input 
                value={currentMessage}
                type="text" placeholder='Type a message'
                onChange={(e)=>setcurrentMessage(e.target.value)} />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
        </div>
     </div>
    </>
  )
}

export default Chat
