const Employee = require("../models/employeeModel");
const { verifyPassword } = require('../helpers/commonHelper')
const authMiddleware = require("../middlewares/authMiddleware");
const emailService = require("./emailService");
const ObjectId = require("mongoose").Types.ObjectId;
const { generateOTP } = require('./otpService');


/**FUNC- TO VERIFY VALID EMAIL USER */
const verifyEmail = async (email) => {
    return await Employee.findOne({ email, isActive: true }, 
        { _id: 1, email: 1, name: 1, otp: 1, otpExpiry: 1 });
};

/**FUNC- FOR SIGN IN BY PASSWORD   */
const signInByPassword = async (data) => {
    const userData = await Employee.findOne(
      { email: data.email },
      {
        _id: 1,
        email: 1,
        password: 1,
        isActive: 1,
      }
    );
    if (!userData) {
      return false;
    }

    if (!userData.isActive) {
      return {
        isUserDeactivated: true,
      };
    }
    const passwordIsValid = await verifyPassword(data.password, userData.password);

    if (!passwordIsValid) {
      return {
        incorrectPassword: true,
      };
    }
  
    const token = await authMiddleware.generateUserToken({userId: userData._id, name: userData.name});
    console.log(token);
    delete userData.password;
    return { token, userData};
};

/** FUNCTION TO SEND OTP **/
const sendOtp = async (data) => {
    const employee = await verifyEmail(data.email);
    if (employee) {
        const otp = generateOTP();

        employee.otp = otp;
        employee.otpExpiry = new Date(Date.now() + 15 * 60 * 1000); // Set OTP and its expiry time (15 minutes from now)
        await employee.save();

        const emailSubject = 'Your OTP for Verification';
        const mailData = `<p>Your OTP for verification is <strong>${otp}</strong>. It will expire in 15 minutes.</p>`;

        try {
            await emailService.sendEmail(employee.email, emailSubject, mailData);
            return { success: true, email: employee.email, otp };
        } catch (error) {
            console.error('Error sending email:', error);
            return { success: false, email: employee.email };
        }
    } else {
        return {
          isInValidUser: true,
          success: false,
        };
    }
};

/** FUNC- FOR SIGN IN BY OTP */
const loginWithOtp = async (data) => {
    // Find the employee by email
    const employee = await verifyEmail(data.email);
    if (!employee) {
        return { isInValidUser: true };
    }

    // Check if OTP is valid and not expired
    const isOtpValid = employee.otp && employee.otp.toString() === data.otp.toString();
    const isOtpExpired = employee.otpExpiry && employee.otpExpiry < new Date();

    // If OTP is invalid or expired, return appropriate response
    if (!isOtpValid || isOtpExpired) {
        return {
            isOtpInvalid: true,
        };
    }

    // OTP is valid; log the user in
    employee.otp = null; // Clear the OTP after successful login
    employee.otpExpiry = null;
    await employee.save();

    const token = await authMiddleware.generateUserToken({ userId: employee._id, name: employee.name });
    return {
        success: true,
        token,
        employee
    };
};

module.exports = {
    signInByPassword,
    sendOtp,
    loginWithOtp
};