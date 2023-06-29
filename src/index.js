require('dotenv').config();
const Discord = require('discord.js');
const puppeteer = require('puppeteer');

const client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const websites = ['https://example1.com', 'https://example2.com', 'https://example3.com'];

  setInterval(async () => {
    for (let website of websites) {
   
      await page.goto(website);
      const data = await page.evaluate(() => {
      
        return document.body.innerHTML;
      });

    
      db.query('INSERT INTO data (site, data) VALUES (?, ?)', [website, data], (err, result) => {
        if (err) throw err;
        console.log('Data inserted');
      });
    }
  }, 1000 * 60 * 60); 
});

client.on("messageCreate", (msg) => {
  const content = msg.content.split(" ");
  const command = content[0];
  const args = content.slice(1);
  
  if (command === "!getData") {
    const website = args[0];
    db.query('SELECT data FROM data WHERE site = ? ORDER BY id DESC LIMIT 1', [website], (err, results) => {
      if (err) throw err;
      msg.reply(`Data for ${website}: ${results[0].data}`);
    });
  }
});

client.login(process.env.TOKEN);
