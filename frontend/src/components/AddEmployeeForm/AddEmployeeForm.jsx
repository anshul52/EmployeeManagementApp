import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./validationSchema";

const AddEmployeeForm = ({ isOpen, onClose, onSubmit, managers }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Add Employee</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              {...register("name")}
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded-md focus:outline-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.name?.message}</p>
          </div>
          <div>
            <input
              {...register("designation")}
              type="text"
              placeholder="Designation"
              className="w-full p-2 border rounded-md focus:outline-blue-500"
            />
            <p className="text-red-500 text-sm">
              {errors.designation?.message}
            </p>
          </div>
          <div>
            <input
              {...register("dob")}
              type="date"
              className="w-full p-2 border rounded-md focus:outline-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.dob?.message}</p>
          </div>
          <div>
            <input
              {...register("experience")}
              type="number"
              placeholder="Years of Experience"
              className="w-full p-2 border rounded-md focus:outline-blue-500"
            />
            <p className="text-red-500 text-sm">{errors.experience?.message}</p>
          </div>
          <div>
            <select
              {...register("managerId")}
              className="w-full p-2 border rounded-md focus:outline-blue-500"
            >
              <option value="">Select Manager</option>
              {managers.map((manager) => (
                <option key={manager.id} value={manager.id}>
                  {manager.name}
                </option>
              ))}
            </select>
            <p className="text-red-500 text-sm">{errors.managerId?.message}</p>
          </div>
          <div>
            <input
              {...register("image")}
              type="file"
              className="w-full p-2 border rounded-md"
            />
            <p className="text-red-500 text-sm">{errors.image?.message}</p>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
