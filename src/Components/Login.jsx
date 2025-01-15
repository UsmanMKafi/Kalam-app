// src/Components/Login.jsx
import { useState } from "react";
import PropTypes from "prop-types";

const Login = ({ onLogin, onSwitchToSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      alert("Both username and password are required!");
      return;
    }

    // Verify credentials from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      onLogin(username); // Log in the user
    } else {
      alert("Invalid username or password!");
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Log In</button>
      <p>
        Do not have an account?{" "}
        <button onClick={onSwitchToSignup} style={{ color: "blue", border: "none", background: "none", cursor: "pointer" }}>
          Sign Up
        </button>
      </p>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onSwitchToSignup: PropTypes.func.isRequired,
};

export default Login;
