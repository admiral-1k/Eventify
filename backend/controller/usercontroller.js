const bcrypt = require("bcrypt");
const { createUser } = require("../model/userModel");

const registerUser = async (req, res) => {
       console.log("REGISTER BODY:", req.body);
  try {
    const { fullname, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(
      fullname,
      email,
      hashedPassword
    );

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Registration Failed",
    });
  }
};

module.exports = { registerUser };