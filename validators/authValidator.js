const Joi = require("joi");
const Responses = require("../helpers/response");
var regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
// SEND OTP VALIDATOR
const sendOtpValidator = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required()
    });

    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error, 200);
  }
};

// SEND VERIFY OTP VALIDATOR
const verifyOtpValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    const schema = Joi.object({
      email: Joi.string().email().required(),
      otp: Joi.string()
        .trim()
        .length(6)
        .pattern(/^[0-9]+$/)
        .messages({ "string.pattern.base": `OTP must have 6 digits.` })
        .required()
        .strict(),
    });

    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error, 200);
  }
};

// SET PASSWORD VALIDATOR
const setPasswordValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(regularExpression)
        .messages({
          "string.pattern.base": `Password min 8 letter, with at least a symbol, upper and lower case letters and a number!`,
        })
        .min(8)
        .max(15)
        .required(),
      otp: Joi.string()
        .trim()
        .length(6)
        .pattern(/^[0-9]+$/)
        .messages({ "string.pattern.base": `OTP must have 6 digits.` })
        .required()
        .strict(),
    });

    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error, 200);
  }
};

// SET SIGN IN BY PASWORD VALIDATOR
const signInByPasswordValidator = async (req, res, next) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
                .messages({
                'string.min': 'Password should have a minimum length of {#limit}',
                'string.empty': 'Password cannot be an empty field',
                'any.required': 'Password is a required field'
        }),
    });

    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error, 200);
  }
};


// SET SIGN IN BY OTP VALIDATOR
const signInByOtpValidator = async (req, res, next) => {
  try {
    const bodySchema = Joi.object({
      email: Joi.string().email().required(),
      otp: Joi.string().min(6).required()   
    });
    await bodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error, 200);
  }
};

module.exports = {
  sendOtpValidator,
  verifyOtpValidator,
  setPasswordValidator,
  signInByPasswordValidator,
  signInByOtpValidator
};