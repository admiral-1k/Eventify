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

  });

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

  });

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

    });

  });

  describe("resetPassword", () => {

    test("should reset password successfully", async () => {

      authService.resetPassword.mockResolvedValue();

      req.body = {
        token: "reset123",
        password: "newpassword",
      };

      await resetPassword(req, res);

      expect(authService.resetPassword).toHaveBeenCalled();

    });

  });

});