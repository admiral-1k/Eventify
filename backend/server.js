const express = require("express");
const cors = require("cors");
const pool = require("./database/db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Database Connected",
      time: result.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Database Error",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});