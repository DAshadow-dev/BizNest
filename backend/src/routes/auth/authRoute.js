const express = require("express");
const {
  register,
  login,
  verifyEmail,
} = require("../../controllers/auth/authController");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/verify-email", verifyEmail);

module.exports = authRouter;
