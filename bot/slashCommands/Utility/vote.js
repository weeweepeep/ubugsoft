module.exports = {
name: "vote",
description: "create a vote",
cooldown: 7,
permissions: "MANAGE_MESSAGES",
usage: "/vote",

async execute(client, interaction, options, Discord) {
  

    const filter = m => m.user.id == interaction.user.id;
    let embed = new Discord.interactionEmbed()
    .setFooter(`Vote has been made by ${interaction.user.tag}`)
    .setColor("#39138b")
    .setThumbnail(interaction.guild.iconURL())
    .setTimestamp();

    interaction.delete()
    interaction.channel.send('<:blurpleannouncements:859068819191496734> **What will be the title of voting?**').then(async msg => {
    try {
     
      let msg = await interaction.channel.awaitMessages({filter,  max: 1, time: 15000, errors: ['time'] });
      embed.setTitle(msg.first().content);
   
    } catch (err) {
      console.log(err);
      msg.edit(`You ran out of time be faster next time. Re-run the command`); return
    }



 
    msg.edit('<:blurplebell:859068871709032458> **What will be the first vote?**');
    try {
   
      let msg = await interaction.channel.awaitMessages({filter, max: 1, time: 15000, errors: ['time'] });
      embed.addField(`(🔴)--First option--(🔴)`, msg.first().content);
    
    
    } catch (err) {
      console.log(err);
      msg.edit(`You ran out of time be faster next time. Re-run the command`); return
    }




    msg.edit('<:blurplebell:859068871709032458> **What will be the Second vote?**');
    try {
    
      let msg = await interaction.channel.awaitMessages({filter, max: 1, time: 15000, errors: ['time'] });
      embed.addField(`(🔵)--Second option--(🔵)`, msg.first().content);
     
    } catch (err) {
      console.log(err);
      msg.edit(`You ran out of time be faster next time. Re-run the command`); return
    }

    await interaction.reply({embeds: [embed]}).then(sentinteraction => sentinteraction.react('🔴')).then(reaction => reaction.interaction.react('🔵'))
  })
  }
  }