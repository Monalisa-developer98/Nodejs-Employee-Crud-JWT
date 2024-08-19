const { transporter, mailOptions } = require("../emailSetUp/mailSetUp");

/**FUNC- TO SEND EMAIL TO USER */
const sendEmail = async (email, emailSubject, mailData, attachedFileDetails = []) => {
  const mailOptionsInfo = {
    from: mailOptions,
    to: email,
    subject: emailSubject,
    html: mailData,
    attachments: attachedFileDetails,
  };
    const isSuccess = await transporter.sendMail(mailOptionsInfo);
    return isSuccess;
};

module.exports = {
  sendEmail,
};