const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  userid: {
    type: String,
    required: true,
    unique: true,
  },
  servername: {
    type: String,
    required: true,
  },
  serverid: {
    type: String,
    required: true,
  },
  channelid: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});
const User = mongoose.model("Registered_User", userSchema);
module.exports = User;
