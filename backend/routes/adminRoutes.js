// backend/routes/adminRoutes.js (or login route)
import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/adminlogin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(401).json({ message: "❌ Login failed. Check credentials." });
  if (!user.isAdmin) return res.status(403).json({ message: "❌ Not an admin." });

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return res.status(401).json({ message: "❌ Login failed. Check credentials." });

  res.json({ message: "✅ Admin login successful", user });
});

export default router;
