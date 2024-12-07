import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./Slices/employeeSlice";
import modalReducer from "./Slices/modalSlice";

const store = configureStore({
  reducer: {
    employees: employeesReducer,
    modal: modalReducer,
  },
});

export default store;
