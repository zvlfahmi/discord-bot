const Discord = require("discord.js")
module.exports = {
    name: 'avatar',
    description: 'Displays the avatar of a user.',
    async execute(message, args) {
      const targetUser = message.mentions.users.first() || message.author; // Get the user (mentioned or author)
  
      const avatarURL = targetUser.avatarURL({ dynamic: true }); // Get the avatar URL with dynamic format
  
      if (!avatarURL) {
        return message.reply(`${targetUser.username} does not have an avatar.`);
      }
  
      const embed = new Discord.EmbedBuilder()
        .setColor(0x0099ff) // Adjust the embed color as desired
        .setTitle(`${targetUser.username}'s Avatar`)
        .setImage(avatarURL);
  
      message.channel.send({ embeds: [embed] });
    },
  };
  