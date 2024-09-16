const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/auth");

const app = express();

app.use(
  cors({
    origin: "http://localhost:4000",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);

module.exports = app;
