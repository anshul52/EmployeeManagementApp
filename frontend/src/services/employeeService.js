import axios from "axios";

// Base URL for the API
const BASE_URL = "http://localhost:5000/api/employees"; // Update with your actual backend URL

/**
 * Fetches all employees from the backend.
 * @returns {Promise<Object[]>} List of employees.
 */
export const fetchEmployees = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Adds a new employee to the backend.
 * @param {Object} employeeData - Data for the new employee.
 * @param {File} employeeData.image - Employee's image file.
 * @param {string} employeeData.name - Employee's name.
 * @param {string} employeeData.designation - Employee's designation.
 * @param {string} employeeData.dob - Employee's date of birth.
 * @param {number} employeeData.experience - Employee's years of experience.
 * @param {string} employeeData.managerId - Reporting manager's ID.
 * @returns {Promise<Object>} The added employee.
 */
export const addEmployee = async (employeeData) => {
  try {
    const formData = new FormData();
    formData.append("image", employeeData.image);
    formData.append("name", employeeData.name);
    formData.append("designation", employeeData.designation);
    formData.append("dob", employeeData.dob);
    formData.append("experience", employeeData.experience);
    formData.append("managerId", employeeData.managerId);

    const response = await axios.post(`${BASE_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * Handles API errors by throwing a formatted error message.
 * @param {Object} error - The error object from Axios.
 */
const handleError = (error) => {
  const errorMessage =
    error.response?.data?.message || "An unexpected error occurred";
  throw new Error(errorMessage);
};
