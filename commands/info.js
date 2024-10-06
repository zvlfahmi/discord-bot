// at the top of your file
const { EmbedBuilder } = require('discord.js');
const os = require('os')

module.exports = {
	name: 'info', // Name of the command (used to trigger it)
    description: 'Checks the bot\'s latency', // Short description displayed in help commands
  
	async execute(interaction) {
        // inside a command, event listener, etc.
        const cpu = os.cpus();
        const fmem = Math.round((os.freemem())/1000000000);
        const uptime = Math.round((os.uptime)/86400);
        const hwinfo = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Hardware Info')
            .setDescription('let\'s see how poor the developer of this bot is')
            .addFields({name: `CPU`, value: `Intel i5-6300U Skylake ${cpu.length} Core`})
            .addFields({name: `RAM`, value: `${fmem}GB out of 8GB`})
            .addFields({name: `Operating System`, value: `${os.type()}`})
            .addFields({name: `Architecture`, value: `${os.machine()}`})
            .addFields({name: `Uptime`, value: `${uptime} day(s)`})
            .setTimestamp()

		await interaction.channel.send({ embeds: [hwinfo] });
	},
};