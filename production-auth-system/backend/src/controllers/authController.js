const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const hashToken = require("../utils/hashToken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateTokens");
const {
  sendRefreshCookie,
  clearRefreshCookie,
} = require("../utils/sendCookie");
const { addEmailJob } = require("../jobs/emailQueue");
const {
  verificationEmailTemplate,
  welcomeEmailTemplate,
  resetPasswordTemplate,
} = require("../utils/emailTemplates");

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const createAndSendTokens = async (user, statusCode, res) => {
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  user.lastLoginAt = new Date();

  await user.save({ validateBeforeSave: false });

  sendRefreshCookie(res, refreshToken);

  res.status(statusCode).json({
    success: true,
    accessToken,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      authProvider: user.authProvider,
      isEmailVerified: user.isEmailVerified,
    },
  });
};

exports.register = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    res.status(400);
    throw new Error("Full name, email and password are required");
  }

  if (password.length < 8) {
    res.status(400);
    throw new Error("Password must be at least 8 characters");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(409);
    throw new Error("User already exists");
  }

  const user = await User.create({
    fullName,
    email,
    password,
    authProvider: "local",
    isEmailVerified: false,
  });

  const rawVerifyToken = user.createEmailVerificationToken();
  await user.save({ validateBeforeSave: false });

  const verifyUrl = `${process.env.BACKEND_URL}/api/auth/verify-email/${rawVerifyToken}`;

  await addEmailJob({
    to: user.email,
    subject: "Verify your account",
    html: verificationEmailTemplate({
      name: user.fullName,
      verifyUrl,
    }),
  });

  res.status(201).json({
    success: true,
    message: "Account created. Please check your email to verify your account.",
  });
});

exports.verifyEmail = asyncHandler(async (req, res) => {
  const hashedToken = hashToken(req.params.token);

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired verification link");
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpire = undefined;

  await user.save({ validateBeforeSave: false });

  await addEmailJob({
    to: user.email,
    subject: "Welcome to Production Auth",
    html: welcomeEmailTemplate({
      name: user.fullName,
    }),
  });

  res.redirect(`${process.env.CLIENT_URL}/login?verified=true`);
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const user = await User.findOne({ email }).select("+password +refreshToken");

  if (!user || user.authProvider !== "local") {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  if (!user.isEmailVerified) {
    res.status(403);
    throw new Error("Please verify your email before login");
  }

  if (user.isBlocked) {
    res.status(403);
    throw new Error("Your account is blocked");
  }

  await createAndSendTokens(user, 200, res);
});

exports.googleAuth = asyncHandler(async (req, res) => {
  const { credential } = req.body;

  if (!credential) {
    res.status(400);
    throw new Error("Google credential is required");
  }

  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  const { sub, email, name, picture, email_verified } = payload;

  if (!email || !email_verified) {
    res.status(400);
    throw new Error("Google email is not verified");
  }

  let user = await User.findOne({ email }).select("+refreshToken");

  if (!user) {
    user = await User.create({
      fullName: name,
      email,
      avatar: picture,
      googleId: sub,
      authProvider: "google",
      isEmailVerified: true,
    });

    await addEmailJob({
      to: user.email,
      subject: "Welcome to Production Auth",
      html: welcomeEmailTemplate({
        name: user.fullName,
      }),
    });
  } else {
    if (!user.googleId) {
      user.googleId = sub;
    }

    if (!user.avatar && picture) {
      user.avatar = picture;
    }

    user.isEmailVerified = true;
    await user.save({ validateBeforeSave: false });
  }

  if (user.isBlocked) {
    res.status(403);
    throw new Error("Your account is blocked");
  }

  await createAndSendTokens(user, 200, res);
});

exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(200).json({
      success: true,
      message: "If this email exists, a reset link has been sent.",
    });
  }

  if (user.authProvider === "google") {
    res.status(400);
    throw new Error(
      "This account uses Google login. Please login with Google.",
    );
  }

  const rawResetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${rawResetToken}`;

  await addEmailJob({
    to: user.email,
    subject: "Reset your password",
    html: resetPasswordTemplate({
      name: user.fullName,
      resetUrl,
    }),
  });

  res.status(200).json({
    success: true,
    message: "If this email exists, a reset link has been sent.",
  });
});

exports.resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;

  if (!password || password.length < 8) {
    res.status(400);
    throw new Error("Password must be at least 8 characters");
  }

  const hashedToken = hashToken(req.params.token);

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpire: { $gt: Date.now() },
  }).select("+password");

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired reset token");
  }

  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpire = undefined;
  user.refreshToken = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successful. Please login again.",
  });
});

exports.refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    res.status(401);
    throw new Error("No refresh token found");
  }

  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

  const user = await User.findById(decoded.id).select("+refreshToken");

  if (!user || user.refreshToken !== token) {
    res.status(401);
    throw new Error("Invalid refresh token");
  }

  if (user.isBlocked) {
    res.status(403);
    throw new Error("Your account is blocked");
  }

  const accessToken = generateAccessToken(user._id);

  res.status(200).json({
    success: true,
    accessToken,
  });
});

exports.logout = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;

  if (token) {
    const user = await User.findOne({ refreshToken: token }).select(
      "+refreshToken",
    );

    if (user) {
      user.refreshToken = undefined;
      await user.save({ validateBeforeSave: false });
    }
  }

  clearRefreshCookie(res);

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

exports.getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email,
      avatar: req.user.avatar,
      role: req.user.role,
      authProvider: req.user.authProvider,
      isEmailVerified: req.user.isEmailVerified,
    },
  });
});
