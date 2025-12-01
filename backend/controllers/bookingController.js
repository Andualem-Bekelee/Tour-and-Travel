import Booking from "../models/Booking.js";
import Tour from "../models/Tour.js";

// ================================
// CREATE BOOKING
// ================================
export const createBooking = async (req, res) => {
  try {
    const { tourId, userName, userEmail, date, persons, totalPrice } = req.body;

    // Validate required fields
    if (!tourId || !userName || !userEmail || !date || !persons || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Check if the tour exists
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found." });
    }

    // Receipt path
    const receiptPath = req.file ? `/uploads/receipts/${req.file.filename}` : "";

    // Create booking
    const booking = await Booking.create({
      tour: tourId,
      user: req.user ? req.user._id : null, // attach logged-in user if available
      userName,
      userEmail,
      date: new Date(date),
      persons: Number(persons),
      totalPrice: Number(totalPrice),
      receipt: receiptPath,
      status: "Pending",
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (err) {
    console.error("Booking creation error:", err);
    res.status(500).json({
      message: "Error creating booking",
      error: err.message,
    });
  }
};

// ================================
// GET ALL BOOKINGS FOR ADMIN
// ================================
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("tour", "title location price") // populate tour info
      .populate("user", "name email") // populate user info if available
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("Admin get bookings error:", err);
    res.status(500).json({ message: "Error fetching all bookings" });
  }
};

// ================================
// GET USER BOOKINGS
// ================================
export const getUserBookings = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const bookings = await Booking.find({ user: req.user._id })
      .populate("tour", "title location price")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("Get user bookings error:", err);
    res.status(500).json({ message: "Error fetching bookings" });
  }
};

// ================================
// UPDATE BOOKING STATUS (ADMIN)
// ================================
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = status;
    await booking.save();

    res.json({ message: "Booking status updated", booking });
  } catch (err) {
    console.error("Update status error:", err);
    res.status(500).json({ message: "Error updating booking" });
  }
};
