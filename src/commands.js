require("dotenv").config();
const { REST, Routes } = require("discord.js");

const command = [
  {
    name: "register",
    description: "Registers you to contest!",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
module.exports = async () => {
  try {
    console.log("Started refreshing application (/) commands.");
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID, process.env.CLIENT_ID),
      {
        body: command,
      }
    );
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
};
