const {
  Employee,
  designationsByDepartment,
} = require("../models/Employee.model");
const mongoose = require("mongoose");

const departments = async (req, res) => {
  const departments = Object.keys(designationsByDepartment);
  res.status(200).json(departments);
};

// API endpoint to fetch designations by department
const designations = async (req, res) => {
  const { department } = req.params;

  if (designationsByDepartment[department]) {
    res.status(200).json(designationsByDepartment[department]);
  } else {
    res.status(400).json({ message: "Department not found" });
  }
};

// API endpoint to add employee details
const AddEmployees = async (req, res) => {
  try {
    let {
      name,
      department,
      designation,
      isCEO,
      reportingManager,
      teams,
      dob,
      yearOfExperience,
      employeeImagePath,
    } = req.body;

    // Basic validation for required fields
    if (!name || !dob || !yearOfExperience || !employeeImagePath) {
      return res.status(400).json({
        message:
          "Name, Date of Birth, Experience, and Employee Image are required.",
      });
    }

    // CEO-specific validation
    if (isCEO) {
      const existingCEO = await Employee.findOne({ isCEO: true });
      if (existingCEO) {
        return res.status(400).json({
          res: false,
          message: "A CEO already exists in the organization.",
        });
      }
      if (designation !== "CEO") {
        return res.status(400).json({
          res: false,
          message: 'The designation for a CEO must be "CEO"',
        });
      }
      if (department || reportingManager || teams) {
        return res.status(400).json({
          res: false,
          message:
            "A CEO cannot have a department, reporting manager, or teams.",
        });
      }
    } else {
      // Validation for non-CEO employees
      if (!department || !designation) {
        return res.status(400).json({
          res: false,
          message:
            "Department and Designation are required for non-CEO employees.",
        });
      }

      if (
        reportingManager &&
        !mongoose.Types.ObjectId.isValid(reportingManager)
      ) {
        return res
          .status(400)
          .json({ res: false, message: "Invalid reporting manager ID." });
      }
      if (reportingManager === "") {
        const ceo = await Employee.findOne({ isCEO: true });
        if (ceo) {
          reportingManager = ceo._id;
        } else {
          return res
            .status(400)
            .json({
              res: false,
              message: "CEO not found. First make a CEO profile!",
            });
        }
      }
    }

    // Create a new employee object
    const newEmployee = new Employee({
      name,
      department,
      designation,
      isCEO,
      reportingManager,
      teams,
      dob,
      yearOfExperience,
      employeeImagePath,
    });

    const savedEmployee = await newEmployee.save();

    if (reportingManager) {
      await Employee.findByIdAndUpdate(reportingManager, {
        $addToSet: { teams: savedEmployee._id },
      });
    }
    let msgg =
      isCEO == true ? "CEO added successfully" : "Employee added successfully";
    res.status(201).json({
      res: true,
      message: msgg,
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error while adding employee:", error);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
};

const getReportingManagersByDepartment = async (req, res) => {
  try {
    const { department } = req.params;

    // Ensure the department exists in the predefined departments
    if (!Object.keys(designationsByDepartment).includes(department)) {
      return res
        .status(400)
        .json({ res: false, message: "Invalid department" });
    }

    // Find employees in the department who are not CEOs and do not have a reporting manager
    const managers = await Employee.find({
      department,
      isCEO: false,
      // reportingManager: { $exists: false },
    }).select("name designation");

    if (managers.length === 0) {
      return res.status(404).json({ res: false });
    }

    res.status(200).json(managers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  departments,
  getReportingManagersByDepartment,
  designations,
  AddEmployees,
};
