// backend/routes/bookingRoutes.js
import express from "express";
import { createBooking, getBookings, getUserBookings, cancelBooking } from "../controllers/bookingController.js";

const router = express.Router();

// Create a booking
router.post("/", createBooking);

// Get all bookings (admin)
router.get("/", getBookings);

// Get bookings for a specific user
router.get("/user/:userId", getUserBookings);

// Cancel a booking
router.delete("/:id", cancelBooking);

export default router;
