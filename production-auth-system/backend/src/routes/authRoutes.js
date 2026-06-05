const express = require("express");

const authController = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const {
  authLimiter,
  forgotPasswordLimiter,
} = require("../middleware/rateLimiter");

const router = express.Router();

router.post("/register", authLimiter, authController.register);
router.get("/verify-email/:token", authController.verifyEmail);

router.post("/login", authLimiter, authController.login);
router.post("/google", authLimiter, authController.googleAuth);

router.post(
  "/forgot-password",
  forgotPasswordLimiter,
  authController.forgotPassword,
);

router.post(
  "/reset-password/:token",
  authLimiter,
  authController.resetPassword,
);

router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);

router.get("/me", protect, authController.getMe);

module.exports = router;
