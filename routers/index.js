const express = require('express');
const app = express();
const BASE_PATH = "V1";

const employeeRouter = require('./employeeRouter');
const authRouter = require("./authRouter");


app.use(`/${BASE_PATH}/auth`, authRouter);
app.use(`/${BASE_PATH}/employee`, employeeRouter);

module.exports = app