const express = require("express");
const cors = require("cors");
// const mongoose = require("mongoose");
const connectToMongoDB = require("./db/connection");
const User = require("./db/model");
const app = express();
const port = 3000;
const corsOptions = {
  origin: "/",
};
app.use(cors(corsOptions));
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const user = req.body;
    connectToMongoDB();
    const alreadyExist = await User.findOne({ email: user.email });
    if (alreadyExist) {
      res.status(409).send("user already exists");
    } else {
      const newUser = new User({
        name: user.name,
        email: user.email,
        password: user.password,
        conPass: user.confirmPass,
      });
      const result = await newUser.save();
      // console.log(result);
      res.send("user created successfully");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`APP RUNNING on port ${port}`);
});
