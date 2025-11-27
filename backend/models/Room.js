// backend/models/Room.js
import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String }, // path to uploaded image
}, { timestamps: true });

export default mongoose.model("Room", roomSchema);
