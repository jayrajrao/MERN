const express = require("express");
const router = express.Router();

const {
  addReview,
  getCompanyReviews,
  likeReview,
} = require("../controllers/reviewController");

router.post("/", addReview);

router.get("/:companyId", getCompanyReviews);

router.patch("/like/:id", likeReview);

module.exports = router;