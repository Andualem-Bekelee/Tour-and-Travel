// backend/models/Tour.js
import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }], // array of filenames
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
