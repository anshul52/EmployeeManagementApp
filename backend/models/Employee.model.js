const mongoose = require("mongoose");

const departmentEnum = [
  "Human_Resources",
  "Finance",
  "Marketing",
  "Sales",
  "IT-Technology",
  "Operations",
  "Customer_Service",
];

// Predefined designations by department
const designationsByDepartment = {
  "Human Resources (HR)": [
    "HR Manager",
    "HR Coordinator",
    "Recruitment Specialist",
    "HR Assistant",
    "Payroll Manager",
  ],
  Finance: [
    "Finance Manager",
    "Accountant",
    "Financial Analyst",
    "Controller",
    "Tax Manager",
  ],
  Marketing: [
    "Marketing Manager",
    "Digital Marketing Specialist",
    "Brand Manager",
    "Content Writer",
    "Social Media Manager",
  ],
  Sales: [
    "Sales Manager",
    "Sales Executive",
    "Account Manager",
    "Sales Representative",
    "Business Development Manager",
  ],
  "IT/Technology": [
    "IT Manager",
    "Network Administrator",
    "Software Developer",
    "Systems Analyst",
    "IT Support Specialist",
  ],
  Operations: [
    "Operations Manager",
    "Operations Coordinator",
    "Supply Chain Manager",
    "Logistics Coordinator",
    "Production Supervisor",
  ],
  "Customer Service": [
    "Customer Service Manager",
    "Customer Support Representative",
    "Client Success Manager",
    "Help Desk Technician",
    "Customer Service Associate",
  ],
};

// Employee schema
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: {
    type: String,
    required: function () {
      return !this.isCEO; // Department is not required for the CEO
    },
    enum: departmentEnum, // Enforce predefined department options
  },
  designation: {
    type: String,
    required: true,
    // enum: ["CEO", ...Object.values(designationsByDepartment).flat()],
  },
  reportingManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: function () {
      return !this.isCEO; // CEO does not have a reporting manager
    },
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ], // Reference to employees in the team
  dob: { type: Date, required: true },
  yearOfExperience: { type: Number, required: true },
  employeeImagePath: { type: String, required: true },
  isCEO: { type: Boolean, default: false }, // Flag to mark the CEO
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = { Employee, designationsByDepartment };
