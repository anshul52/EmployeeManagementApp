import React from "react";

const OrganizationTree = ({ employees }) => {
  const renderTree = (node) => (
    <li key={node.id} className="ml-4">
      <span className="text-blue-600 font-medium">
        {node.name} - {node.designation}
      </span>
      {node.subordinates?.length > 0 && (
        <ul className="ml-4 list-disc">
          {node?.subordinates?.map((child) => renderTree(child))}
        </ul>
      )}
    </li>
  );

  return (
    <ul className="text-left text-gray-800">
      {employees?.map((employee) => renderTree(employee))}
    </ul>
  );
};

export default OrganizationTree;
