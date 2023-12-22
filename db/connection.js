const mongoose = require("mongoose");

// Mongoose connection string parameters
const uri =
  "mongodb+srv://faisali8362:5FqLxk9zPEZLqJxs@cluster0.5ekafja.mongodb.net/registrationform?retryWrites=true&w=majority";

// Connect to MongoDB using Mongoose
async function connectToMongoDB() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB using Mongoose!");

    // Further operations with Mongoose can be performed once connected
    // Example: Define schemas, models, perform CRUD operations, etc.
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = connectToMongoDB;
