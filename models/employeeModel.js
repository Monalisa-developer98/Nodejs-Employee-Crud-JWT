const mongoose = require('mongoose');
const validator = require('validator');

//schema
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        index: true
    }, 
    email: {
        type: String,
        validate:{
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email. Please enter a valid email'
        },
        required: true,
        default: null,
        unique: true,
        index: true 
    },
    password:{
        type: String,
        required: true,
    } ,
    otp:{
        type: String
    },
    otpExpiry:{
        type: Date
    },
    designation:{
        type: String,
        default: null
    },
    department: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isActive : {
        type: Boolean,
        default: true,
        index: true,
    }  
},{
    timestamps: true
})

// model
const Employee = mongoose.model('employee', employeeSchema);

module.exports = Employee