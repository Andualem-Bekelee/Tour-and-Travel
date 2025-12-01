import express from "express";
import {
  createBooking,
  getUserBookings,
  getAllBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { uploadBookingReceipt } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// PUBLIC — Create booking (guest or logged-in user)
router.post("/", uploadBookingReceipt.single("receipt"), createBooking);

// USER — Get their own bookings
router.get("/my-bookings", protect, getUserBookings);

// ADMIN — Get all bookings
router.get("/", protect, adminOnly, getAllBookings);

// ADMIN — Update booking status
router.put("/:id/status", protect, adminOnly, updateBookingStatus);

export default router;
