import React, { useState, useEffect } from "react";

function WebSocketClient() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket("ws://172.30.92.184:8080/socket");

    newSocket.onopen = () => {
      console.log("WebSocket connected");
      setSocket(newSocket);
    };

    newSocket.onmessage = (event) => {
      setResponse(event.data);
    };

    newSocket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
      setMessage("");
    } else {
      console.log("WebSocket is not ready yet.");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <p>Response: {response}</p>
    </div>
  );
}

export default WebSocketClient;
