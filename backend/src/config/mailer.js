const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendVerificationEmail = async (email, token) => {
  const url = "http://localhost:5000/api/auth/verify-email?token=" + token;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    html: `
            <h1>Verify your email</h1>
            <p>Please click on the following link to verify your email:</p>
            <a href="${url}">${url}</a>`,
  });
};

const sendResetPasswordEmail = async (email, token) => {
  const url = "http://localhost:5000/api/auth/reset-password?token=" + token;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    html: `
            <h1>Reset your password</h1>
            <p>Please click on the following link to reset your password:</p>
            <a href="${url}">${url}</a>`,
  });
};

module.exports = {
  sendVerificationEmail,
  sendResetPasswordEmail,
};
