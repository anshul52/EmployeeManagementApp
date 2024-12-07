import React, { useEffect, useState } from "react";
import OrganizationTree from "./components/OrganizationTree/OrganizationTree";
import { useSelector, useDispatch } from "react-redux";
import AddEmployeeForm from "./components/AddEmployeeForm/AddEmployeeForm";
import {
  addNewEmployee,
  fetchAllEmployees,
} from "./state/Slices/employeeSlice";

const tree = () => {
  <div className="min-h-screen bg-gray-50">
    <header className="flex justify-between items-center bg-blue-600 text-white px-6 py-4 shadow-md">
      <h1 className="text-xl font-semibold">Organization Management</h1>
      <button
        onClick={toggleModal}
        className="bg-white text-blue-600 px-4 py-2 rounded-md shadow hover:bg-gray-100 transition"
      >
        Add Employee
      </button>
    </header>
    <main className="container mx-auto py-6">
      <OrganizationTree employees={employees} />
    </main>
    {isModalOpen && (
      <AddEmployeeForm
        isOpen={isModalOpen}
        onClose={toggleModal}
        onSubmit={handleAddEmployee}
        managers={managers}
      />
    )}
  </div>;
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center bg-blue-600 text-white px-6 py-4 shadow-md">
        <h1 className="text-xl font-semibold">Organization Management</h1>
        <button
          onClick={toggleModal}
          className="bg-white text-blue-600 px-4 py-2 rounded-md shadow hover:bg-gray-100 transition"
        >
          Add Employee
        </button>
      </header>
      <main className="container mx-auto py-6">
        <OrganizationTree employees={employees} />
      </main>
      {isModalOpen && (
        <AddEmployeeForm
          isOpen={isModalOpen}
          onClose={toggleModal}
          onSubmit={handleAddEmployee}
          managers={managers}
        />
      )}
    </div>
  );
};

export default tree;
