import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import Tour from "../models/Tour.js";

// 🧾 Get dashboard stats
export const getDashboardData = async (req, res) => {
  try {
    const stats = {
      users: await User.countDocuments(),
      tours: await Tour.countDocuments(),
      bookings: await Booking.countDocuments(),
      payments: await Payment.countDocuments(),
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
