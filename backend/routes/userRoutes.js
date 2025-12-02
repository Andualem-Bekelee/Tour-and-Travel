import express from "express";
import {
registerUser,
loginUser,
getUserProfile,
updateUserProfile,
getUsers,
getUserById,
updateUser,
deleteUser
} from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// =======================
// Public Routes (Auth)
// =======================
router.post("/register", registerUser);
router.post("/login", loginUser);

// =======================
// User Profile Routes
// =======================
router.route("/profile")
.get(protect, getUserProfile)
.put(protect, updateUserProfile);

// =======================
// Admin Routes (Protected)
// =======================
router.get("/", protect, adminOnly, getUsers);
router.get("/:id", protect, adminOnly, getUserById);
router.put("/:id", protect, adminOnly, updateUser);
router.delete("/:id", protect, adminOnly, deleteUser);

export default router;
