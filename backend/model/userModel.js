const pool = require("../database/db");

const createUser = async (fullname, email, password, role = "user") => {
  const result = await pool.query(
    "INSERT INTO users (fullname, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
    [fullname, email, password, role]
  );

  return result.rows[0];
};
const getUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

module.exports = { createUser,
    getUserByEmail,
 };