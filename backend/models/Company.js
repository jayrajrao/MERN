const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true, 
    },
    foundedOn: {
      type: String, 
      required: true,
    },
    companyLogo: {
      type: String,
      default: "https://via.placeholder.com/150", 
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);