import React, { useEffect, useRef, useState } from "react";
import "./MessageApp.css";
import { useSocket } from "../../contexts/SocketProvider";

const MessageApp = ({ remoteSocketId, messageArr, setMessageApp }) => {
  const { socket } = useSocket();
  const [roompageMessage, setRoompageMessage] = useState("");

  const messagesEndRef = useRef(null);

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom whenever messageArr changes
  useEffect(() => {
    scrollToBottom();
  }, [messageArr]);

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    socket.emit("message", { roompageMessage, remoteSocketId });
    setRoompageMessage("");
  };
  return (
    <div className="homepage_messageDiv">
      <div className="homepage_messageDiv_heading">
        <h1>Message</h1>
        <img
          src="/images/message/closeMessageApp.png"
          onClick={() => setMessageApp(false)}
        />
      </div>

      <div className="user_messages">
        {messageArr.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: socket.id === m.socketId ? "flex-end" : "flex-start",
              background: socket.id === m.socketId ? "#d67aea" : "#B2B2B2",
              color: socket.id === m.socketId ? "white" : "black",
            }}
          >
            {m.message}
          </div>
        ))}
        <div ref={messagesEndRef} style={{ background: "white" }} />
      </div>
      <form className="messageDiv_form" onSubmit={handleSubmitMessage}>
        <input
          value={roompageMessage}
          type="text"
          placeholder="Type a Message"
          onChange={(e) => setRoompageMessage(e.target.value)}
        ></input>
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default MessageApp;
