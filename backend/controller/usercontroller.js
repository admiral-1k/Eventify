const authService = require("../service/authService");

const registerUser = async (req, res) => {
  try {
    const { user, token } = await authService.register(req.body);

    res.status(201).json({
      success: true,
      message:
        user.role === "eventor"
          ? "Event manager account registered. Waiting for super admin verification."
          : "User Registered Successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Registration Failed",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { user, token } = await authService.login(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { token } = await authService.requestPasswordReset(req.body);
    res.json({
      success: true,
      message: "Reset token generated.",
      token,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Could not create reset token",
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    await authService.resetPassword(req.body);
    res.json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Password reset failed",
    });
  }
};

module.exports = {
  forgotPassword,
  registerUser,
  loginUser,
  resetPassword,
};
