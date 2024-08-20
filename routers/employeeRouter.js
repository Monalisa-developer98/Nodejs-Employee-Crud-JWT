const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const validator = require("../validators/employeeValidator");
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Serve static files from the 'uploads' directory
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// ----------------------- routers -------------------------------------------------------
/* CREATE EMPLOYEE  */
router.post("/createEmployee", 
    upload.single('profileImage'), 
    validator.createEmployeeValidator,
    employeeController.createEmployee
);
// http://localhost:3443/api/V1/employee/createEmployee

/* VIEW SINGLE EMPLOYEE  */
router.get("/viewEmployee/:id", 
  validator.viewSingleEmployeeValidator, 
  authMiddleware.verifyUserToken,
  employeeController.viewSingleEmployee
);
// http://localhost:3443/api/V1/employee/viewEmployee/66c18266dd0652d60725b036

/* EDIT EMPLOYEE  */
router.put("/editEmployee/:id", 
  validator.editEmployeeValidator,
  authMiddleware.verifyUserToken, 
  employeeController.editEmployee
);
// http://localhost:3443/api/V1/employee/editEmployee/66c19a9781d92131ff10bed2

/* DELETE EMPLOYEE  */
router.delete("/deleteEmployee/:id", 
  validator.deleteEmployeeValidator,
  authMiddleware.verifyUserToken, 
  employeeController.deleteEmployee
);
// http://localhost:3443/api/V1/employee/deleteEmployee/66c19a5b783f6f7747fd1f4b

/* VIEW EMPLOYEE  */
router.post("/listEmployee", 
  validator.listEmployesValidator,
  authMiddleware.verifyUserToken, 
  employeeController.listEmployee
);
// http://localhost:3443/api/V1/employee/listEmployee?order=-1&limit=2&page=2

module.exports = router;