const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controller/usercontroller");
const { authenticate, authorize } = require("../middleware/authMiddleware");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected: any logged-in user
// router.get("/profile", authenticate, getProfile);

// Protected: eventor and superadmin only
// router.post("/events", authenticate, authorize("eventor", "superadmin"), createEvent);

// Protected: superadmin only
// router.get("/admin/users", authenticate, authorize("superadmin"), getAllUsers);

module.exports = router;