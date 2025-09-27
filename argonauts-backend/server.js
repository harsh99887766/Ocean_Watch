const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./config/db"); // import the pool
const argoRoutes = require("./routes/argoRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Test route to fetch some data
app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM argos LIMIT 5"); // replace table name if needed
    res.json(result.rows);
  } catch (err) {
    console.error("DB Error:", err);
    res.status(500).send("Database query error");
  }
});

app.use("/api/argos", argoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
