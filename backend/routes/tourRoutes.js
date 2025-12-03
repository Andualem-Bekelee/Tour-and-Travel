import express from "express";
import { createTour, getTours, getTourById, updateTour, deleteTour } from "../controllers/tourController.js";
import { upload } from "../middleware/Upload.js";

const router = express.Router();

// Admin adds tour -> handle multiple images
router.post("/", upload.array("images"), createTour);

// Other routes
router.get("/", getTours);
router.get("/:id", getTourById);
router.put("/:id", upload.array("images"), updateTour);
router.delete("/:id", deleteTour);

export default router;
