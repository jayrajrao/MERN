const Company = require("../models/Company.js");
const Review = require("../models/Review");
const mongoose = require("mongoose");

// @desc    Add Company
// @route   POST /api/companies
const addCompany = async (req, res) => {
  try {
    const { companyName, location, foundedOn, city, companyLogo } = req.body;

    if (!companyName || !location || !city || !foundedOn) {
      return res.status(400).json({
        message: "Required fields missing",
      });
    }

    const company = await Company.create({
      companyName,
      location,
      foundedOn,
      city,
      companyLogo,
    });

    res.status(201).json({
      message: "Company added successfully",
      company,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Get All Companies (With Search, Filter & Aggregated Ratings)
// @route   GET /api/companies
const getCompanies = async (req, res) => {
  try {
    const { search, city } = req.query;

    let filter = {};

    // Search By Name
    if (search) {
      filter.companyName = {
        $regex: search,
        $options: "i",
      };
    }

    // Filter By City
    if (city) {
      filter.city = {
        $regex: city,
        $options: "i",
      };
    }

    
    const companies = await Company.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: "reviews", 
          localField: "_id",
          foreignField: "companyId",
          as: "reviewsData",
        },
      },
      {
        $addFields: {
          averageRating: { $avg: "$reviewsData.rating" },
          totalReviews: { $size: "$reviewsData" },
        },
      },
      {
        $project: {
          reviewsData: 0, 
        },
      },
      {
        $sort: { createdAt: -1 }, 
      },
    ]);

    
    const formattedCompanies = companies.map((comp) => ({
      ...comp,
      averageRating: comp.averageRating ? comp.averageRating.toFixed(1) : "0",
    }));

    res.status(200).json(formattedCompanies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Get Single Company (With Aggregated Rating)
// @route   GET /api/companies/:id
const getSingleCompany = async (req, res) => {
  try {
    const { id } = req.params;

    const company = await Company.findById(id);

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
      });
    }

    // Average Rating Aggregation
    const ratingData = await Review.aggregate([
      {
        $match: {
          companyId: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $group: {
          _id: "$companyId",
          averageRating: {
            $avg: "$rating",
          },
          totalReviews: {
            $sum: 1,
          },
        },
      },
    ]);

    res.status(200).json({
      company,
      averageRating: ratingData.length > 0 ? ratingData[0].averageRating.toFixed(1) : 0,
      totalReviews: ratingData.length > 0 ? ratingData[0].totalReviews : 0,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addCompany,
  getCompanies,
  getSingleCompany,
};