const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "membercount",
    category: "Information",
    usage: "/membercount",
    description: "embed for membercount",
    async execute(client, interaction, args,) {
        const membersInServer = interaction.guild.memberCount;
        let embed = new MessageEmbed()
        .setTitle('Total Members')
        .setDescription(`**${interaction.guild.name} has ${membersInServer} members in the server**`)
        .setThumbnail(interaction.guild.iconURL({ size: 4096, dynamic: true}))
        .setTimestamp()
        interaction.reply({ embeds: [embed]})
    }
}