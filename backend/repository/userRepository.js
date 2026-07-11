const pool = require("../config/database");

const toUserDto = (user) => ({
  id: user.id,
  fullname: user.fullname,
  email: user.email,
  role: user.role,
  phone: user.phone,
  companyName: user.company_name,
  accountStatus: user.account_status,
});

const create = async ({
  fullname,
  email,
  password,
  role = "user",
  phone = null,
  companyName = null,
  accountStatus = "approved",
}) => {
  const result = await pool.query(
    "INSERT INTO users (fullname, email, password, role, phone, company_name, account_status) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [fullname, email, password, role, phone, companyName, accountStatus]
  );

  return result.rows[0];
};

const findByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
};

const findByRole = async (role) => {
  const result = await pool.query("SELECT * FROM users WHERE role = $1", [role]);
  return result.rows;
};

const updateAccountStatus = async (id, accountStatus) => {
  const result = await pool.query(
    "UPDATE users SET account_status = $1 WHERE id = $2 RETURNING *",
    [accountStatus, id]
  );

  return result.rows[0];
};

const updatePassword = async (email, password) => {
  const result = await pool.query(
    "UPDATE users SET password = $1 WHERE email = $2 RETURNING *",
    [password, email]
  );

  return result.rows[0];
};

module.exports = {
  create,
  findByEmail,
  findByRole,
  toUserDto,
  updateAccountStatus,
  updatePassword,
};
