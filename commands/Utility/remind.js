const ms = require('ms')

module.exports = {
    name: "remind",
    cooldown: 5,
    usage: "?remind <time> <reminder>",
    description:  "Helps remind you something",
    async execute(mclient, message, args, Discord) {
        let time = args[0];
        let user = message.author
        let reminder = args.splice(1).join(' ')

        const notime = new Discord.MessageEmbed()
            .setColor('#F30B04')
            .setDescription(`**Please specify the time!**`)

        const wrongtime = new Discord.MessageEmbed()
            .setColor('#F30B04')
            .setDescription(`**Sorry I only do d, m, h, or s.**`)

        const reminderembed = new Discord.MessageEmbed()
            .setColor('#F30B04')
            .setDescription(`**Please tell me what you want to be reminded off**`)

        if (!args[0]) return message.channel.send({embeds:[notime]})
        if (
            !args[0].endsWith("d") &&   
            !args[0].endsWith("m") &&
            !args[0].endsWith("h") &&
            !args[0].endsWith("s")
        )


            return message.channel.send({embeds:[wrongtime]})
        if (!reminder) return message.channel.send({embeds:[reminderembed]})

        const remindertime = new Discord.MessageEmbed()
        .setColor('#33F304')
        .setDescription(`\**Your reminder will go off in ${time}**`)

        message.channel.send({embeds:[remindertime]})

        const reminderdm = new Discord.MessageEmbed()
        .setColor('#7289DA')
        .setTitle('**REMINDER**')
        .setDescription(`**It has been ${time} here is your reminder:** ${reminder}`)  

        setTimeout(async function () {
           try{

            await user.send({ embeds: [reminderdm] })
           }catch(err){

           } 
           
        }, ms(time));
    }
}