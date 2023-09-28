module.exports = {
    name: 'discord',
    aliases: ['server', 'serv'],
    category: "Information",
    description: "invite to support server!",
    execute(client, interaction, options){
        interaction.reply('https://discord.gg/4VcHRsS7bD');
    }
}