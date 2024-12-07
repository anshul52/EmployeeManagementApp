const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGODB_URI;

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("db connected successfully!!");
  } catch (err) {
    console.error("db error : ", err);
  }
}

module.exports = connectDB;
