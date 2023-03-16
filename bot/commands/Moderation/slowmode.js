module.exports = {
    name: 'slowmode',
    description: 'Set Channel Slowmode.',
    usage: "?slowmode <time>",
    permissions: ["MANAGE_CHANNELS"],
    execute: async (client, message, args, Discord) => {
        let time = args[0]
        if(!time) {
return message.reply("please specify the time for slowmode!")}
        message.channel.setRateLimitPerUser(time, 'No Reason')
        const embed = new Discord.MessageEmbed()
        .setTitle('Changed channel slowmode!')
        .setColor('GREEN')
        .setTimestamp()
        .setDescription('I have sucessfully changed the channel slowmode that has been specified!')
        .addField('Time:', `> ${time} seconds!`, false)
        .addField('Responsible Moderator:', `> ${message.author}`, false)
        .addField('Server:', `> ${message.guild.name}`, false)
        message.reply({ embeds: [embed] })
    },
};