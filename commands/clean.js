const Discord = require('discord.js');

module.exports = {
  name: 'clean',
  aliases: ['clear'],
  description: 'Clears a specified number of messages from the channel.',
  async execute(message, args) {
    const amount = parseInt(args[0]) || 5; // Get amount or set default to 5
    if (isNaN(amount)) {
      return message.channel.send('Please enter a valid number of messages to clean.');
    }

    if (!message.member.permissionsIn(message.channel).has('MANAGE_MESSAGES')) {
      return message.channel.send("You don't have permissions to use this command!");
    }

    try {
      const deleted = await message.channel.messages.fetch({ limit: amount + 1 }); // Fetch including command message
      const filtered = deleted.filter(msg => !msg.pinned); // Filter out pinned messages

      await message.channel.bulkDelete(filtered, true); // Delete with reason
      //message.channel.send(`Deleted ${filtered.size} messages.`);
    } catch (error) {
      console.error(error);
      message.channel.send('An error occurred while cleaning messages.');
    }
  },
};
