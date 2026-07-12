const express = require("express");
const cors = require("cors");
const pool = require("./config/database");
const env = require("./config/env");
const userRoute = require("./route/userRoute");
const eventRoute = require("./route/eventRoute");

const createApp = () => {
  const app = express();

  app.use(
    cors({
      origin: env.clientUrl,
      credentials: true,
    })
  );
  app.use(express.json());

  app.use("/api/users", userRoute);
  app.use("/api/events", eventRoute);

  app.get("/", async (req, res) => {
    try {
      const result = await pool.query("SELECT NOW()");

      res.json({
        success: true,
        message: "Database Connected",
        time: result.rows[0],
      });
    } catch (error) {
      res.status(503).json({
        success: false,
        message: "API server is running, but database connection failed.",
        error: error.message,
      });
    }
  });

  app.get("/api/health", async (req, res) => {
    try {
      const result = await pool.query("SELECT NOW()");

      res.json({
        success: true,
        api: "ok",
        database: "ok",
        time: result.rows[0],
      });
    } catch (error) {
      res.status(503).json({
        success: false,
        api: "ok",
        database: "error",
        error: error.message,
      });
    }
  });

  return app;
};

module.exports = createApp;
