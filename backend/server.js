const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

app.use(cors());

const mongoURL = process.env.MONGO_CRED;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("Error connecting to database:", err);
});

db.once("open", () => {
  console.log("Connected to the database");
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api", require("./routes/dataRoutes"));

app.listen(6001, () => {
  console.log("Server is running on port 6001");
});
