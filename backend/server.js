const express = require("express");
const cors = require("cors");
const pool = require("./database/db");
const userRoute = require("./route/userRoute");
const seedSuperAdmin = require("./utils/seedAdmin");

const app = express();

app.use(cors());
app.use(express.json());
app.post("/test", (req, res) => {
  console.log("TEST BODY:", req.body);
  res.json(req.body);
}); // IMPORTANT

app.use("/api/users", userRoute);

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      message: "Database Connected",
      time: result.rows[0],
    });
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await seedSuperAdmin();
});