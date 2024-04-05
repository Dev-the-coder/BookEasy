const mongoose = require("mongoose");

var mongoURL = "mongodb+srv://ajaykg6917:ajaykriitism@cluster.vnieuhu.mongodb.net/";

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("Mongo DB Connection Failed");
});

connection.on("connected", () => {
  console.log("Mongo DB Connection Successful");
});

module.exports = mongoose;
