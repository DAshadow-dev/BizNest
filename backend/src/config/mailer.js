const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendVerificationEmail = async (email,token) => {
    const url = 'http://localhost:5000/api/auth/verify-email?token=' + token;
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to : email,
        subject: 'Email Verification',
        html: `
            <h1>Verify your email</h1>
            <p>Please click on the following link to verify your email:</p>
            <a href="${url}">${url}</a>`
    })
};

module.exports = sendVerificationEmail;
