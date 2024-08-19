const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const validator = require("../validators/authValidator");

/* SIGN IN BY PASSWORD */
router.post("/signInByPassword", validator.signInByPasswordValidator, authController.signInByPassword);
// http://localhost:3443/api/V1/auth/signInByPassword

/* SIGN IN BY OTP */
router.post('/send-otp', validator.sendOtpValidator, authController.sendOtpToEmployee);
// http://localhost:3443/api/V1/auth/send-otp

/* SIGN IN BY OTP */
router.post('/signInByOtp', validator.signInByOtpValidator, authController.loginWithOtp);
// http://localhost:3443/api/V1/auth/signInByOtp

module.exports = router;