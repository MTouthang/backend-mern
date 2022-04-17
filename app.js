// Imports ---
require("dotenv").config(); //dotenv
const mongoose = require("mongoose"); // mongoose database connectivity
const express = require("express"); // express - server
const app = express();

// middleware imports ---
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser"); // token stuff
const cors = require("cors");

// import the routes
const authRoutes = require("./routes/auth"); // auth routes
const userRoutes = require("./routes/user"); // user routes
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const paymentBRoutes = require("./routes/paymentBRoutes");

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
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", paymentBRoutes);

// port config ---
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
