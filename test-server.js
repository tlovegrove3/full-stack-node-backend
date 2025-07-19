const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/database");
connectDB();
const Song = require("./models/songs");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Minimal test server working!" });
});

app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
});
