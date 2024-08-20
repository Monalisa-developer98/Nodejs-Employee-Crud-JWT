const employeeService = require('../services/employeeService');
const Responses = require('../helpers/response');
const messages = require('../constants/constMessages');

/// create employee
const createEmployee = async (req, res) => {
    try{
        const result = await employeeService.createEmployee(req.body, req.file);
        console.log(result);
        if(result?.isDuplicateEmail){
            return Responses.failResponse(req, res, null, messages.duplicateEmail, 200);
        }
        return Responses.successResponse(req, res, result, messages.createdSuccess, 201);
    } catch (error){
        console.log(error);
        return Responses.errorResponse(req, res, error);
    }
};  // http://localhost:3443/api/V1/employee/createEmployee


/// view Single Employee
const viewSingleEmployee = async (req, res) => {
    try{
        const result = await employeeService.viewSingleEmployee(req.params.id);
        console.log("view SingleEmployee Result", result);
        if (!result){
            return Responses.failResponse(req, res, null, messages.recordsNotFound, 200);
        }
        return Responses.successResponse(req, res, result, messages.recordsFound, 200);
    } catch (error){
        console.log(error);
        return Responses.errorResponse(req, res, error);
    }
} // http://localhost:3443/api/V1/employee/viewEmployee/66c18266dd0652d60725b036

/**FUNC- TO EDIT EMPLOYEE **/
const editEmployee = async (req, res) => {
    try {
      const result = await employeeService.editEmployee(req.params.id, req.body);
      if (!result) {
        return Responses.failResponse(req, res, null, messages.updateFailedRecordNotFound, 200);
      }
  
      if (result?.isDuplicateEmail) {
        return Responses.failResponse(req, res, null, messages.duplicateEmail, 200);
      }
  
      return Responses.successResponse(req, res, result, messages.updateSuccess, 200);
    } catch (error) {
      console.log(error);
      return Responses.errorResponse(req, res, error);
    }
};

/**FUNC- TO DELETE EMPLOYEE **/
const deleteEmployee = async(req, res) =>{
    try {
      const result = await employeeService.deleteEmployee(req.params.id);
      if (!result) {
        return Responses.failResponse(req, res, null, messages.deleteFailedRecordNotFound, 200);
      }
      return Responses.successResponse(req, res, null, messages.deleteSuccess, 200);
    } catch (error) {
      console.log(error);
      return Responses.errorResponse(req, res, error);
    }
  }

  /**FUNC- TO SHOW LIST OF EMPLOYEES **/
  const listEmployee = async (req, res) => {
    try {
      const result = await employeeService.listEmployee(req.body, req.query);
      console.log(result);
      if (result.totalCount === 0) {
        return Responses.failResponse(req, res, null, messages.recordsNotFound, 200);
      }
      return Responses.successResponse(req, res, result, messages.recordsFound, 200);
    } catch (error) {
      console.log(error);
      return Responses.errorResponse(req, res, error);
    }
  };

module.exports = {
    createEmployee,
    viewSingleEmployee,
    editEmployee,
    deleteEmployee,
    listEmployee
};