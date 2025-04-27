const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth.js");

const app = express();

const first = (req, res, next) => {
  console.log("First");
  next();
};

const second = (req, res, next) => {
  console.log("Second");
<<<<<<< HEAD
  // next();
  const err = new Error("Something went wrong!");
  next(err);
=======
  next();
  // const err = new Error("Something went wrong!");
  // next(err);
>>>>>>> abf6c7721fdc3d506be4cdefecb503b1693397a9
};

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

const logReq = (req, rews, next) => {
  console.log("Login request");
  next();
};

const authReq = (req, rews, next) => {
  console.log("Auth request");
  next();
};

const sendResponse = (req, res) => {
  res.send("Success!");
};

app.get("/dashboard", logReq, [authReq], sendResponse);

app.use("/admin", adminAuth, sendResponse);

app.get("/user", first, second, (req, res) => {
  res.send({ firstName: "Pradeep", lastName: "Reddy" });
});

app.post("/user", userAuth, async (req, res) => {
  console.log(req.body);
  res.send("User data saved successfully");
});

app.delete("/user", (req, res) => {
  res.send("User deleted successfully");
});

app.use("/test", (req, res) => {
  res.send("Response form the server!");
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
app.use('/', (err, req, res) => {
  console.log("Error occured " + err.message);
  res.status(500).send(err.message);
});

app.listen(7777, () => {
  console.log("Server successfully listening on port number 7777...");
});
