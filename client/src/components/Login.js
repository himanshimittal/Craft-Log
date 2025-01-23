import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login credentials:", credentials); // Debugging log

    const res = await fetch("http://localhost:8003/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();
    console.log("Response data:", data); // Debugging log

    if (res.status === 200) {
      localStorage.setItem("token", data.token); // Store JWT token in localStorage
      alert("Login successful!");
      navigate("/"); // Redirect to home page
    } else {
      alert(data.message || "Invalid login credentials");
    }
  };

  // Inline styles (same as Signup page for consistency)
  const formStyles = {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  };

  const inputStyles = {
    display: "block",
    margin: "10px 0",
    width: "100%",
    padding: "8px",
    boxSizing: "border-box",
  };

  const buttonStyles = {
    display: "block",
    margin: "10px 0",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <form onSubmit={handleSubmit} style={formStyles}>
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={credentials.email}
        onChange={handleChange}
        required
        style={inputStyles}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleChange}
        required
        style={inputStyles}
      />
      <button type="submit" style={buttonStyles}>
        Login
      </button>
    </form>
  );
};

export default Login;
