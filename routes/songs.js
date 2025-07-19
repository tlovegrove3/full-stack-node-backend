const express = require("express");
const router = express.Router();
const Song = require("../models/songs");

// GET /api/songs - Get all songs
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: songs.length,
      data: songs,
    });
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET /api/songs/:id - Get single song
router.get("/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).json({
        success: false,
        error: "Song not found",
      });
    }
    res.json({
      success: true,
      data: song,
    });
  } catch (error) {
    console.error("Error fetching song:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST /api/songs - Create new song
router.post("/", async (req, res) => {
  try {
    const {
      title,
      artist,
      popularity,
      releaseDate = Date.now(),
      genre = [],
      createdAt = Date.now(),
      updatedAt = Date.now(),
    } = req.body;

    // Basic validation
    if (!title || !artist) {
      return res.status(400).json({
        success: false,
        error: "Fields are required: title, artist",
      });
    }

    // Validate and process genre array
    let processedGenre = [];
    if (Array.isArray(genre)) {
      processedGenre = genre
        .filter((g) => g && typeof g === "string")
        .map((g) => g.trim());
    } else if (typeof genre === "string" && genre.trim()) {
      processedGenre = [genre.trim()];
    }

    const newSong = new Song({
      title: title.trim(),
      artist: artist.trim(),
      popularity: popularity,
      releaseDate: releaseDate,
      genre: processedGenre,
      createdAt: createdAt,
      updatedAt: updatedAt,
    });

    const savedSong = await newSong.save();
    res.status(201).json({
      success: true,
      message: "Song created successfully",
      data: savedSong,
    });
  } catch (error) {
    console.error("Error creating song:", error);
    if (error.code === 11000) {
      res.status(400).json({
        success: false,
        error: "Song title already exists",
      });
    } else if (error.name === "ValidationError") {
      res.status(400).json({
        success: false,
        error: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Failed to create song",
      });
    }
  }
});

// PUT /api/songs/:id - Update song
router.put("/:id", async (req, res) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedSong) {
      return res.status(404).json({
        success: false,
        error: "Song not found",
      });
    }

    res.json({
      success: true,
      message: "Song updated successfully",
      data: updatedSong,
    });
  } catch (error) {
    console.error("Error updating song:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// DELETE /api/songs/:id - Delete song
router.delete("/:id", async (req, res) => {
  try {
    const deletedSong = await Song.findByIdAndDelete(req.params.id);

    if (!deletedSong) {
      return res.status(404).json({
        success: false,
        error: "Song not found",
      });
    }

    res.json({
      success: true,
      message: "Song deleted successfully",
      data: deletedSong,
    });
  } catch (error) {
    console.error("Error deleting song:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
