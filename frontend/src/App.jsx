import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import OrganizationTree from "./pages/OrganizationTree";

function App() {
  return (
    <>
      <div className="text-gray-300">
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/task1" />} />
            <Route path="/task1" element={<OrganizationTree />} />
            {/* <Route path="/task2" element={<Debounce />} /> */}
            {/* <Route path="/task3" element={<DynamicForm />} /> */}
          </Routes>
          <ToastContainer />
        </Router>
      </div>
    </>
  );
}

export default App;
