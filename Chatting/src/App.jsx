import React, { useState } from 'react'
import io from 'socket.io-client'
import Chat from './Chat.jsx'
import music from './Music.wav'

const socket = io.connect("http://localhost:1000")

const App = () => {
  
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")
  const [showChat, setShowChat] = useState(false);
  const notification = new Audio(music)

  const isJoined = ()=>{
    if (username !== "" && room !== ""){
      socket.emit("Join_Room",room);
      setShowChat(true)
      notification.play();
    }
  }

  return (
    <>
      {!showChat && (
        <div className="join_room">
          <h1>Join Room</h1>
          <input
            type="text"
            placeholder="Enter Your Name"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Your room ID"
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={isJoined}>Join</button>
        </div>
      )}

      {showChat && <Chat socket={socket} username={username} room={room} />}
    </>
  );
}

export default App
