const Joi = require('joi');
const Responses = require('../helpers/response');

const createEmployeeValidator = async (req, res, next) => {
    try{
        const bodySchema = Joi.object({
            name: Joi.string().trim().pattern(/^[0-9a-zA-Z ,/-]+$/)
              .messages({
                "string.pattern.base": `HTML tags & Special letters are not allowed!`,
            }),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
                .messages({
                'string.min': 'Password should have a minimum length of {#limit}',
                'string.empty': 'Password cannot be an empty field',
                'any.required': 'Password is a required field'
            }) ,
            role: Joi.string(),
            designation: Joi.string(),
            department: Joi.string()     
          });

          await bodySchema.validateAsync(req.body);
          next();
    } catch (error){
        console.log(error);
        return Responses.errorResponse(req, res, error, 200)
    }
};

//VIEW EMPLOYEE VALIDATOR
const viewSingleEmployeeValidator = async (req, res, next) => {
    try {
      const paramsSchema = Joi.object({
        id: Joi.string().trim().alphanum().required(),
      });
      await paramsSchema.validateAsync(req.params);
      next();
    } catch (error) {
      console.log(error);
      return Responses.errorResponse(req, res, error, 200);
    }
};

// EDIT EMPLOYEE VALIDATOR
const editEmployeeValidator = async (req, res, next) => {
    try {
      const bodySchema = Joi.object({
        name: Joi.string().trim().pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
            "string.pattern.base": `HTML tags & Special letters are not allowed!`,
          }),
        email: Joi.string().email(),
        designation: Joi.string(),
        department: Joi.string()
       
      });
      console.log("bodySchema--", bodySchema);
      const paramsSchema = Joi.object({
        id: Joi.string().trim().alphanum().required(),
      });
      await paramsSchema.validateAsync(req.params);
      await bodySchema.validateAsync(req.body);
  
      next();
    } catch (error) {
      console.log(error);
      return Responses.errorResponse(req, res, error, 200);
    }
};

//DELETE EMPLOYEE VALIDATOR
const deleteEmployeeValidator = async (req, res, next) => {
    try {
      const paramsSchema = Joi.object({
        id: Joi.string().trim().alphanum().required(),
      });
      await paramsSchema.validateAsync(req.params);
      next();
    } catch (error) {
      console.log(error);
      return Responses.errorResponse(req, res, error);
    }
};

//LSIT EMPLOYEE VALIDATOR
const listEmployesValidator = async (req, res, next) => {
  try {
    const bodySchema = Joi.object({
      searchKey: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }),
    });
    const paramsSchema = Joi.object({
      limit: Joi.number(),
      page: Joi.number(),
      order: Joi.number(),
    });
    await bodySchema.validateAsync(req.body);
    await paramsSchema.validateAsync(req.query);

    next();
  } catch (error) {
    console.log(error);
    return Responses.errorResponse(req, res, error, 200);
  }
};

module.exports = {
    createEmployeeValidator,
    viewSingleEmployeeValidator,
    editEmployeeValidator,
    deleteEmployeeValidator,
    listEmployesValidator
}