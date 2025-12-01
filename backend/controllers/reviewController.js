import Review from "../models/Review.js";
import Booking from "../models/Booking.js";
import Tour from "../models/Tour.js";

export const submitReview = async (req, res) => {
  try {
    const { tourId, rating, comment } = req.body;

    // Validate
    if (!rating || !comment)
      return res.status(400).json({ message: "Rating & comment are required" });

    // Check if user completed the tour
    const completedBooking = await Booking.findOne({
      user: req.user._id,
      tour: tourId,
      status: "Approved",
    });

    if (!completedBooking)
      return res.status(403).json({
        message: "You can only review after completing the tour.",
      });

    // Create review
    const review = await Review.create({
      tour: tourId,
      user: req.user._id,
      rating,
      comment,
    });

    // Add review to tour
    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: review._id },
    });

    res.status(201).json({
      message: "Review submitted (waiting for admin approval)",
      review,
    });
  } catch (err) {
    console.error("Review error:", err);
    res.status(500).json({ message: "Error submitting review" });
  }
};

export const approveReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { new: true }
    );

    // Recalculate average rating
    const tour = await Tour.findById(review.tour).populate("reviews");

    const approvedReviews = tour.reviews.filter(r => r.status === "Approved");
    const avg =
      approvedReviews.reduce((sum, r) => sum + r.rating, 0) /
      approvedReviews.length;

    await Tour.findByIdAndUpdate(review.tour, { averageRating: avg });

    res.json({ message: "Review approved", review });
  } catch (err) {
    res.status(500).json({ message: "Error approving review" });
  }
};


export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) return res.status(404).json({ message: "Review not found" });

    await Review.findByIdAndDelete(review._id);

    // Remove from tour
    await Tour.findByIdAndUpdate(review.tour, {
      $pull: { reviews: review._id },
    });

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting review" });
  }
};
