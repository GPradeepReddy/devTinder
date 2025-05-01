const express = require("express");
const { userAuth } = require("./middlewares/auth");
const connectDB = require("./config/database.js");
const { validateSignupData } = require("./utils/validation.js");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
const User = require("./models/user.js");

app.use(express.json()); // To parse JSON body
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    gender,
    age,
    skills,
    about,
    photoUrl,
  } = req.body;
  try {
    validateSignupData(req);
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send("User already existing");
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      gender,
      age,
      skills,
      about,
      photoUrl,
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("error on saving the user " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Email and Password required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }

    const isPasswordValid = await user.validatePassword(password);
    
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.status(200).send({ message: "Login successful" });
    } else {
      return res.status(400).send({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    console.log("Send a connection request!");
    res.send(user.firstName + " Sent the connection request");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

connectDB()
  .then(() => {
    console.log("DB connection established...");
    app.listen(7777, () => {
      console.log("Server successfully listening on port number 7777...");
    });
  })
  .catch((err) => {
    console.error("DB connection error " + err);
  });
