const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth.js");
const connectDB = require("./config/database.js");

const app = express();
const User = require("./models/user.js");

app.post("/signup", async (req, res) => {

  const user = new User({
    firstName: "Pradeep",
    lastName: "Reddy",
    email: "pradeep@gmail.com",
    password: "123",
  });

  try {
    await user.save();
    res.send("user added successfully");
  } catch (err) {
    res.status(400).send("error on saving the user " + err.message);
  }
});

app.get("/user", (req, res) => {
  res.send({ firstName: "Pradeep", lastName: "Reddy" });
});

app.post("/user", userAuth, async (req, res) => {
  console.log(req.body);
  res.send("User data saved successfully");
});

app.delete("/user", (req, res) => {
  res.send("User deleted successfully");
});

// Query params
app.get("/search", (req, res) => {
  const { name, age } = req.query;
  res.send(`Searching for ${name} and ${age}`);
});

// Dynamic routes
app.get("/users/:userId/:name/:password", (req, res) => {
  const { userId, name, password } = req.params;
  res.send(`User ID ${userId} ${name} ${password}`);
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
