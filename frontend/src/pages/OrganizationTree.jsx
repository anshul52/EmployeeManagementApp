import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../components/nav";

const OrganizationTree = () => {
  const [organizationTree, setOrganizationTree] = useState(null);

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7500/api/organizationTree"
        );
        setOrganizationTree(response?.data?.data);
      } catch (error) {
        console.error("Error fetching organization tree:", error);
      }
    };
    fetchTree();
  }, []);

  if (!organizationTree)
    return <p className="text-center text-gray-600">Loading...</p>;

  const renderTree = (node) => {
    return (
      <div key={node?._id} className="flex flex-col items-center mb-6">
        <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200 ease-in-out text-center">
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
            <div className="border-l-2 border-gray-300 h-6 mx-auto relative">
              <div className="absolute top-0 left-0 transform -translate-x-1/2 border-t-2 border-gray-300 w-1/2"></div>
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
      <div className="min-h-[100vh] bg-red-400 w-full">
        <Nav />
        {/* --------------------------------------------------- */}
        <div className="p-8 bg-gray-50 shadow-xl w-full mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Organization Tree
          </h1>
          {renderTree(organizationTree)}
        </div>
      </div>
    </>
  );
};

export default OrganizationTree;
