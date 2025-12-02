// backend/controllers/tourController.js
import Tour from "../models/Tour.js";

// ================================
// Create Tour
// ================================
export const createTour = async (req, res) => {
  try {
    const images = req.files ? req.files.map(file => `/uploads/tours/${file.filename}`) : [];

    const itinerary = req.body.itinerary ? JSON.parse(req.body.itinerary) : [];
    const destination = req.body.destination ? JSON.parse(req.body.destination) : {};
    const availableDates = req.body.availableDates
      ? JSON.parse(req.body.availableDates).map(d => new Date(d))
      : [];

    const newTour = await Tour.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      duration: Number(req.body.duration),
      price: Number(req.body.price),
      itinerary,
      destination,
      location: req.body.location,
      images,
      availableDates,
    });

    res.status(201).json({ message: "Tour created successfully", tour: newTour });
  } catch (error) {
    console.error("Create Tour Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================================
// Get All Tours
// ================================
export const getTours = async (req, res) => {
  try {
    const tours = await Tour.find().sort({ createdAt: -1 });
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================================
// Get Single Tour
// ================================
export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================================
// Update Tour
// ================================
export const updateTour = async (req, res) => {
  try {
    const newImages = req.files ? req.files.map(file => `/uploads/tours/${file.filename}`) : [];
    const keepImages = req.body.keepImages ? JSON.parse(req.body.keepImages) : [];

    const itinerary = req.body.itinerary ? JSON.parse(req.body.itinerary) : [];
    const destination = req.body.destination ? JSON.parse(req.body.destination) : {};
    const availableDates = req.body.availableDates
      ? JSON.parse(req.body.availableDates).map(d => new Date(d))
      : [];

    const updatedTour = await Tour.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        images: [...keepImages, ...newImages],
        itinerary,
        destination,
        availableDates,
      },
      { new: true }
    );

    if (!updatedTour) return res.status(404).json({ message: "Tour not found" });

    res.json({ message: "Tour updated successfully", tour: updatedTour });
  } catch (error) {
    console.error("Update Tour Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================================
// Delete Tour
// ================================
export const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });

    await tour.deleteOne();
    res.json({ message: "Tour deleted successfully" });
  } catch (error) {
    console.error("Delete Tour Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ================================
// Search Tours
// ================================
export const searchTours = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          $or: [
            { title: { $regex: req.query.keyword, $options: "i" } },
            { description: { $regex: req.query.keyword, $options: "i" } },
            { "itinerary.title": { $regex: req.query.keyword, $options: "i" } },
          ],
        }
      : {};

    const tours = await Tour.find(keyword);
    res.json(tours);
  } catch (error) {
    console.error("Search Tours Error:", error);
    res.status(500).json({ message: error.message });
  }
};
