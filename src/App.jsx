// src/App.jsx
import { useState } from "react";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Chat from "./Components/Chat";
import "./index.css";

const App = () => {
  const [username, setUsername] = useState(null);
  const [isSignup, setIsSignup] = useState(false);

  const handleLogin = (username) => {
    setUsername(username); // Log in the user
  };

  const handleSignup = () => {
    setIsSignup(false); // Switch back to login after successful signup
  };

  return (
    <div>
      {username ? (
        <Chat username={username} />
      ) : isSignup ? (
        <Signup onSignup={handleSignup} />
      ) : (
        <Login onLogin={handleLogin} onSwitchToSignup={() => setIsSignup(true)} />
      )}
    </div>
  );
};

export default App;
