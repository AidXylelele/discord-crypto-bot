require("dotenv").config();
const Discord = require("discord.js");
const cron = require("node-cron");
const { dataService } = require("./services/data.service");

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  cron.schedule("* * * * *", dataService.setData);
});

client.on("messageCreate", async (msg) => {
  const content = msg.content.split(" ");
  const command = content[0];

  if (command === "!getData") {
    const data = await dataService.getData();
    msg.reply(JSON.stringify(data));
  }
});

client.login(process.env.TOKEN);
