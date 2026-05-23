const mongoose = require("mongoose");
const Review = require("../models/Review");

// @desc    Add a Review
// @route   POST /api/reviews
const addReview = async (req, res) => {
  try {
    const { companyId, fullName, subject, reviewText, rating } = req.body;

    // Validation
    if (!companyId || !fullName || !subject || !reviewText || !rating) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const review = await Review.create({
      companyId,
      fullName,
      subject,
      reviewText,
      rating,
    });

    res.status(201).json({
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Get Reviews By Company with Sorting & Aggregation
// @route   GET /api/reviews/:companyId
const getCompanyReviews = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { sortBy } = req.query; // Frontend se aayega (date, rating_high, rating_low, relevance)

    // 1. Sorting Logic Setup
    let sortOptions = { createdAt: -1 }; // Default: Newest first

    if (sortBy === "rating_high") {
      sortOptions = { rating: -1 };
    } else if (sortBy === "rating_low") {
      sortOptions = { rating: 1 };
    } else if (sortBy === "relevance") {
      sortOptions = { likes: -1 }; // Likes jiske zyada, wo zyada relevant
    }

    // 2. Fetch Sorted Reviews
    const reviews = await Review.find({ companyId }).sort(sortOptions);

    // 3. MongoDB Aggregation for Average Rating & Total Reviews
    const ratingData = await Review.aggregate([
      {
        $match: {
          companyId: new mongoose.Types.ObjectId(companyId),
        },
      },
      {
        $group: {
          _id: "$companyId",
          averageRating: { $avg: "$rating" },
          totalReviews: { $sum: 1 },
        },
      },
    ]);

    // 4. Send Response
    res.status(200).json({
      reviews,
      averageRating: ratingData.length > 0 ? ratingData[0].averageRating.toFixed(1) : "0",
      totalReviews: ratingData.length > 0 ? ratingData[0].totalReviews : 0,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Like a Review
// @route   PATCH /api/reviews/like/:id
const likeReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.status(200).json({
      message: "Review liked successfully",
      review,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addReview,
  getCompanyReviews,
  likeReview,
};