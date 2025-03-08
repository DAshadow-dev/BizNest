const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendVerificationEmail = async (email, token) => {
  const url = `http://localhost:5000/api/auth/verify-email?token=${token}`; // URL chứa token trong query string

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
  const url = "http://localhost:5000/api/auth/reset-password"; // URL không chứa token

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password Reset Request",
    html: `
            <h1>Reset your password</h1>
            <p>Please click on the following link to reset your password:</p>
            <p><a href="${url}">${url}</a></p>
            <p>Your reset password token is: <strong>${token}</strong></p>
            <p>Please include this token in the Authorization header as: Bearer ${token}</p>`,
  });
};

module.exports = {
  sendVerificationEmail,
  sendResetPasswordEmail,
};
