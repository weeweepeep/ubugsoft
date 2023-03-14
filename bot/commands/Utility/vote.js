module.exports = {
name: "vote",
description: "create a vote",
cooldown: 7,
permissions: ["MANAGE_MESSAGES"],
usage: "?vote",

async execute(client, message, args, Discord) {
  

    const filter = m => m.author.id == message.author.id;
    let embed = new Discord.MessageEmbed()
    .setFooter(`Vote has been made by ${message.author.tag}`)
    .setColor("#39138b")
    .setThumbnail(message.guild.iconURL())
    .setTimestamp();

    message.delete()
    message.channel.send('<:blurpleannouncements:859068819191496734> **What will be the title of voting?**').then(async msg => {
    try {
     
      let msg = await message.channel.awaitMessages({filter,  max: 1, time: 15000, errors: ['time'] });
      embed.setTitle(msg.first().content);
   
    } catch (err) {
      console.log(err);
      msg.edit(`You ran out of time be faster next time. Re-run the command`); return
    }



 
    msg.edit('<:blurplebell:859068871709032458> **What will be the first vote?**');
    try {
   
      let msg = await message.channel.awaitMessages({filter, max: 1, time: 15000, errors: ['time'] });
      embed.addField(`(🔴)--First option--(🔴)`, msg.first().content);
    
    
    } catch (err) {
      console.log(err);
      msg.edit(`You ran out of time be faster next time. Re-run the command`); return
    }




    msg.edit('<:blurplebell:859068871709032458> **What will be the Second vote?**');
    try {
    
      let msg = await message.channel.awaitMessages({filter, max: 1, time: 15000, errors: ['time'] });
      embed.addField(`(🔵)--Second option--(🔵)`, msg.first().content);
     
    } catch (err) {
      console.log(err);
      msg.edit(`You ran out of time be faster next time. Re-run the command`); return
    }

    await message.channel.send({embeds: [embed]}).then(sentMessage => sentMessage.react('🔴')).then(reaction => reaction.message.react('🔵'))
  })
  }
  }