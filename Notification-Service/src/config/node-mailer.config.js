require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

async function sendMail({ to, subject, text, from, html }) {

    const mailOptions = {
        from: `"My App Support" <${process.env.SMTP_USER}>`,
        to: to, // List of receivers
        subject: subject, // Subject line
        text: text, // Plain text body
        html: html, // HTML body (optional)
    };
    await transporter.sendMail(mailOptions);
}

module.exports = sendMail;
