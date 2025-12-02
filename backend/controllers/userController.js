import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

// =======================
// REGISTER USER
// =======================
export const registerUser = async (req, res) => {
try {
const { name, email, password, confirmPassword } = req.body;


if (!name || !email || !password || !confirmPassword) {
  return res.status(400).json({ message: "All fields are required" });
}

if (password !== confirmPassword) {
  return res.status(400).json({ message: "Passwords do not match" });
}

const userExists = await User.findOne({ email });
if (userExists) {
  return res.status(400).json({ message: "User already exists" });
}

const hashedPassword = await bcrypt.hash(password, 10);

const user = await User.create({
  name,
  email,
  password: hashedPassword,
});

res.status(201).json({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  token: generateToken(user._id),
});


} catch (error) {
console.error("Register error:", error.message);
res.status(500).json({ message: error.message });
}
};

// =======================
// LOGIN USER
// =======================
export const loginUser = async (req, res) => {
try {
const { email, password } = req.body;


const user = await User.findOne({ email });
if (!user) return res.status(400).json({ message: "Invalid credentials" });

const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

res.json({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  token: generateToken(user._id),
});


} catch (error) {
console.error("Login error:", error.message);
res.status(500).json({ message: error.message });
}
};

// =======================
// GET USER PROFILE
// =======================
export const getUserProfile = async (req, res) => {
try {
const user = await User.findById(req.user._id).select("-password");
if (!user) return res.status(404).json({ message: "User not found" });
res.json(user);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

// =======================
// UPDATE USER PROFILE
// =======================
export const updateUserProfile = async (req, res) => {
try {
const user = await User.findById(req.user._id);
if (!user) return res.status(404).json({ message: "User not found" });


const { name, email, password } = req.body;
if (name) user.name = name;
if (email) user.email = email;
if (password && password.trim() !== "") {
  user.password = await bcrypt.hash(password, 10);
}

const updatedUser = await user.save();

res.json({
  _id: updatedUser._id,
  name: updatedUser.name,
  email: updatedUser.email,
  role: updatedUser.role,
  token: generateToken(updatedUser._id),
});


} catch (error) {
res.status(500).json({ message: error.message });
}
};

// =======================
// ADMIN FUNCTIONS
// =======================

// GET ALL USERS
export const getUsers = async (req, res) => {
try {
const users = await User.find().select("-password");
res.json(users);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

// GET USER BY ID
export const getUserById = async (req, res) => {
try {
const user = await User.findById(req.params.id).select("-password");
if (!user) return res.status(404).json({ message: "User not found" });
res.json(user);
} catch (error) {
res.status(500).json({ message: error.message });
}
};

// UPDATE USER BY ADMIN
export const updateUser = async (req, res) => {
try {
const user = await User.findById(req.params.id);
if (!user) return res.status(404).json({ message: "User not found" });


const { name, email, role } = req.body;
if (name) user.name = name;
if (email) user.email = email;
if (role) user.role = role;

const updatedUser = await user.save();
res.json({
  _id: updatedUser._id,
  name: updatedUser.name,
  email: updatedUser.email,
  role: updatedUser.role,
});


} catch (error) {
res.status(500).json({ message: error.message });
}
};

// DELETE USER BY ADMIN
export const deleteUser = async (req, res) => {
try {
const user = await User.findById(req.params.id);
if (!user) return res.status(404).json({ message: "User not found" });


await user.deleteOne();
res.json({ message: "User deleted successfully" });


} catch (error) {
res.status(500).json({ message: error.message });
}
};
