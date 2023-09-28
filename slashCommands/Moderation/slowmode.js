module.exports = {
    name: 'slowmode',
    description: 'Set Channel Slowmode.',
    permissions: "MANAGE_CHANNELS",
    options: [
        {
            name: "time",
            description:  "the time for slowmode",
            type: 4,
            required: true,
        }
    ],
    execute: async (client, interaction, options, Discord) => {
        let time = interaction.options.getInteger("time")
        interaction.channel.setRateLimitPerUser(time, 'No Reason')
        const embed = new Discord.MessageEmbed()
        .setTitle('Changed channel slowmode!')
        .setColor('GREEN')
        .setTimestamp()
        .setDescription('I have sucessfully changed the channel slowmode that has been specified!')
        .addField('Time:', `> ${time} seconds!`, false)
        .addField('Responsible Moderator:', `> ${interaction.author}`, false)
        .addField('Server:', `> ${interaction.guild.name}`, false)
        interaction.reply({ embeds: [embed] })
    },
};