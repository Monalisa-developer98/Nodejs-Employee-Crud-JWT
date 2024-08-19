const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: `${process.env.USER_MAIL}`,
      pass: `${process.env.USER_PASS}`,
    },
});

const mailOptions = {
    from: `${process.env.USER_MAIL}`,
    to: '', 
    subject: 'Your OTP for Verification', 
    html: '<b>Welcome to Demo App !!! :</b>', 
    attachments: []
};

module.exports = {
    transporter, mailOptions
}