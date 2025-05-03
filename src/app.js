const express = require("express");
const app = express();
const connectDB = require("./config/database.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json()); // To parse JSON body
app.use(cookieParser());

const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("DB connection established...");
    app.listen(process.env.PORT, () => {
      console.log("Server successfully listening on port number 7777...");
    });
  })
  .catch((err) => {
    console.error("DB connection error " + err);
  });
