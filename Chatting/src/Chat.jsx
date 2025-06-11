import React, { useState, useEffect, useRef } from "react";
import music from './chatmusic.mp3'

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setcurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const notification = new Audio(music)

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        id: Math.random(),
        room: room,
        author: username,
        message: currentMessage,
        time: `${new Date(Date.now()).getHours()}:${new Date(
          Date.now()
        ).getMinutes()}`,
      };

      await socket.emit("sendMessage", messageData);
      setMessageList((list) => [...list, messageData]);
      setcurrentMessage("");
    }
  };

  useEffect(() => {
    const handleReceiveMsg = (data) => {
      setMessageList((list) => [...list, data]);
      notification.play();
    };

    socket.on("ReceiveMessage", handleReceiveMsg);

    return () => {
      socket.off("ReceiveMessage", handleReceiveMsg);
    };
  }, [socket]);

  const containRef = useRef(null);

  useEffect(() => {
    containRef.current.scrollTop = containRef.current.scrollHeight;
  }, [messageList]);

  return (
    <>
      <div className="chatroom">
        <h1>Welcome {username}</h1>
        <div className="chatbox">
          <div
            className="auto-scrolling"
            ref = {containRef}
            style={{
              height: "550px",
              overflowY: "auto",
            }}
          >
            {messageList.map((data) => (
              <div
                key={data.id}
                className="msgcontent"
                id={username === data.author ? "you" : "other"}
              >
                <div>
                  <div
                    className="msg"
                    id={username === data.author ? "y" : "b"}
                  >
                    <p>{data.message}</p>
                  </div>
                  <div className="msgdetails">
                    <p>{data.author}</p>
                    <p>{data.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="chatbody">
            <input
              value={currentMessage}
              type="text"
              placeholder="Type a message"
              onChange={(e) => setcurrentMessage(e.target.value)}
              onKeyPress={(e) => {
                e.key === "Enter" && sendMessage();
              }}
            />
            <button onClick={sendMessage}>&#9658;</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
