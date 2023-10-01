require("dotenv").config();
const getDb = require("./db");
const { Client, IntentsBitField } = require("discord.js");
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
  ],
});
getDb().then(() => {
  client.on("ready", (client) => {
    console.log(`${client.user.username} is now awaken !`);
  });

  client.on("messageCreate", (e) => {
    if (e.author.bot) return;
    if (e.content === "Hello") {
      e.reply("Hello");
    }
  });
  client.on("messageCreate", (e) => {
    if (e.author.bot) return;
    if (e.content === "Mellow") {
      client.users.cache.get(e.author.id).send("Hehe boi Got em!!!!");
    }
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "ping") {
      await interaction.reply({
        content: `Hello ${interaction.user.globalName} , You have now successfully registered to this event.`,
        ephemeral: true,
      });
    }
  });

  client.login(process.env.TOKEN);
});
