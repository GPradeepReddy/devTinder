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

app.listen(3000, () => {
  console.log("Server successfully listening on port number 3000");
});
