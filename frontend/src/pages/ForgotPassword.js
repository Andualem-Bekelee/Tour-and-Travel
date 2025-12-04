// src/pages/ForgotPassword.js
import React, { useState } from "react";
import axios from "axios";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetLink, setResetLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setResetLink("");

    try {
      const res = await axios.post(`${process.env.API_URL}/users/forgot-password`, { email });
      setMessage(res.data.message);
      setResetLink(res.data.resetLink); // store reset link
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2 style={{ textAlign: "center" }}>Forgot Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #ccc" }}
        />
        <button type="submit" style={{ width: "100%", padding: 12, borderRadius: 6, background: "teal", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>
          Send Reset Link
        </button>
      </form>

      {message && <p style={{ marginTop: 10 }}>{message}</p>}

      {resetLink && (
        <p style={{ marginTop: 10 }}>
          Click here to reset your password:{" "}
          <a href={resetLink} target="_blank" rel="noopener noreferrer" style={{ color: "teal" }}>
            {resetLink}
          </a>
        </p>
      )}
    </div>
  );
}
