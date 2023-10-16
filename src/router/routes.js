require("dotenv").config();
const express = require("express");
const router = new express.Router();
const cors = require("cors");
const User = require("../schema/User");
const Event = require("../schema/Event");
router.use(express.json());
router.use(cors());
router.post("/checkAuth", async (req, res) => {
  try {
    if (req.body.secret != process.env.SECRET_KEY)
      return res.status(404).json({ message: "No Auth" });
    const check = await Event.findOne({
      channelid: req.body.channelId,
      serverid: req.body.serverId,
    });
    if (!check) return res.status(404).json({ message: "No Auth" });

    return res.status(200).json({
      message: "success",
      data: check,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error",
      data: error,
    });
  }
});
router.post("/getdata", async (req, res) => {
  try {
    const check = await User.find({
      channelid: req.body.channelId,
      serverid: req.body.serverId,
    });
    return res.status(200).json({
      message: "success",
      data: check,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error",
      data: error,
    });
  }
});
router.post("/getcompleted", async (req, res) => {
  try {
    const check = await User.find({
      channelid: req.body.channelId,
      serverid: req.body.serverId,
      completed: true,
    });
    return res.status(200).json({
      message: "success",
      data: check,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error",
      data: error,
    });
  }
});
router.post("/getevent", async (req, res) => {
  try {
    const check = await Event.find({
      channelid: req.body.channelId,
      serverid: req.body.serverId,
    });
    return res.status(200).json({
      message: "success",
      data: check,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error",
      data: error,
    });
  }
});
router.get("/getuser/:id", async (req, res) => {
  try {
    const response = await User.findById({ _id: req.params.id });

    return res.status(200).json({
      message: "success",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error",
      data: error,
    });
  }
});
router.post("/gettask", async (req, res) => {
  try {
    const response = await Event.findOne({
      channelid: req.body.channelId,
      serverid: req.body.serverId,
      active: true,
    });

    return res.status(200).json({
      message: "success",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error",
      data: error,
    });
  }
});
router.put("/edittask", async (req, res) => {
  try {
    const response = await Event.updateOne(
      { _id: req.body.id, "task._id": req.body.taskid },
      {
        $set: {
          "task.$.title": req.body.title,
        },
      }
    );

    if (!response)
      return res
        .status(404)
        .json({ message: "Error", data: "Error while Updating" });

    return res.status(200).json({
      message: "Success",
      response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error",
      data: error,
    });
  }
});
router.put("/deletetask", async (req, res) => {
  try {
    const response = await Event.findOneAndUpdate(
      { _id: req.body.id },
      {
        $pull: {
          task: {
            _id: req.body.taskid,
          },
        },
      },
      { new: true }
    );
    if (!response)
      return res
        .status(404)
        .json({ message: "Error", data: "Error while deleting" });

    return res.status(200).json({
      message: "Success",
      response,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error",
      data: error,
    });
  }
});
module.exports = router;
