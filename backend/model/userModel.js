const userRepository = require("../repository/userRepository");

const createUser = (fullname, email, password, role, phone, companyName, accountStatus) =>
  userRepository.create({
    fullname,
    email,
    password,
    role,
    phone,
    companyName,
    accountStatus,
  });

const getUserByEmail = userRepository.findByEmail;
const getUsersByRole = userRepository.findByRole;

module.exports = {
  createUser,
  getUserByEmail,
  getUsersByRole,
};
