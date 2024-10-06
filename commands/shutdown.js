const { Permissions, Client } = require('discord.js');

const authorizedUserId = '474523213108477955'; // Replace with actual ID

module.exports = {
  name: 'shutdown',
  description: 'Shuts down the bot (owner only)',

  async execute(message) {
    if (message.author.id !== authorizedUserId) {
      return message.reply('You are not authorized to use this command!');
    }

    await message.reply('Shutting down...');
    console.log(` [ / ] Signing Out from ${Client.name} and kill index.js process..`)
    process.exit(0); // Exit the Node.js process gracefully
  },
};
