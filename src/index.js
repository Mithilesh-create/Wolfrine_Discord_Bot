require("dotenv").config();
require("./db")
const { Client, IntentsBitField } = require("discord.js");
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
  ],
});

client.on("ready", (client) => {
  console.log(`${client.user.username} is now awaken !`);
});

client.on("messageCreate",(e)=>{
    if(e.author.bot) return;
    if(e.content==="Hello"){
        e.reply("Hello");
    }
})

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  }
});

client.login(process.env.TOKEN);
