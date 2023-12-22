const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  conPass: String,
});

// Create the User model based on the schema
const User = mongoose.model("users", userSchema);

module.exports = User;
