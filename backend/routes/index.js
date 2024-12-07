const express = require("express");
// const authRouter = require("./auth.route");
const EmployeeRouter = require("./employeeRoutes");
const router = express.Router();

// router.use("/api", (req, res) => {
//   res.send({ res: "hello sir !!" });
// });
router.use("/api", EmployeeRouter);
module.exports = router;
