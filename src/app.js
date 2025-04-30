const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth.js");
const connectDB = require("./config/database.js");

const app = express();
const User = require("./models/user.js");

app.use(express.json()); // To parse JSON body

app.post("/signup", async (req, res) => {
  try {
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
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send("User already existing");
    const user = new User({
      firstName,
      lastName,
      email,
      password,
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

app.get("/user", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(404).send("Users not found");
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.patch("/user/:id", userAuth, async (req, res) => {
  const userId = req.params?.id;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }
    const user = await User.findByIdAndUpdate(userId, data, {
      new: true,
    });
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.patch("/user/email/:email", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );
    if (!user) return res.status(404).send("user not found");
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send("user not found");
    res.send("User deleted successfully");
  } catch {
    res.status(500).send(err.message);
  }
});

// Query params
app.get("/search", (req, res) => {
  const { name, age } = req.query;
  res.send(`Searching for ${name} and ${age}`);
});

// Dynamic routes
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("user not found");
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Global erorr handling
app.use("/", (err, req, res) => {
  console.log("Error occured " + err.message);
  res.status(500).send(err.message);
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
