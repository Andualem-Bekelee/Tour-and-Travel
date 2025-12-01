// src/pages/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL; // ✅ from .env

export default function Login({ onLogin, language }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_URL}/users/login`,
        formData
      );

      const user = res.data;

      // ✅ SAVE JWT TOKEN
      localStorage.setItem("token", user.token);

      // ✅ SAVE USER INFO (no password)
      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: user.userId,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        })
      );

      if (onLogin) onLogin(user);

      alert(
        language === "en"
          ? "✅ Login successful!"
          : "✅ ግባ ተሳክቷል!"
      );

      navigate(user.isAdmin ? "/admin" : "/");
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "❌ Login failed. Check credentials.";

      setError(
        language === "en"
          ? msg
          : "❌ የግባ ሂደት አልተሳካም። መረጃ ያረጋግጡ።"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20 }}>
      <h2 style={{ textAlign: "center" }}>
        {language === "en" ? "Login" : "ግባ"}
      </h2>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading
            ? language === "en"
              ? "Logging in..."
              : "በመግባት..."
            : language === "en"
            ? "Login"
            : "ግባ"}
        </button>
      </form>

      <p style={{ marginTop: 10, textAlign: "center" }}>
        <Link to="/forgot-password">
          {language === "en" ? "Forgot Password?" : "የሚረሳ ፓስዎርድ?"}
        </Link>
      </p>
    </div>
  );
}
