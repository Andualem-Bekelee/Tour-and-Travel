// src/pages/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login({ setUser, language }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        formData
      );

      const user = res.data;

      // Save user to state & localStorage
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));

      alert(
        language === "en" ? "✅ Login successful!" : "✅ ግባ ተሳክቷል!"
      );

      // Redirect based on admin
      navigate(user.isAdmin ? "/admin" : "/");
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(
        language === "en"
          ? "❌ Login failed. Check credentials."
          : "❌ የግባ ሂደት አልተሳካም። መረጃ ያረጋግጡ።"
      );
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2 style={{ textAlign: "center" }}>{language === "en" ? "Login" : "ግባ"}</h2>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #ccc" }}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 6, border: "1px solid #ccc" }}
        />

        <button
          type="submit"
          style={{ width: "100%", padding: 12, borderRadius: 6, background: "teal", color: "#fff", fontWeight: "bold", cursor: "pointer" }}
        >
          {language === "en" ? "Login" : "ግባ"}
        </button>
      </form>

      <p style={{ marginTop: 10, textAlign: "center" }}>
        <Link to="/forgot-password" style={{ color: "teal", textDecoration: "underline" }}>
          {language === "en" ? "Forgot Password?" : "የሚረሳ ፓስዎርድ?"}
        </Link>
      </p>
    </div>
  );
}
