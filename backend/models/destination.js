import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    country: { type: String },
    image: { type: String },
    description: { type: String }
  },
  { timestamps: true }
);

export default mongoose.model("Destination", destinationSchema);
