const ytdl = require('ytdl-core');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const opus = require('opusscript'); // Assuming opus encoding

module.exports = {
  name: 'play',
  description: 'Plays music from YouTube',
  aliases: ['p'],

  async execute(message, args) {
    if (!args.length) {
      return message.reply('You need to provide a YouTube URL to play!');
    }

    const url = args[0];

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

      const stream = ytdl(url, { filter: 'audioonly', type: 'opus' }); // Assuming opus stream
      const ytdlOptions = { filter: '', type: 'opus', highWaterMark: 1 << 25 }; // Adjust highWaterMark if needed
      const player = createAudioPlayer();
      const resource = createAudioResource(stream);

      await player.play(resource);
      connection.subscribe(player); // Subscribe player to connection

      let title = 'Unknown Title';
      if (stream.info && stream.info.title) {
        title = stream.info.title;
      } else {
        // Consider using ytdl-core's getInfo method for full info retrieval (optional)
      }
      message.reply(`Now playing: ${title}`);

      // Error handling and disconnect logic
      player.on('error', (error) => {
        console.error(error);
        message.reply('There was an error playing the audio!');
        connection.destroy(); // Disconnect on error
      });

      player.on('idle', () => {
        connection.destroy(); // Disconnect on finish
      });
    } catch (error) {
      console.error(error);
      message.reply('There was an error joining the voice channel!');
    }
  },
};
