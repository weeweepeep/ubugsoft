const { Client, Guild, MessageEmbed } = require("discord.js")

module.exports = {
    name: "guildCreate",
    /**
    *@param {Guild} guild
    */
    async execute(guild) {
const { name, client, id, ownerId } = guild
const size = client.guilds.cache.size
const ownerName = client.users.cache.get(ownerId).tag
let channelToSend;
guild.channels.cache.forEach((channel) => {

    if (channel.type === "GUILD_TEXT" && !channelToSend && channel.permissionsFor(guild.me).has("SEND_MESSAGES")) channelToSend = channel

})

if (!channelToSend) return;

const channelEmbed = new MessageEmbed()
    .setAuthor({ name: name, iconURL: guild.iconURL({ dynamic: true }) })
    .setTitle("**Thanks for inviting me!**")
    .setDescription("my prefix is **?**")
    .setColor('BLUE')
    .addFields([
        {name: "Owner Info", value: `<@${ownerId}> | ${(ownerId)} | ${ownerName}`},
        {name: "help", value: "**?help** for all my commands!"}
    ])
    .setFooter({ text: `currently in ${size} servers!`})
    .setTimestamp()

channelToSend.send({ embeds: [channelEmbed] }).catch(err => {
    if (err) return
})
    }
}