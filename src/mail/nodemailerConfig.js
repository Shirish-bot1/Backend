import nodemailer from 'nodemailer';

// Create a Nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'shirishgiri6@gmail.com', // Your Gmail email address
    pass: 'meowmeowmeowbiralo', // Your Gmail password or an app-specific password
  },
});

export default transporter;
