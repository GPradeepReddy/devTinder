const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send({ firstName: "Pradeep", lastName: "Reddy" });
});

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
app.get("/users/:userId", (req, res) => {
  const { userId } = req.params;
  res.send(`User ID ${userId}`);
});

app.listen(7777, () => {
  console.log("Server successfully listening on port number 7777...");
});
