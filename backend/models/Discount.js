import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
  value: { type: String, required: true, default: "0%" },
  active: { type: Boolean, default: true },
});

const Discount = mongoose.model("Discount", discountSchema);
export default Discount;
