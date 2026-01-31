require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Public Route
app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Bem vindo a nossa API",
  });
});

// Connect to DB and start server
db.then(() => {
  app.listen(process.env.PORT || 3022, () => {
    console.log("Conectou ao banco!");
  });
}).catch((err) => console.log(err));