require("dotenv").config();
const getDb = require("./db");
const getCommands = require("./commands");
const { client } = require("./router/client");
const {
  register,
  getcompleted,
  getdata,
  registerEvent,
  registerTask,
  updateDailyTask,
  closeEvent,
} = require("./router/eventfunction");
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
    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
      if (interaction.commandName === "getdata") {
        let secret = interaction.options.get("secret-key");
        if (secret.value != process.env.SECRET_KEY) {
          await interaction.reply({
            content: `You are not authorized to use this command !`,
            ephemeral: true,
          });
          return;
        }
        const file = await getdata(interaction);
        if (!file) {
          await interaction.reply({
            content: `No active events !!!!!!!!!!!!`,
            ephemeral: true,
          });
          return;
        }
        await interaction.reply({
          content: `${file}`,
          ephemeral: true,
        });
      }
    });
    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
      if (interaction.commandName === "getcompleted") {
        let secret = interaction.options.get("secret-key");
        if (secret.value != process.env.SECRET_KEY) {
          await interaction.reply({
            content: `You are not authorized to use this command !`,
            ephemeral: true,
          });
          return;
        }
        const file = await getcompleted(interaction);
        if (!file) {
          await interaction.reply({
            content: `No active events !!!!!!!!!!!!`,
            ephemeral: true,
          });
          return;
        }
        await interaction.reply({
          content: `${file}`,
          ephemeral: true,
        });
      }
    });
    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
      if (interaction.commandName === "daily") {
        let taskurl = interaction.options.get("taskurl");
        let posturl = interaction.options.get("posturl");

        const res = await updateDailyTask(
          interaction,
          taskurl.value,
          posturl.value
        );
        if (res) {
          if (res == 5) {
            await interaction.reply({
              content: `Hello ${interaction.user.globalName} , there is no active task right now !`,
              ephemeral: true,
            });
          }
          if (res == 4) {
            await interaction.reply({
              content: `You are disqualified from event, Submission Discarded !`,
              ephemeral: true,
            });
          } else if (res == 3) {
            await interaction.reply({
              content: `There are no active events right now, Submission Discarded !`,
              ephemeral: true,
            });
          } else if (res == 2) {
            await interaction.reply({
              content: `Hello ${interaction.user.globalName} , You have not registered for this event !`,
              ephemeral: true,
            });
          } else {
            await interaction.reply({
              content: `Hello ${interaction.user.globalName} , You have Successfully Submitted today's task !`,
              ephemeral: true,
            });
          }
        } else {
          await interaction.reply({
            content: `Sorry ${interaction.user.globalName} , we are facing an issue while submitting your task 😵 .\n\n Please try again after some time or contact the moderator of server .`,
            ephemeral: true,
          });
        }
      }
    });
    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
      if (interaction.commandName === "register-event") {
        let title = interaction.options.get("event-title");
        let start = interaction.options.get("event-start-date");
        let end = interaction.options.get("event-end-date");
        let numberOfSubmissions = interaction.options.get(
          "number-of-submissions"
        );
        let secret = interaction.options.get("secret-key");
        if (secret.value != process.env.SECRET_KEY) {
          await interaction.reply({
            content: `You are not authorized to create events !`,
            ephemeral: true,
          });
          return;
        }
        const res = await registerEvent(
          interaction,
          title.value,
          start.value,
          end.value,
          numberOfSubmissions.value
        );
        if (res) {
          if (res == 2) {
            await interaction.reply({
              content: `Hello ${interaction.user.globalName} , there is already an active event going on in this channel !`,
              ephemeral: true,
            });
          } else {
            await interaction.reply({
              content: `Hello ${interaction.user.globalName} , You have Successfully created event ${title.value} !`,
              ephemeral: true,
            });
          }
        } else {
          await interaction.reply({
            content: `Sorry ${interaction.user.globalName} , we are facing an issue while creating your event 😵 .\n\n Please try again after some time .`,
            ephemeral: true,
          });
        }
      }
    });
    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
      if (interaction.commandName === "close-event") {
        let secret = interaction.options.get("secret-key");
        if (secret.value != process.env.SECRET_KEY) {
          await interaction.reply({
            content: `You are not authorized to use this command !`,
            ephemeral: true,
          });
          return;
        }
        const file = await closeEvent(interaction);
        if (file) {
          if (file == 1) {
            await interaction.reply({
              content: `No active events !!!!!!!!!!!!`,
              ephemeral: true,
            });
            return;
          } else {
            await interaction.reply({
              embeds: [file],
              ephemeral: true,
            });
          }
        } else {
          await interaction.reply({
            content: `Sorry ${interaction.user.globalName} , we are facing an issue while closing your event 😵 .\n\n Please try again after some time .`,
            ephemeral: true,
          });
        }
      }
    });
    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
      if (interaction.commandName === "register-task") {
        let secret = interaction.options.get("secret-key");
        let title = interaction.options.get("task-title");

        if (secret.value != process.env.SECRET_KEY) {
          await interaction.reply({
            content: `You are not authorized to use this command !`,
            ephemeral: true,
          });
          return;
        }
        const res = await registerTask(interaction, title.value);
        if (res) {
          if (res == 2) {
            await interaction.reply({
              content: `No active events or all event tasks are added !!!!!!!!!!!!`,
              ephemeral: true,
            });
          } else {
            await interaction.reply({
              content: `Today's task registered !!!!!!!!!!!!`,
              ephemeral: true,
            });
          }
        } else {
          await interaction.reply({
            content: `Sorry ${interaction.user.globalName} , we are facing an issue while registering today's task 😵 .\n\n Please try again after some time .`,
            ephemeral: true,
          });
        }
      }
    });

    client.login(process.env.TOKEN);
  });
