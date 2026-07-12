const authService = require("../service/authService");

jest.mock("../service/authService");

const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require("../controller/usercontroller");

describe("User Controller Tests", () => {

  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();
  });

  // ---------------- Register ----------------

  describe("registerUser", () => {

    test("should register user successfully", async () => {

      authService.register.mockResolvedValue({
        user: { role: "user" },
        token: "abc123",
      });

      req.body = {
        name: "Biken",
        email: "biken@test.com",
        password: "123456",
      };

      await registerUser(req, res);

      expect(authService.register).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);

    });

    test("should return error if registration fails", async () => {

      authService.register.mockRejectedValue({
        statusCode: 400,
        message: "Registration Failed",
      });

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Registration Failed",
      });

    });

  });

  // ---------------- Login ----------------

  describe("loginUser", () => {

    test("should login successfully", async () => {

      authService.login.mockResolvedValue({
        user: {},
        token: "token123",
      });

      req.body = {
        email: "biken@test.com",
        password: "123456",
      };

      await loginUser(req, res);

      expect(authService.login).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);

    });

    test("should return error if login fails", async () => {

      authService.login.mockRejectedValue({
        statusCode: 401,
        message: "Invalid credentials",
      });

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(401);

      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: "Invalid credentials",
      });

    });

  });

  // ---------------- Forgot Password ----------------

  describe("forgotPassword", () => {

    test("should generate reset token", async () => {

      authService.requestPasswordReset.mockResolvedValue({
        token: "reset123",
      });

      req.body = {
        email: "biken@test.com",
      };

      await forgotPassword(req, res);

      expect(authService.requestPasswordReset).toHaveBeenCalled();

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Reset token generated.",
        token: "reset123",
      });

    });

  });

  // ---------------- Reset Password ----------------

  describe("resetPassword", () => {

    test("should reset password successfully", async () => {

      authService.resetPassword.mockResolvedValue();

      req.body = {
        token: "reset123",
        password: "newpassword",
      };

      await resetPassword(req, res);

      expect(authService.resetPassword).toHaveBeenCalled();

      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: "Password reset successfully.",
      });

    });

  });

});