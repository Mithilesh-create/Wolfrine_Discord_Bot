const mongoose = require("mongoose");
const DailyTask = new mongoose.Schema({
  posturl: {
    type: String,
    unique: true,
  },
  taskurl: {
    type: String,
    unique: true,
  },
  entry: {
    type: Date,
    default: Date.now(),
  },
});
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
  task: {
    type: [DailyTask],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
});
const User = mongoose.model("Registered_User", userSchema);
module.exports = User;
