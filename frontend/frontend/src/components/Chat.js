
// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
localStorage.debug = '*';
const socket = io('http://localhost:5000');

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server with socket ID:', socket.id);
    });
  
    // Receive previous messages from the server
    socket.on('previousMessages', (msgs) => {
      setMessages(msgs);  // Set previous messages
    });
  
    // Receive new messages in real time
    socket.on('receiveMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });
  
    return () => {
      socket.off('previousMessages');
      socket.off('receiveMessage');
    };
  }, []);
  

  // const handleSendMessage = () => {
  //   socket.emit('sendMessage', message);
  //   setMessage('');
  // };
  const handleSendMessage = () => {
    const messageObject = {
      content: message,  // The actual message content
      sender: 'Your Name',  // Replace with dynamic sender if needed
    };
  
    socket.emit('sendMessage', messageObject);  // Send an object with both content and sender
    setMessage('');  // Clear input after sending
  };
  
  return (
    <div>
      <div>
        <h2>Chat</h2>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.sender}: </strong>{msg.content}  {/* Display sender and content */}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
  
};

export default Chat;
