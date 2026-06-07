const pool = require("../database/db");

const createUser = async (fullname, email, password) => {
  const result = await pool.query(
    "INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *",
    [fullname, email, password]
  );

  return result.rows[0];
};

module.exports = { createUser };