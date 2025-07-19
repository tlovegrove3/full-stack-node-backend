const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/database");

// Connect to Database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/songs", require("./routes/songs"));

// Health check route
app.get("/", (req, res) => {
  res.json({
    message: "Songs API is running! 🚀",
    version: "1.0.0",
    status: "healthy",
    endpoints: {
      songs: "/api/songs",
    },
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Internal server error",
  });
});

// 404 handler
app.all("*songs", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    availableRoutes: ["/api/songs"],
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}`);
});
