import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Chat = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false); // Tracks if the user is typing
  const [welcomeMessageShown, setWelcomeMessageShown] = useState(false); // Tracks if the welcome message has been shown

  // Load messages from local storage when the component mounts
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // Display a welcome message when the user joins
  useEffect(() => {
    if (!welcomeMessageShown) {
      const welcomeMessage = {
        user: "System",
        text: `Welcome, ${username}! Feel free to start chatting.`,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prevMessages) => [...prevMessages, welcomeMessage]);
      setWelcomeMessageShown(true);
    }
  }, [username, welcomeMessageShown]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newChatMessage = {
        user: username,
        text: newMessage,
        timestamp: new Date().toLocaleTimeString(), // Add timestamp
      };
      setMessages([...messages, newChatMessage]);
      setNewMessage(""); // Clear the input
      setIsTyping(false); // Reset typing indicator
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    if (e.target.value.trim()) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    // Clear messages and remove from local storage
    setMessages([]);
    localStorage.removeItem("chatMessages");
  };

  return (
    <div className="chat-container">
      <h2>Chat Room</h2>
      <div className="chat-box">
        {messages.length === 0 ? (
          <p className="chat-placeholder">No messages yet. Start the conversation!</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${
                msg.user === username ? "chat-message-self" : "chat-message-other"
              }`}
            >
              <strong>{msg.user}</strong>: {msg.text}
              <div className="timestamp">{msg.timestamp}</div>
            </div>
          ))
        )}
      </div>

      {/* Typing Indicator */}
      {isTyping && <p className="typing-indicator">{username} is typing...</p>}

      <div className="chat-input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={handleTyping}
          className="chat-input"
        />
        <button onClick={handleSendMessage} className="chat-button">
          Send
        </button>
        <button onClick={handleClearChat} className="chat-clear-button">
          Clear Chat
        </button>
      </div>
    </div>
  );
};

Chat.propTypes = {
  username: PropTypes.string.isRequired, // Ensures username is a required string
};

export default Chat;
