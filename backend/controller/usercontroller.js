const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, getUserByEmail } = require("../model/userModel");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'supersecretkey', {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res) => {
  console.log("REGISTER BODY:", req.body);

  try {
    const { fullname, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(
      fullname,
      email,
      hashedPassword,
      role
    );

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role
      },
      token: generateToken(user.id, user.role)
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Registration Failed",
    });
  }
};

const loginUser = async (req, res) => {
  console.log("LOGIN BODY:", req.body);

  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        role: user.role
      },
      token: generateToken(user.id, user.role)
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};