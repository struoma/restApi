const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./User"); // Import the User model

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define your routes and middleware here

app.post("/create-user", async (req, res) => {
  try {
    const { username } = req.body; // Assuming you have a POST request with username and email in the request body

    const newUser = new User({ username });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
