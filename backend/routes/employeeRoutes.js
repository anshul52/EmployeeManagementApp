const express = require("express");
const {
  getReportingManagersByDepartment,
  AddEmployees,
} = require("../controllers/EmployeeController");
const { getOrganizationTree } = require("../controllers/OrganizationTree");
const router = express.Router();

router.post("/addEmployee", AddEmployees);
router.get("/organizationTree", getOrganizationTree);
router.get("/managers/:department", getReportingManagersByDepartment);

module.exports = router;
