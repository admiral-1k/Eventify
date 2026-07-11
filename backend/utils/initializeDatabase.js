const fs = require("fs");
const path = require("path");
const pool = require("../config/database");

const initializeDatabase = async () => {
  const setupPath = path.join(__dirname, "..", "setup.sql");
  const setupSql = fs.readFileSync(setupPath, "utf8");

  await pool.query(setupSql);
  console.log("Database schema ready.");
};

module.exports = initializeDatabase;
