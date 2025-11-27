// backend/models/Hotel.js
import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  rooms: [
    {
      name: String,
      capacity: Number,
      price: Number,
    },
  ],
  images: [String],
});

const Hotel = mongoose.model("Hotel", hotelSchema);
export default Hotel;
