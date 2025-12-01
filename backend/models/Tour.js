// import mongoose from "mongoose";

// const tourSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     category: { type: String, required: true },
//     duration: { type: Number, required: true },
//     price: { type: Number, required: true },
//     images: [String],
//     itinerary: { type: String },
//     availableDates: [Date],
//     location: { type: String, required: true },
//     avgRating: { type: Number, default: 0 },
//     reviewCount: { type: Number, default: 0 },
//       },
//   { timestamps: true }
// );

// const Tour = mongoose.model("Tour", tourSchema);
// export default Tour;

import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    images: {
      type: [String], // stored as URLs or file names
      required: true,
    },

    description: { type: String, required: true },

    itinerary: [
      {
        day: Number,
        title: String,
        description: String,
      }
    ],

    category: {
      type: String,
      enum: ["Adventure", "Historical", "Nature", "City Tour", "Cultural"],
      required: true,
    },

    duration: { type: Number, required: true }, // in days

    price: { type: Number, required: true },

    destination: {
      country: { type: String, required: true },
      city: { type: String, required: true }
    },

    availableDates: {
      type: [Date],
      required: true,
    },

    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);



