// import Tour from "../models/Tour.js";

// // ----------------------
// // Create new Tour
// // ----------------------
// export const createTour = async (req, res) => {
//   try {
//     console.log("req.user:", req.user);
//     console.log("req.body:", req.body);
//     console.log("req.files:", req.files);

//     // Map uploaded files to URLs
//     const images = req.files ? req.files.map(file => `/uploads/tours/${file.filename}`) : [];

//     // Parse numeric fields
//     const duration = Number(req.body.duration) || 0;
//     const price = Number(req.body.price) || 0;

//     // Parse available dates array
//     const availableDates = req.body.availableDates
//       ? req.body.availableDates.split(",").map(date => new Date(date.trim()))
//       : [];

//     const tour = await Tour.create({
//       title: req.body.title,
//       description: req.body.description,
//       category: req.body.category || "General",
//       duration,
//       price,
//       itinerary: req.body.itinerary || "",
//       location: req.body.location,
//       images,
//       availableDates,
//     });

//     console.log("Tour created:", tour);
//     res.status(201).json(tour);
//   } catch (error) {
//     console.error("Create tour error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // ----------------------
// // Get all tours
// // ----------------------
// // export const getTours = async (req, res) => {
// //   try {
// //     const tours = await Tour.find();
// //     res.json(tours);
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// export const getTours = async (req, res) => {
//   try {
//     const { location, category, date } = req.query;
//     const filter = {};

//     if (location) filter.location = { $regex: location, $options: "i" };
//     if (category) filter.category = { $regex: category, $options: "i" };
//     if (date) {
//       const tourDate = new Date(date);
//       filter.date = { $gte: tourDate }; // tours starting from selected date
//     }

//     const tours = await Tour.find(filter).sort({ createdAt: -1 });
//     res.json(tours);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Error fetching tours" });
//   }
// };

// // ----------------------
// // Get single tour
// // ----------------------
// export const getTour = async (req, res) => {
//   try {
//     const tour = await Tour.findById(req.params.id);
//     if (!tour) return res.status(404).json({ message: "Tour not found" });
//     res.json(tour);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // update tour
// export const updateTour = async (req, res) => {
//   try {
//     const tour = await Tour.findById(req.params.id);
//     if (!tour) return res.status(404).json({ message: "Tour not found" });

//     // Handle images
//     const newImages = req.files ? req.files.map(file => `/uploads/tours/${file.filename}`) : [];
//     const keepImages = req.body.keepImages ? JSON.parse(req.body.keepImages) : [];
//     const allImages = [...keepImages, ...newImages];

//     // Update tour fields
//     tour.title = req.body.title || tour.title;
//     tour.description = req.body.description || tour.description;
//     tour.location = req.body.location || tour.location;
//     tour.price = req.body.price !== undefined ? Number(req.body.price) : tour.price;
//     tour.duration = req.body.duration !== undefined ? Number(req.body.duration) : tour.duration;
//     tour.images = allImages;

//     // Save updated tour
//     await tour.save();

//     res.status(200).json(tour);
//   } catch (error) {
//     console.error("Update tour error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // ----------------------
// // Delete tour
// // ----------------------
// export const deleteTour = async (req, res) => {
//   try {
//     const tour = await Tour.findByIdAndDelete(req.params.id);

//     if (!tour) {
//       return res.status(404).json({ message: "Tour not found" });
//     }

//     res.json({ message: "Tour deleted successfully" });
//   } catch (error) {
//     console.error("Delete tour error:", error);
//     res.status(500).json({ message: "Error deleting tour", error });
//   }
// };
import Tour from "../models/Tour.js";

//    Admin functions

// create tour

export const createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);

    res.status(201).json({
      message: "Tour created successfully",
      tour,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//update tour
export const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!tour) return res.status(404).json({ message: "Tour not found" });

    res.json({ message: "Tour updated", tour });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// delete tour
export const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour) return res.status(404).json({ message: "Tour not found" });

    await tour.deleteOne();
    res.json({ message: "Tour deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Public functions

// get all tours with filters

export const getTours = async (req, res) => {
  try {
const { category, minPrice, maxPrice, country, city, date } = req.query;

const filters = {};

if (category) filters.category = category;
if (country) filters["destination.country"] = country;
if (city) filters["destination.city"] = city;

if (minPrice || maxPrice) {
  filters.price = {};
  if (minPrice) filters.price.$gte = minPrice;
  if (maxPrice) filters.price.$lte = maxPrice;
}

// Filter by availableDates
if (date) {
  filters.availableDates = { $gte: new Date(date) }; // only tours with available dates >= selected date
}

const tours = await Tour.find(filters).sort({ createdAt: -1 });


    res.json(tours);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// get tour by id
export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour) return res.status(404).json({ message: "Tour not found" });

    res.json(tour);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// search tours
// export const searchTours = async (req, res) => {
//   try {
//     const keyword = req.query.keyword
//       ? {
//           title: { $regex: req.query.keyword, $options: "i" },
//         }
//       : {};

//     const tours = await Tour.find(keyword);
//     res.json(tours);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

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
    res.status(400).json({ message: error.message });
  }
};


