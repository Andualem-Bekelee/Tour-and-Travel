// backend/routes/contactRoutes.js
import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// GET contact info
router.get("/", async (req, res) => {
  try {
    const contact = await Contact.findOne(); // get first contact
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST (optional, to add/update contact)
router.post("/", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
