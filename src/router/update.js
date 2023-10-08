const Event = require("../schema/Event");
const User = require("../schema/User");

const updateDailyTask = async (i, taskurl, posturl) => {
  try {
    const checkEvent = await Event.findOne({
      channelid: i.channelId,
      serverid: i.guildId,
      active: true,
    });
    if (!checkEvent) {
      return 3;
    }
    const check = await User.find({
      channelid: i.channelId,
      serverid: i.guildId,
      userid: i.user.id,
    });

    if (check.length == 0) {
      return 2;
    }
    var filter = { userid: i.user.id };

    const updatedEntry = await User.findOneAndUpdate(
      filter,
      {
        $push: {
          task: { taskurl, posturl },
        },
      },
      {
        new: true,
      }
    );
    if (!updatedEntry) {
      return 0;
    }
    return 1;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

module.exports = {
  updateDailyTask,
};
