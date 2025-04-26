const express = require("express");

const app = express();

app.get(
  "/user",
  (req, res, next) => {
    console.log("user first response");
    next();
  },
  (req, res, next) => {
    console.log("user second response");
    next();
  },
  (req, res, next) => {
    console.log("user third response");
    next();
  },
  (req, res, next) => {
    console.log("user fourth response");
    next();
  },
  (req, res) => {
    console.log("user fifth response");
    res.send({ firstName: "Pradeep", lastName: "Reddy" });
  }
);

app.post("/user", async (req, res) => {
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

app.listen(7777, () => {
  console.log("Server successfully listening on port number 7777...");
});
