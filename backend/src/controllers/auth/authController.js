const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const generateToken = require("../../utils/generateToken");
const sendVerificationEmail = require("../../config/mailer");

exports.register = async (req, res) => {
  const { username, password, email, phone } = req.body;
  //hash Password
  const hashedPassword = await bcrypt.hash(password, 10);
  //Save user
  const user = new User({ username, password: hashedPassword, email, phone });
  await user.save();
  // Generate Token and verify email
  const token = generateToken(email);
  await sendVerificationEmail(email, token);

  res.status(201).json({
    message: "User registered successfully. Please verify your email.",
    token: token,
  });
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    console.log("Decoded Token:", decodedToken);
    const user = await User.findOneAndUpdate(
      { email: decodedToken.email },
      { $set: { verified: true } },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Email verified successfully. You can now login." });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(400).json({ message: "Invalid token or email." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (!user.verified) {
    return res.status(403).json({ message: "Email not verified" });
  }

  const token = generateToken(email);
  res.json({ token });
};


