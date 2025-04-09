const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
  res.send("Hello World!");
});

app.use("/test", (req, res) => {
  res.send("Response form the server!");
});

app.listen(3000, () => {
  console.log("Server successfully listening on port number 3000");
});
