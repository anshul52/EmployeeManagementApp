import { useState, useEffect } from "react";
import { fetchEmployees, addEmployee } from "../services/employeeService";

const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch employees when the component mounts
  useEffect(() => {
    const fetchEmployeeData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (err) {
        setError(err.message || "Failed to fetch employees");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);

  // Add a new employee
  const addNewEmployee = async (employeeData) => {
    setLoading(true);
    setError(null);
    try {
      const newEmployee = await addEmployee(employeeData);
      setEmployees((prev) => [...prev, newEmployee]); // Add the new employee to the list
    } catch (err) {
      setError(err.message || "Failed to add employee");
    } finally {
      setLoading(false);
    }
  };

  return {
    employees,
    loading,
    error,
    addNewEmployee,
  };
};

export default useEmployees;
