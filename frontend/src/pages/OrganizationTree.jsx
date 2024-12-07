import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/nav";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

const OrganizationTree = () => {
  const [organizationTree, setOrganizationTree] = useState(null);
  const [TreeResponse, setTreeResponse] = useState("");

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const response = await axios.get(`${API_URL}organizationTree`);
        console.log("response---", response);

        if (response?.data?.data) {
          setOrganizationTree(response?.data?.data);
        } else if (response?.data?.res === fasle) {
          toast.error(response?.data?.message);
        }
      } catch (error) {
        if (error?.response?.data?.res === false) {
          toast.error(error?.response?.data?.message);
          setTreeResponse(error?.response?.data?.message);
        }
        console.error("Error fetching organization tree:", error);
      }
    };
    fetchTree();
  }, []);

  const renderTree = (node) => {
    return (
      <div key={node?._id} className="flex flex-col items-center mb-6">
        <div className="bg-white border relative border-gray-200 p-6 rounded-lg shadow-lg transform  transition-transform duration-200 ease-in-out text-center">
          <div className="absolute bottom-[100%] left-1/2 transform -translate-x-1/2 h-10 bg-gray-400  w-1"></div>

          <img
            src={node?.employeeImagePath}
            alt={node?.name}
            className="w-20 h-20 rounded-full mb-4 border-2 border-gray-300"
          />
          <h3 className="font-semibold text-xl text-gray-800">{node?.name}</h3>
          <p className="text-md text-gray-600">{node?.designation}</p>
          {node?.department && (
            <p className="text-sm text-gray-500">{node?.department}</p>
          )}
        </div>

        {node?.subordinates && node?.subordinates.length > 0 && (
          <div className="mt-6">
            <div className=" h-2 mx-auto relative bg-gray-400 rounded-[20px]">
              <div className="absolute top-0 left-0 transform -translate-x-1/2  w-1/2"></div>
            </div>
            <div className="flex justify-center space-x-12 mt-8">
              {node?.subordinates?.map((subordinate) => (
                <div key={subordinate?._id}>{renderTree(subordinate)}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="min-h-[100vh] bg-gray-50 w-full">
        <Nav />
        {/* --------------------------------------------------- */}
        <div className="p-8 bg-gray-50 w-full mx-auto ">
          <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
            Organization Tree
          </h1>
          {TreeResponse === "" ? (
            ""
          ) : (
            <div className="text-center text-gray-800">{TreeResponse}</div>
          )}
          {!organizationTree ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : (
            renderTree(organizationTree)
          )}
        </div>
      </div>
    </>
  );
};

export default OrganizationTree;
