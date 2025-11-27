import Booking from "../models/Booking.js";
import Tour from "../models/Tour.js";

// -------------------
// Create a new booking
// -------------------
export const createBooking = async (req, res) => {
  try {
    const {
      tourId,
      userId,
      name,
      email,
      phone,
      arrivalDate,
      nights,
      adults,
      children,
      totalGuests,
      totalPrice,
      specialRequests,
    } = req.body;

    if (!userId) return res.status(400).json({ message: "User ID is required" });

    const tour = await Tour.findById(tourId);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    const newBooking = new Booking({
      tourId,
      userId,
      name,
      email,
      phone,
      arrivalDate,
      nights,
      adults,
      children,
      totalGuests,
      totalPrice,
      specialRequests,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    console.error("Booking error:", err.message);
    res.status(500).json({ message: "Booking failed", error: err.message });
  }
};

// -------------------
// Get all bookings (admin)
// -------------------
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("tourId")
      .populate("userId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -------------------
// Get bookings for a specific user
// -------------------
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate("tourId")
      .populate("userId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// -------------------
// Cancel a booking
// -------------------
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "cancelled";
    await booking.save();

    res.json({ message: "Booking cancelled successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
