const User = require("../schema/User");
const { EmbedBuilder } = require("discord.js");
// const table = require("text-table");
var { AsciiTable3, AlignmentEnum } = require("ascii-table3");
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
        `Hooray! ${i.user.globalName}  🐺,\n\nYou have successfully registered for this event  🤩 .\n\n`
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

const getdata = async (i) => {
  try {
    const check = await User.findOne({
      channelid: i.channelId,
      serverid: i.guildId,
    });

    console.log(check, " all users");

    return 1;
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
    });
    var dataArr = [];
    check.forEach((e) => {
      var name = e.username;
      var id = e.userid;
      dataArr.push([id, name]);
    });
    var table = new AsciiTable3("Challange Table")
      .setHeadingAlign(AlignmentEnum.CENTER)
      .setAlign(3, AlignmentEnum.CENTER)
      .addRowMatrix(dataArr);

    return table.setStyle("compact").toString();
  } catch (error) {
    console.log(error);
    return 0;
  }
};
module.exports = {
  register,
  getcompleted,
  getdata,
};
