const express = require("express");
const logger = require("morgan");
require("dotenv").config();
var cors = require("cors");
const connectDB = require("./config/db.js");
const router = require("./routes/index.js");
const errorHandler = require("./utils/errorHandler.js");
const port = process.env.PORT || 7500;
connectDB();
const app = express();

const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies if needed
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(router);

app.get("/", (req, res) => {
  res.send({ res: "hello brother !" });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on the port ${port}`);
});
