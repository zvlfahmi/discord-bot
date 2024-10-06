require("dotenv").config();
const fs = require('fs');
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const client = new Client({intents: [GatewayIntentBits.GuildMembers, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates]});

console.log(`[ / ] Starting index.js`);

client.commands = new Collection(); // Create a collection to store commands

const commandFiles = fs.readdirSync('./commands') // Get all command files
  .filter(file => file.endsWith('.js')); // Filter for .js files

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  console.log(`[ OK ] Loaded command ${command.name.toLowerCase()}`);
  client.commands.set(command.name, command); // Add command to collection
}

console.log("> Login to Discord");

client.on('ready', () => {
  console.log(`[ OK ] Logged in as ${client.user.tag}\n[ ! ] Log start from here`);
});

client.on('messageCreate', async message => {

    //Chat logging for Debugging Purposes, disable when not in use
    console.log(`'${message.guild.name}' in #${message.channel.name} | ${message.author.username} : ${message.content}`);
    
  //Command Handler, borrowed from Alfandi Putra's Nanahira Repo (https://github.com/0x32bit), improved it myself
  if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/); // Split arguments
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)); // Check for aliases
  if (!command) {
    console.log(`${message.author.username} tried to use ${commandName} but it doesn't exist`);
    return
  };
  
  try {
    await command.execute(message, args);
    console.log(`'${message.guild.name}' in #${message.channel.name} | ${message.author.username} used ${commandName} command`)
  } catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command!');
  }
});
client.login(process.env.TOKEN);