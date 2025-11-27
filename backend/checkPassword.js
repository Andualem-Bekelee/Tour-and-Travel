import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js"; // Adjust path if needed

const MONGO_URI = "mongodb://127.0.0.1:27017/tour-travel-platformm";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const testLogin = async () => {
  const email = "test@example.com";
  const password = "Test1234"; // <-- this must be your plain password

  const user = await User.findOne({ email });
  if (!user) return console.log("❌ User not found");

  console.log("User found:", user);

  const isMatch = await bcrypt.compare(password, user.password);
  console.log("Password match:", isMatch ? "✅ Match" : "❌ Not match");

  process.exit(0);
};

testLogin();
