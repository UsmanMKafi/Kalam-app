// src/Components/Signup.jsx
import { useState } from "react";
import PropTypes from "prop-types";

const Signup = ({ onSignup }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!username.trim() || !password.trim()) {
      alert("Both username and password are required!");
      return;
    }

    // Store the user credentials in localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUsers.find((user) => user.username === username);

    if (userExists) {
      alert("Username already exists! Please choose another.");
    } else {
      existingUsers.push({ username, password });
      localStorage.setItem("users", JSON.stringify(existingUsers));
      alert("Signup successful! Please log in.");
      onSignup(); // Notify parent to switch to login
    }
  };

  return (
    <div className="container">
      <h2>Signup</h2>
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
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

Signup.propTypes = {
  onSignup: PropTypes.func.isRequired,
};

export default Signup;
