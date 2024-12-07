import React from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../state/Slices/modalSlice";
import ModalA from "../components/AddEmployeeForm/Modal";

const Nav = () => {
  const dispatch = useDispatch();

  const handleOpenModalA = () => {
    dispatch(openModal("modalA")); // Open Modal A
  };
  return (
    <header className="flex justify-between items-center bg-blue-600 text-white px-6 py-4 shadow-md">
      <h1 className="text-xl font-semibold">Organization Management</h1>
      <button
        onClick={handleOpenModalA}
        className="bg-white text-blue-600 px-4 py-2 rounded-md shadow hover:bg-gray-100 transition"
      >
        Add Employee
      </button>
      <ModalA />
    </header>
  );
};

export default Nav;
