module.exports = {
    name: 'ban',
    description: 'Bans a tagged member from the server.',
    async execute(message, args) {
      const reason = args.slice(1).join(' ') || 'No reason provided'; // Reason for ban (optional)
  
      if (!message.member.permissions.has('BAN_MEMBERS')) {
        return message.reply('You don\'t have the permissions to use this command.');
      }
  
      if (!message.mentions.members.size) {
        return message.reply('You must tag a member to ban.');
      }
  
      const targetMember = message.mentions.members.first();
  
      if (targetMember.id === message.guild.ownerID) {
        return message.reply('You cannot ban the server owner.');
      }
  
      if (targetMember.roles.highest.position >= message.member.roles.highest.position) {
        return message.reply('You cannot ban a member with a higher or equal role.');
      }
  
      try {
        await targetMember.ban({ reason });
        message.channel.send(`${targetMember.user.tag} has been banned.`);
      } catch (error) {
        console.error('Error banning member:', error);
        message.reply('An error occurred while banning the member.');
      }
    },
  };
  