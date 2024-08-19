const authService = require("../services/authService");
const Responses = require("../helpers/response");
const messages = require("../constants/constMessages");

/**FUNC- FOR SIGN IN BY PASSWORD**/
const signInByPassword = async (req, res) => {
    try {
      const result = await authService.signInByPassword(req.body);

      if (!result) {
        return Responses.failResponse(req, res, null, messages.userNotFound, 200);
      }
      if (result?.incorrectPassword) {
        return Responses.failResponse(req, res, null, messages.incorrectPassword, 200);
      }
  
      if (result?.isUserDeactivated) {
        return Responses.failResponse(req, res, null, messages.invalidUser, 200);
      }
  
      return Responses.successResponse(req, res, result, messages.signInSuccess, 200);
    } catch (error) {
      console.log(error);
      return Responses.errorResponse(req, res, error);
    }
};

/**FUNC- TO SEND OTP **/
const sendOtpToEmployee = async (req, res) => {
    try {
      const result = await authService.sendOtp(req.body);
      if (result?.isInValidUser) {
        return Responses.failResponse(req, res, null, messages.userNotFound, 200);
      }
      if (!result.success) {
        return Responses.failResponse(req, res, null, await messages.otpSentFail(result.email), 200);
      }

    const successMessage = await messages.otpSentSuccess(result.email);
    return Responses.successResponse(req, res, result, successMessage, 200);

    } catch (error) {
      console.log(error);
      return Responses.errorResponse(req, res, error);
    }
};

/**FUNC- TO LOGIN WITH OTP **/
const loginWithOtp = async (req, res) => {
    try{
        const result = await authService.loginWithOtp(req.body);
        if (result?.isInValidUser) {
            return Responses.failResponse(req, res, null, messages.userNotFound, 200);
        }

        if (result?.isOtpInvalid) {
            return Responses.failResponse(req, res, null, messages.invalidOtp, 200);
        }
        return Responses.successResponse(req, res, { token: result.token }, messages.signInSuccess, 200);
    } catch (error) {
        console.log(error);
        return Responses.errorResponse(req, res, error);
    }
}

module.exports = {
    signInByPassword,
    sendOtpToEmployee,
    loginWithOtp
}