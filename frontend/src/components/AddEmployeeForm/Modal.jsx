import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, selectOpenModalId } from "../../state/Slices/modalSlice";
const API_URL = import.meta.env.VITE_API_URL;

const Modal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openModalId = useSelector(selectOpenModalId);
  const [managers, setManagers] = useState([]);
  const [employee, setEmployee] = useState({
    name: "",
    department: "",
    designation: "",
    reportingManager: "",
    dob: "",
    yearOfExperience: "",
    employeeImagePath: "",
    isCEO: false,
  });
  const [responseMessage, setResponseMessage] = useState("");
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get(
          `${API_URL}managers/${employee?.department}`
        );
        if (response.data) {
          setManagers(response.data);
        } else {
          setManagers([]);
        }
      } catch (error) {
        console.error("Error fetching managers:", error);
        setManagers([]);
      }
    };

    fetchManagers();
  }, [employee?.department]);
  if (openModalId !== "modalA") return null;

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:7500/api/addEmployee",
        {
          name: employee?.name,
          department: employee?.department,
          designation: employee?.designation,
          reportingManager: employee?.reportingManager,
          dob: employee?.dob,
          yearOfExperience: parseInt(employee?.yearOfExperience),
          employeeImagePath: employee?.employeeImagePath,
          isCEO: employee?.isCEO,
        }
      );
      if (response?.data?.res === true) {
        toast.success(response?.data?.message);
        handleClose();
        window.location.reload();
      }
      console.log("response----", response);
    } catch (error) {
      console.error("-error::", error);
      setResponseMessage("Error adding employee");
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="fixed w-screen z-50 h-screen top-0 left-0 flex items-center justify-center bg-black/50">
      <div class="relative  p-4 w-[60%]  max-h-full ">
        <div class="relative  bg-white rounded-lg shadow dark:bg-gray-700">
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Add new Employee
            </h3>
            <button
              type="button"
              class="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
              onClick={handleClose}
            >
              <IoCloseSharp />
            </button>
          </div>
          <div class="p-4 md:p-5 w-full">
            <form class="w-full" action="#" onSubmit={handleSubmit}>
              <div className="flex w-full gap-5 mb-7">
                <div className="w-1/2 flex flex-col gap-4">
                  <div>
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={employee?.name}
                      onChange={handleChange}
                      required
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="department"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Department
                    </label>
                    <select
                      name="department"
                      value={employee?.department}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    >
                      <option value="">Select Department</option>
                      <option value="Human_Resources">
                        Human Resources (HR)
                      </option>
                      <option value="Finance">Finance</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="IT-Technology">IT/Technology</option>
                      <option value="Operations">Operations</option>
                      <option value="Customer_Service">Customer Service</option>
                    </select>
                  </div>
                  <div>
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Designation
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={employee?.designation}
                      onChange={handleChange}
                      required
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="reportingManager"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Reporting Manager
                    </label>

                    {managers && managers.length > 0 ? (
                      <select
                        name="reportingManager"
                        value={employee?.reportingManager}
                        onChange={handleChange}
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      >
                        <option value="">Select Reporting Manager</option>
                        {managers?.map((manager) => (
                          <option key={manager?.id} value={manager?._id}>
                            {manager?.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        name="reportingManager"
                        value={employee?.reportingManager || ""}
                        onChange={handleChange}
                        disabled
                        required
                        placeholder="Enter Reporting Manager Name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      />
                    )}
                  </div>
                </div>
                <div className="w-1/2 flex flex-col gap-4">
                  <div>
                    <label
                      for="email"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={employee?.dob}
                      onChange={handleChange}
                      required
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      name="yearOfExperience"
                      value={employee?.yearOfExperience}
                      onChange={handleChange}
                      required
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Employee Image URL
                    </label>
                    <input
                      type="text"
                      name="employeeImagePath"
                      value={employee.employeeImagePath}
                      onChange={handleChange}
                      required
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login to your account
              </button>
              <div class="text-sm font-medium text-gray-500 dark:text-gray-300"></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
