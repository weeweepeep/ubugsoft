const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "membercount",
    category: "Information",
    description: "embed for membercount",
    usage: "?membercount",
    async execute(client, message, args,) {
        const membersInServer = message.guild.memberCount;
        let embed = new MessageEmbed()
        .setTitle('Total Members')
        .setDescription(`**${message.guild.name} has ${membersInServer} members in the server**`)
        .setThumbnail(message.guild.iconURL({ size: 4096, dynamic: true}))
        .setTimestamp()
        message.channel.send({ embeds: [embed]})
    }
}