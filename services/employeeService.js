const Employee = require('../models/employeeModel');
const ObjectId = require("mongoose").Types.ObjectId;
const { generateHashPassword } = require('../helpers/commonHelper')

// create Employee
const createEmployee = async(data) =>{
    const emailDetails = await checkDuplicateEmail(data.email);
    if(emailDetails){
        return {isDuplicateEmail: true};
    }
    const hashedPassword = await generateHashPassword(data.password);

    if(!emailDetails){
        const inputData = {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role,
            designation: data.designation,
            department: data.department
        }
        const empData = new Employee(inputData);
        const result = await empData.save();
        return result;
    }
   return false; 
}
const checkDuplicateEmail = async(email) =>{
    const employee = await Employee.findOne(
        { email, isActive:true }, 
        { _id: 1, email: 1, name: 1, isActive: 1 }
    );
    return employee;
}

// view Single Employee
const viewSingleEmployee = async(id) => {
    const singleEmployeDetails = await Employee.findById({ _id: id });
    console.log("Single Employee Details: -----", singleEmployeDetails);
    return singleEmployeDetails;
}

/**FUNC- EDIT EMPLOYEE */
const editEmployee = async(id, data) => {

    const objectId = new ObjectId(id);
    const currentData = await Employee.findOne({_id: objectId, isActive: true});
    if (!currentData){
        return null;
    }

    const [emailDetails] = await checkDuplicateEntry(data.email);
  
    if (emailDetails && emailDetails._id.toString() !== id) {
      return {
        isDuplicateEmail: true,
      };
    }
    if (data.password) {
        data.password = await generateHashPassword(data.password);
    }
    const result = await Employee.findByIdAndUpdate({ _id: objectId }, data, { new: true});
    return result;
}

const checkDuplicateEntry = async (email, empId) => {
    const emailDetails = await Employee.findOne({ email });
    return [emailDetails];
};

// delete Employee
const deleteEmployee = async(id) =>{
    const result = await Employee.findByIdAndDelete(id);  
    return result;
}

/**FUNC- TO SEE LIST OF EMPLOYEE */
const listEmployee = async (bodyData, queryData) => {
    const { order } = queryData;
    const { searchKey } = bodyData;
  
    let query = searchKey ? {
            $and: [
                {
                    $or: [
                        { name: { $regex: searchKey, $options: "i" } },
                        { email: { $regex: searchKey, $options: "i" } },
                    ],
                },
                {
                    isActive: true,
                },
            ],
        } : { isActive: true };
  
    const limit = queryData.limit ? parseInt(queryData.limit) : 0;
    const skip = queryData.page ? (parseInt(queryData.page) - 1) * limit : 0;
  
    const totalCount = await Employee.countDocuments(query);
    const employeeData = await Employee.find(query).sort({ _id: parseInt(order) }).skip(skip).limit(limit);
  
    return { totalCount, employeeData };
};

/**FUNC- TO VERIFY ACTIVE USER*/
const verifyEmployee = async (empId) => {
    console.log("empId-----------", empId);
    return await Employee.findOne(
      { _id: new ObjectId(empId), isActive: true },
      {
        _id: 1,
        email: 1,
        name: 1,
        isActive: 1,
      }
    );
  };


module.exports = {
    createEmployee,
    viewSingleEmployee,
    editEmployee,
    deleteEmployee,
    listEmployee,
    verifyEmployee
}