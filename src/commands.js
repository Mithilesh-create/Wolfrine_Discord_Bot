require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "register",
    description: "Register's you to contest!",
  },
  {
    name: "getdata",
    description: "Gets all users registered in this contest!",
    options: [
      {
        name: "secret-key",
        description: "Moderator secret key",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "getcompleted",
    description: "Gets all users completed this contest!",
    options: [
      {
        name: "secret-key",
        description: "Moderator secret key",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "daily",
    description: "Submit task & post url!",
    options: [
      {
        name: "taskurl",
        description: "Submit daily task url!",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "posturl",
        description: "Submit daily post url!",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "register-event",
    description: "Start an event!",
    options: [
      {
        name: "event-title",
        description: "Title of event",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "event-start-date",
        description: "Starting date of event (number)",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
      {
        name: "event-end-date",
        description: "Ending date of event (number)",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
      {
        name: "number-of-submissions",
        description: "Number of submissions required from participants !",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "secret-key",
        description: "Moderator secret key",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "register-task",
    description: "Start an event!",
    options: [
      {
        name: "task-title",
        description: "Title of task",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: "secret-key",
        description: "Moderator secret key",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
  {
    name: "close-event",
    description: "Closes the current ongoing event!",
    options: [
      {
        name: "secret-key",
        description: "Moderator secret key",
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

module.exports = async () => {
  try {
    console.log("Registering slash commands...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Slash commands were registered successfully!");
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
};
