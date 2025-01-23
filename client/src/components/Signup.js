import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8003/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.status === 201) {
      alert("Signup successful!");
      navigate("/login"); // Redirect to login
    } else {
      alert(data.message || "Signup failed");
    }
  };

  // Inline styles object
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
      <h2>Signup</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        required
        style={inputStyles}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
        style={inputStyles}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
        style={inputStyles}
      />
      <button type="submit" style={buttonStyles}>
        Signup
      </button>
    </form>
  );
};

export default Signup;
