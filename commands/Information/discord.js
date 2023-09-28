module.exports = {
    name: 'discord',
    aliases: ['server', 'serv'],
    category: "Information",
    description: "invite to support server!",
    execute(client, message, args, Discord){
        message.channel.send('https://discord.gg/4VcHRsS7bD');
    }
}