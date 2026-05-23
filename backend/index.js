const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

const companyRoutes = require("./routes/companyRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

dotenv.config();

connectDB();

const app = express();




app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ extended: true }));




// Routes
app.use("/api/companies", companyRoutes);

app.use("/api/reviews", reviewRoutes);




// Health Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Running Successfully",
  });
});




// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});