import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";
import { upload } from "../middleware/uploadMiddleware.js";

// 💰 Upload payment receipt
export const uploadPayment = async (req, res) => {
  try {
    const { bookingId, amount } = req.body;
    if (!req.file) return res.status(400).json({ message: "Receipt is required" });

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const payment = await Payment.create({
      booking: bookingId,
      user: req.user._id,
      receipt: req.file.path,
      amount,
    });

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🧾 Get payment history for a user
export const getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id }).populate("booking");
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
