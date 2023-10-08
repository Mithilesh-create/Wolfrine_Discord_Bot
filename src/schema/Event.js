const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const userSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  createduser: {
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
  startdate: {
    type: Date,
    default: Date.now(),
  },
  enddate: {
    type: Date,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  task: {
    type: [TaskSchema],
  },
});
const Event = mongoose.model("Events", userSchema);
module.exports = Event;
