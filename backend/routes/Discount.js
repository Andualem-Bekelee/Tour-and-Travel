import express from "express";
import Discount from "../models/Discount.js";

const router = express.Router();

// Get current discount
router.get("/", async (req, res) => {
  try {
    let discount = await Discount.findOne({ active: true });
    if (!discount) {
      discount = new Discount({ value: "0%", active: true });
      await discount.save();
    }
    res.json(discount);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Admin updates discount
router.put("/:id", async (req, res) => {
  try {
    const discount = await Discount.findByIdAndUpdate(
      req.params.id,
      { value: req.body.value },
      { new: true }
    );
    if (!discount) return res.status(404).json({ message: "Discount not found" });
    res.json(discount);
  } catch (err) {
    res.status(500).json({ message: "Failed to update discount." });
  }
});

export default router;
