import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchEmployees, addEmployee } from "../../services/employeeService";

// Thunk to fetch employees from the backend
export const fetchAllEmployees = createAsyncThunk(
  "employees/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchEmployees();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk to add a new employee
export const addNewEmployee = createAsyncThunk(
  "employees/add",
  async (employeeData, { rejectWithValue }) => {
    try {
      const data = await addEmployee(employeeData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch employees
    builder.addCase(fetchAllEmployees.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllEmployees.fulfilled, (state, action) => {
      state.loading = false;
      state.employees = action.payload;
    });
    builder.addCase(fetchAllEmployees.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Add new employee
    builder.addCase(addNewEmployee.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addNewEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.employees.push(action.payload);
    });
    builder.addCase(addNewEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default employeesSlice.reducer;
