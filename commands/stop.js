const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
  name: 'stop',
  description: 'Stops the music playback and leaves the voice channel',

  async execute(message) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply('You need to be in a voice channel to use this command!');
    }

    try {
      const connection = await joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
      });

      connection.destroy(); // Disconnect from voice channel
      message.reply('Stopped playing and left the voice channel.');
    } catch (error) {
      console.error('Error leaving voice channel:', error);
      message.reply('There was an error stopping the music!');
    }
  },
};
