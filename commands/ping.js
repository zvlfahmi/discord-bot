const { Client, GatewayIntentBits, Collection } = require("discord.js");
const client = new Client({intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]});

  module.exports = {
    name: 'ping', // Name of the command (used to trigger it)
    description: 'Checks the bot\'s latency', // Short description displayed in help commands
  
    async execute(message, args) {
      const sent = await message.reply('Pinging...'); // Send a temporary message for user feedback
      const pingTime = sent.createdTimestamp - message.createdTimestamp; // Calculate round-trip latency
  
      sent.edit(`Pong! Latency is ${pingTime}ms. API Latency is ${client.ws.ping}ms`); // Edit the temporary message with results
    },
  };
  