const express = require("express");
const router = express.Router();

const {
  addCompany,
  getCompanies,
  getSingleCompany,
} = require("../controllers/companyController");


// Add Company
router.post("/", addCompany);


// Get All Companies
router.get("/", getCompanies);


// Get Single Company
router.get("/:id", getSingleCompany);


module.exports = router;