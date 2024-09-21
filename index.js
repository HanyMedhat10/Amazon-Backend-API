const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const authRouter = require("./routers/auth");
const startup = "/api";
app.use(express.json());
app.use(`${startup}/auth`, authRouter);
// app.use(express.static())
app.get(startup, (req, res) => {
  res.send("Hello world");
});

mongoose
  .connect(process.env.DB_URL) /* connect with Atlas aws */
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
