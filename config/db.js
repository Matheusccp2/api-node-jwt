const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

const conn = mongoose.connect(
  `mongodb+srv://${dbUser}:${dbPassword}@matheusccp2.ekpc8.mongodb.net/api-cadastro-login-node?retryWrites=true&w=majority`
);

module.exports = conn;