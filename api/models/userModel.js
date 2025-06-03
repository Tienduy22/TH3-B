const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  login_name: String,
  password:String,
  first_name: String ,
  last_name: String ,
  location: String ,
  description: String ,
  occupation: String ,
  token: String,
});

module.exports = mongoose.model.Users || mongoose.model("Users", userSchema);
