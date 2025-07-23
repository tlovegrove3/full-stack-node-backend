const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jwt-simple");
const bcrypt = require("bcrypt");
const secret = "supersecret";

//GET /api/user - Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude password field
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

//GET /api/user/:id - Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id, { password: 0 }); // Exclude password field
    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

//POST /api/user - Create new user
router.post("/", async (req, res) => {
  if (!req.body || !req.body.username || !req.body.password) {
    return res.status(400).json({
      error: "Username and password are required",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      status: req.body.status || "active",
    });

    // Save user to database
    await user.save();

    // Generate JWT token
    const token = jwt.encode({ id: user._id }, secret);

    // Respond with user data and token
    res
      .status(201)
      .json({ user: { id: user._id, username: user.username }, token });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

//POST /api/user/login - User login
router.post("/login", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      error: "Username and password are required",
    });
  }

  // Validate user credentials
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // Compare password
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isValidPassword) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    // Generate JWT token
    const token = jwt.encode({ id: user._id }, secret);
    const auth = 1;
    res.json({ username: user.username, token: token, auth: auth });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

module.exports = router;
