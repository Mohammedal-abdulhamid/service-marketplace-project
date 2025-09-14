const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB, sequelize } = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const servicesRoutes = require("./routes/servicesRoutes");
const requestRoutes = require("./routes/requestRoutes");
const messageRoutes = require("./routes/messageRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const profileRoutes = require("./routes/profileRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/payments", paymentRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Server port
const PORT = process.env.PORT || 4000;

// Start server
const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.error("Unable to start server", error.message);
  }
};

startServer();
