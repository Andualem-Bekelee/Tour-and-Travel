import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

// CRA environment variable
const API_URL = process.env.REACT_APP_API_URL;

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/users/login`, { email, password });
      const user = res.data;

      // Save token and user info
      localStorage.setItem("token", user.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.role === "admin",
        })
      );

      if (onLogin)
        onLogin({
          userId: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.role === "admin",
          token: user.token,
        });

      console.log("User role:", user.role);

      // ✅ Correct admin redirect
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }

    } catch (err) {
      setError(err.response?.data?.message || "❌ Login failed. Check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border px-3 py-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border px-3 py-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="mt-4 text-center">
        <Link to="/forgot-password" className="text-blue-600 hover:underline">
          Forgot Password?
        </Link>
      </p>
    </div>
  );
};

export default Login;
