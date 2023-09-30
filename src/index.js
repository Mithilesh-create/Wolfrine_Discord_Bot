require("dotenv").config();
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

client.login(process.env.TOKEN);
