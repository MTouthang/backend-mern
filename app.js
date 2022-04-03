// Imports ---
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const app = express();

// middleware imports ---
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");

// database connection ---
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

// mount specific middleware ---
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Routes ---
app.use("/api", authRoutes);

// port config ---
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
