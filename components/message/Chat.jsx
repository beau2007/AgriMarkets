"use client";

import { useState } from 'react';

export default function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setMessages([...messages, message]);
      setMessage("");
    }
  };

  return (
    <>
    <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          cursor: 'pointer',
        }}
        onClick={toggleChat}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20 2H4c-1.1 0-2 .9-2 2v16l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H6.83L4 16.83V4h16v10z" />
        </svg>
    </div>

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '300px',
            height: '400px',
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              padding: '10px',
              borderBottom: '1px solid #ccc',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#f7f7f7',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
            }}
          >
            <span>Chat</span>
            <button
              onClick={toggleChat}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
              }}
            >
              X
            </button>
          </div>
          <div
            style={{
              padding: '10px',
              overflowY: 'auto',
              flex: 1,
            }}
          >
            {messages.map((msg, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                {msg}
              </div>
            ))}
          </div>
          <div
            style={{
              padding: '10px',
              borderTop: '1px solid #ccc',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <input
              type="text"
              value={message}
              onChange={handleMessageChange}
              placeholder="Écrire un message..."
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                marginRight: '10px',
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                padding: '8px 12px',
                backgroundColor: '#007bff',
                color: 'white',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Envoyer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
