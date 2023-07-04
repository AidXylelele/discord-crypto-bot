require("dotenv").config();
const Discord = require("discord.js");
const cron = require("node-cron");
const { currenciesService } = require("./services/currencies.service");
const { apiWorkerQueue } = require("./queues/apiWorker.queue");
const { CRYPTOS, WORKER_FILE, TITLE, COLOR } = require("./consts/app.consts");

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  cron.schedule("* * * * * *", () => {
    apiWorkerQueue.push({ CRYPTOS, WORKER_FILE, process });
  });
});

client.on("messageCreate", async (msg) => {
  const content = msg.content.split(" ");
  const command = content[0];

  if (command === "!getData") {
    const currencies = await currenciesService.getAll();
    const embed = new Discord.EmbedBuilder().setTitle(TITLE).setColor(COLOR);

    for (const { name, price } of currencies) {
      embed.addFields({ name, value: price });
    }

    msg.channel.send({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
