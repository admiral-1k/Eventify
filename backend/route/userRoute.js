const express = require("express");
const router = express.Router();

const { forgotPassword, registerUser, loginUser, resetPassword } = require("../controller/usercontroller");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Protected: any logged-in user
// router.get("/profile", authenticate, getProfile);

// Protected: eventor and superadmin only
// router.post("/events", authenticate, authorize("eventor", "superadmin"), createEvent);

// Protected: superadmin only
// router.get("/admin/users", authenticate, authorize("superadmin"), getAllUsers);

module.exports = router;
