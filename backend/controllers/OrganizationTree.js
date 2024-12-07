const { Employee } = require("../models/Employee.model");

// const getOrganizationTree = async (req, res) => {
//   try {
//     const ceo = await Employee.findOne({ isCEO: true }).lean();
//     if (!ceo) {
//       return res
//         .status(404)
//         .json({ message: "CEO not found in the organization." });
//     }

//     const buildTree = async (employeeId, processedIds = new Set()) => {
//       if (processedIds.has(employeeId)) {
//         return [];
//       }
//       processedIds.add(employeeId);

//       const currentEmployee = await Employee.findById(employeeId).lean();
//       if (!currentEmployee) {
//         return [];
//       }

//       const subordinates = await Employee.find({
//         reportingManager: employeeId,
//       }).lean();

//       const teamMembers = currentEmployee.teams
//         ? await Employee.find({ _id: { $in: currentEmployee.teams } }).lean()
//         : [];

//       const allSubordinates = [
//         ...subordinates.filter(
//           (subordinate) => !processedIds.has(subordinate._id)
//         ),
//         ...teamMembers.filter(
//           (teamMember) => !processedIds.has(teamMember._id)
//         ),
//       ];

//       for (const subordinate of allSubordinates) {
//         subordinate.subordinates = await buildTree(
//           subordinate._id,
//           processedIds
//         );
//       }

//       return allSubordinates;
//     };

//     ceo.subordinates = await buildTree(ceo._id);

//     res.status(200).json({
//       message: "Organization tree fetched successfully.",
//       data: ceo,
//     });
//   } catch (error) {
//     console.error("Error while fetching organization tree:", error);
//     res
//       .status(500)
//       .json({ message: "Internal server error. Please try again later." });
//   }
// };

const getOrganizationTree = async (req, res) => {
  try {
    const ceo = await Employee.findOne({ isCEO: true }).lean();
    if (!ceo) {
      return res
        .status(404)
        .json({ res: false, message: "CEO not found in the organization." });
    }

    const buildTree = async (employeeId, processedIds = new Set()) => {
      if (processedIds.has(employeeId)) {
        return [];
      }
      processedIds.add(employeeId);

      const currentEmployee = await Employee.findById(employeeId).lean();
      if (!currentEmployee) {
        return [];
      }

      const subordinates = await Employee.find({
        reportingManager: employeeId,
      }).lean();

      const teamMembers =
        currentEmployee.teams && currentEmployee.teams.length > 0
          ? await Employee.find({ _id: { $in: currentEmployee.teams } }).lean()
          : [];

      const allSubordinates = [
        ...subordinates.filter(
          (subordinate) => !processedIds.has(subordinate._id)
        ),
        // ...teamMembers.filter(
        //   (teamMember) => !processedIds.has(teamMember._id)
        // ),
      ];

      for (const subordinate of allSubordinates) {
        subordinate.subordinates = await buildTree(
          subordinate._id,
          processedIds
        );
      }

      return allSubordinates;
    };

    ceo.subordinates = await buildTree(ceo._id);

    res.status(200).json({
      message: "Organization tree fetched successfully.",
      data: ceo,
    });
  } catch (error) {
    console.error("Error while fetching organization tree:", error);
    res
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }
};

module.exports = {
  getOrganizationTree,
};
