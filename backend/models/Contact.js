// backend/models/Contact.js
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
});

export default mongoose.model("Contact", contactSchema);
