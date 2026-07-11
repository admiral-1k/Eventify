const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../config/env");
const userRepository = require("../repository/userRepository");

const generateToken = (id, role) =>
  jwt.sign({ id, role }, env.jwtSecret, {
    expiresIn: "30d",
  });

const register = async ({ fullname, email, password, role, phone, companyName }) => {
  const requestedRole = role === "superadmin" ? "user" : role || "user";
  const accountStatus = requestedRole === "eventor" ? "pending" : "approved";
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepository.create({
    fullname,
    email,
    password: hashedPassword,
    role: requestedRole,
    phone: phone || null,
    companyName: requestedRole === "eventor" ? companyName || fullname : null,
    accountStatus,
  });

  return {
    user: userRepository.toUserDto(user),
    token: generateToken(user.id, user.role),
  };
};

const login = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error("Invalid password");
    error.statusCode = 400;
    throw error;
  }

  return {
    user: userRepository.toUserDto(user),
    token: generateToken(user.id, user.role),
  };
};

const requestPasswordReset = async ({ email }) => {
  const user = await userRepository.findByEmail(email);
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    token: jwt.sign({ email }, env.jwtSecret, { expiresIn: "15m" }),
  };
};

const resetPassword = async ({ token, password }) => {
  let decoded;
  try {
    decoded = jwt.verify(token, env.jwtSecret);
  } catch {
    const error = new Error("Reset link is invalid or expired");
    error.statusCode = 400;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await userRepository.updatePassword(decoded.email, hashedPassword);
};

module.exports = {
  login,
  register,
  requestPasswordReset,
  resetPassword,
};
