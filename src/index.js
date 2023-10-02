require("dotenv").config();
const getDb = require("./db");
const getCommands = require("./commands");
const { client } = require("./router/client");
const { register } = require("./router/register");

getDb()
  .then(() => {
    getCommands();
  })
  .then(() => {
    client.on("ready", (client) => {
      console.log(`${client.user.username} is now awaken !`);
    });

    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
      if (interaction.commandName === "register") {
        const res = await register(interaction);
        if (res) {
          if (res == 2) {
            await interaction.reply({
              content: `Hello ${interaction.user.globalName} , You have already registered to this event.`,
              ephemeral: true,
            });
          } else {
            await interaction.reply({
              embeds: [res],
              content: `Hello ${interaction.user.globalName} , You have now successfully registered to this event.`,
              ephemeral: true,
            });
          }
        } else {
          await interaction.reply({
            content: `Sorry ${interaction.user.globalName} , we are facing an issue while registering you 😵 .\n\n Please try again after some time or contact the moderator of server .`,
            ephemeral: true,
          });
        }
      }
    });

    client.login(process.env.TOKEN);
  });
