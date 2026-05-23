const mongoose = require("mongoose");
require("dotenv").config();

const defaultUrl = "mongodb://127.0.0.1:27017/internshala";
const url = process.env.DATABASE_URL || defaultUrl;

module.exports.connect = async () => {
  try {
    await mongoose.connect(url);
    console.log("Database is connected");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    console.warn("The backend will continue running, but database-dependent routes may fail.");
  }
};
