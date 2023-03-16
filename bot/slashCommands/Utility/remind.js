const ms = require('ms')

module.exports = {
    name: "remind",
    cooldown: 5,
    usage: "/remind <time> <reminder>",
    description:  "Helps remind you something",
    options: [
        {
            name: "time",
            description: "how many d, m, h, or s later to  remind u",
            type: 4,
            required: true,
        },
        {
            name: "reminder",
            description: "the thing u wanna be reminded",
            type: 3,
            required: true,
        }
    ],
    async execute(client, interaction, args, Discord) {
        let time = interaction.options.getInteger("time")
        let user = interaction.user
        let reminder = interaction.options.getString("reminder")

        const notime = new Discord.MessageEmbed()
            .setColor('#F30B04')
            .setDescription(`**Please specify the time!**`)

        const wrongtime = new Discord.MessageEmbed()
            .setColor('#F30B04')
            .setDescription(`**Sorry I only do d, m, h, or s.**`)

        const reminderembed = new Discord.MessageEmbed()
            .setColor('#F30B04')
            .setDescription(`**Please tell me what you want to be reminded off**`)
        if (
            !interaction.options.getString("reminder").endsWith("d") &&   
            !interaction.options.getString("reminder").endsWith("m") &&
            !interaction.options.getString("reminder").endsWith("h") &&
            !interaction.options.getString("reminder").endsWith("s")
        )


            return interaction.reply({embeds:[wrongtime]})
        if (!reminder) return interaction.reply({embeds:[reminderembed]})

        const remindertime = new Discord.MessageEmbed()
        .setColor('#33F304')
        .setDescription(`\**Your reminder will go off in ${time}**`)

        interaction.reply({embeds:[remindertime]})

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