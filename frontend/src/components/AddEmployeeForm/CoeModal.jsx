import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, selectOpenModalId } from "../../state/Slices/modalSlice";
const API_URL = import.meta.env.VITE_API_URL;

const CeoModal = () => {
  const dispatch = useDispatch();
  const openModalId = useSelector(selectOpenModalId);
  const [formData, setFormData] = useState({
    name: "",
    designation: "CEO",
    dob: "",
    yearOfExperience: 0,
    employeeImagePath: "",
    isCEO: true,
  });
  if (openModalId !== "modalB") return null;
  const handleClose = () => {
    dispatch(closeModal());
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}addEmployee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(response?.data?.message);
        handleClose();
        window.location.reload();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="fixed w-screen z-50 h-screen top-0 left-0 flex items-center justify-center bg-black/50">
      <div class="relative  p-4 sm:w-[40%] w-[60%]  max-h-full ">
        <div class="relative  bg-white rounded-lg shadow dark:bg-gray-700">
          <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Add CEO
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
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Name:
                </label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              {/* <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Designation:
                </label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  required
                />
              </div> */}
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Date of Birth:
                </label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Years of Experience:
                </label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  type="number"
                  name="yearOfExperience"
                  value={formData.yearOfExperience}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Employee Image Path:
                </label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  type="url"
                  name="employeeImagePath"
                  value={formData.employeeImagePath}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="submit"
              >
                Add CEO
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CeoModal;
