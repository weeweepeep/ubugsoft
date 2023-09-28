const { MessageEmbed }= require('discord.js');
const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');


module.exports = {
        name: "botinfo",
        aliases: ['stats'],
        category: "Information",
        description: "Shows Bot Statistics",
        async execute(client, interaction)  {
            
        
        const d = moment.duration(interaction.client.uptime);
        const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
        const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
        const clientStats = stripIndent`
          Servers   :: ${interaction.client.guilds.cache.size}
          Users     :: ${interaction.client.users.cache.size}
          Channels  :: ${interaction.client.channels.cache.size}
          WS Ping   :: ${Math.round(interaction.client.ws.ping)}ms
          Uptime    :: ${days} and ${hours}
       `;
        const { totalMemMb, usedMemMb } = await mem.info();
        const serverStats = stripIndent`
          OS        :: ${await os.oos()}
          Cores     :: ${cpu.count()}
          CPU Usage :: ${await cpu.usage()} %
          RAM       :: ${totalMemMb} MB
          RAM Usage :: ${usedMemMb} MB
        `;
    
        const embed = new MessageEmbed()
        .setTitle('Bot\'s Statistics')
        .addField('Commands', `\`${interaction.client.commands.size}\` commands`, true)
        .addField('Client', `\`\`\`asciidoc\n${clientStats}\`\`\``)
        .addField('Server', `\`\`\`asciidoc\n${serverStats}\`\`\``)
        .setFooter(interaction.member.displayName,  interaction.user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(interaction.guild.me.displayHexColor);
        interaction.reply({ embeds: [embed] });
     }
}