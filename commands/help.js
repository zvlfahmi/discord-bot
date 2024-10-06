module.exports = {
    name: "help",
    description: "help",

    async execute (message, args) {
        message.channel.send(`\`\`\`avatar, ban, clean, help, info, ping, play, stop\`\`\``);
    }
}