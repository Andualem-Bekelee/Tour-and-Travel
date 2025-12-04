// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function AdminLogin({ onLogin, language }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await axios.post("http://192.168.228.220:5000/api/users/login", { email, password });
//       localStorage.setItem("adminToken", res.data.userId); // simple token
//       onLogin(true);
//       alert(language === "en" ? "✅ Login successful!" : "✅ ግባ ተሳክቷል!");
//       navigate("/admin");
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       setError(language === "en" ? "❌ Login failed" : "❌ የግባ ሂደት አልተሳካም");
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
//       <h2 style={{ textAlign: "center" }}>{language === "en" ? "Admin Login" : "አስተዳደር ግባ"}</h2>
//       {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <label>Email:</label>
//         <input value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: "100%", padding: 10, marginBottom: 10 }} />
//         <label>Password:</label>
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: "100%", padding: 10, marginBottom: 10 }} />
//         <button type="submit" style={{ width: "100%", padding: 12, background: "teal", color: "#fff", fontWeight: "bold", cursor: "pointer" }}>
//           {language === "en" ? "Login" : "ግባ"}
//         </button>
//       </form>
//     </div>
//   );
// }
