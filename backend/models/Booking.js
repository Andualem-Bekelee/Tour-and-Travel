import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
      required: true,
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: false, // optional
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: false, // optional
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Basic Info
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },

    // Booking Details
    arrivalDate: { type: Date, required: true },
    nights: { type: Number, default: 1 },
    adults: { type: Number, default: 1 },
    children: { type: Number, default: 0 },
    totalGuests: { type: Number, default: 1 },
    totalPrice: { type: Number, default: 0 },

    specialRequests: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
