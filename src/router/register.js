const User = require("../schema/User");

const { EmbedBuilder } = require("discord.js");
var { AsciiTable3, AlignmentEnum } = require("ascii-table3");
const Event = require("../schema/Event");
const register = async (i) => {
  try {
    const check = await User.findOne({
      userid: i.user.id,
      channelid: i.channelId,
      serverid: i.guildId,
    });
    if (check) {
      return 2;
    }
    const checkEvent = await Event.findOne({
      channelid: i.channelId,
      serverid: i.guildId,
      active: true,
    });
    if (!checkEvent) {
      const NoEventEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(
          `Sorry! ${i.user.globalName}  🐺,\n\Currently there is no active events available in this channel.\n\n`
        )
        .setDescription(
          "Please ask moderator if you think this is not right !\n\n"
        )
        .setFooter({
          text: "Happy coding to you 🚀",
        })
        .setTimestamp();
      return NoEventEmbed;
    }
    const reg = await User.create({
      userid: i.user.id,
      channelid: i.channelId,
      serverid: i.guildId,
      username: i.user.globalName,
      servername: i.member.guild.name,
    });

    const SuccessEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(
        `Hooray! ${i.user.globalName}  🐺,\n\nYou have successfully registered for ${checkEvent.title} event  🤩 .\n\n`
      )
      .setDescription("We are glad to have you in this event.\n\n")
      .setFooter({
        text: "Happy coding to you 🚀",
      })
      .setTimestamp();

    if (!reg) {
      console.log("error");
      return 0;
    }
    return SuccessEmbed;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
const registerEvent = async (i, title, start, end) => {
  try {
    const check = await Event.findOne({
      userid: i.user.id,
      channelid: i.channelId,
      serverid: i.guildId,
      active: true,
    });
    if (check) {
      return 2;
    }
    var startDate = new Date();
    var startDateRes = startDate.setDate(startDate.getDate() + start);
    var someDate = new Date();
    var endDateRes = someDate.setDate(someDate.getDate() + start + end);
    const reg = await Event.create({
      title: title,
      enddate: endDateRes,
      startdate: startDateRes,
      userid: i.user.id,
      channelid: i.channelId,
      serverid: i.guildId,
      createduser: i.user.globalName,
      servername: i.member.guild.name,
      active: true,
    });

    if (!reg) {
      console.log("error");
      return 0;
    }
    return 1;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
const getdata = async (i) => {
  try {
    const check = await User.find({
      channelid: i.channelId,
      serverid: i.guildId,
    });
    var dataArr = [];
    if (check.length > 0) {
      check.forEach((e) => {
        var name = e.username;
        var id = e.userid;
        dataArr.push([id, name]);
      });
    } else {
      dataArr.push("No Registered Users");
    }
    var table = new AsciiTable3("Registered Users")
      .setHeadingAlign(AlignmentEnum.CENTER)
      .setAlign(3, AlignmentEnum.CENTER)
      .addRowMatrix(dataArr);

    return table.setStyle("compact").toString();
  } catch (error) {
    console.log(error);
    return 0;
  }
};

const getcompleted = async (i) => {
  try {
    const check = await User.find({
      channelid: i.channelId,
      serverid: i.guildId,
      completed: true,
    });
    var dataArr = [];
    if (check.length > 0) {
      check.forEach((e) => {
        var name = e.username;
        var id = e.userid;
        dataArr.push([id, name]);
      });
    } else {
      dataArr.push("No Users Completed");
    }
    var table = new AsciiTable3("Completed Users")
      .setHeadingAlign(AlignmentEnum.CENTER)
      .setAlign(3, AlignmentEnum.CENTER)
      .addRowMatrix(dataArr);

    return table.setStyle("compact").toString();
  } catch (error) {
    console.log(error);
    return 0;
  }
};
const registerTask = async (i, title) => {};
module.exports = {
  register,
  getcompleted,
  getdata,
  registerEvent,
  registerTask,
};
