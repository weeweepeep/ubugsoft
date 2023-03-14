const { Database } = require('quickmongo')
const mongoDBURL = process.env.MONGO_DB
const quickmongo = new Database(mongoDBURL)

module.exports = {
    name: "suggest",
    description: "Creates a suggestion",
    category: "Music",
    usage: '?suggest <Your Suggestion> (make a channel called: suggestions)',
    cooldown: 1,

    async execute(client, message, args, Discord, cmd) {
        const query = args.join(" ")
        if (!query) return message.reply("State your suggestion please!")

        const image = message.attachments.first() ? message.attachments.first().proxyURL : null

        const sugEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("NEW SUGGESTION")
            .setDescription(`${query}\n\n\`Suggested by ${message.author.tag}\``)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setImage(image)
            .setTimestamp()

        const channel = message.guild.channels.cache.find(channel => channel.name.toLowerCase() === "suggestions")
          if(!channel) {
          return await message.reply("tell the owner to make a channel called suggestions")
       }
        const row = new Discord.MessageActionRow().addComponents(

            new Discord.MessageButton()
                .setCustomId("sug-acc")
                .setStyle("SUCCESS")
                .setLabel("ACCEPT"),

            new Discord.MessageButton()
                .setCustomId("sug-dec")
                .setStyle("DANGER")
                .setLabel("DECLINE"),

        )

        message.reply("Your suggestion has been submitted")

        const sugPage = await channel.send({ embeds: [sugEmbed], components: [row] })

        const col = await sugPage.createMessageComponentCollector({
            componentType: "BUTTON"
        })

        col.on("collect", async i => {

            const interactor = i.guild.members.cache.get(i.user.id)

            if (!interactor.permissions.has("MANAGE_GUILD")) return

            if (i.customId === "sug-acc") {

                const accEmbed = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setTitle("SUGGESTION ACCEPTED")
                    .setDescription(`Your suggestion on **${query}** has been accepted`)
                    .addFields([
                        { name: "Accepted by:", value: `${i.user.tag}`, inline: true },
                        { name: "Accepted in:", value: `${i.guild.name}`, inline: true },
                    ])
                    .setTimestamp()
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))

                message.author.send({ embeds: [accEmbed] }).catch(err => {

                    if (err.code !== 50007) return console.log(err)

                })

                col.stop("accepted")

            } else if (i.customId === "sug-dec") {

                const decEmbed = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle("SUGGESTION DECLINED")
                    .setDescription(`Your suggestion on **${query}** has been declined`)
                    .addFields([
                        { name: "Declined by:", value: `${i.user.tag}`, inline: true },
                        { name: "Declined in:", value: `${i.guild.name}`, inline: true },
                    ])
                    .setTimestamp()
                    .setThumbnail(message.guild.iconURL({ dynamic: true }))

                message.author.send({ embeds: [decEmbed] }).catch(err => {

                    if (err.code !== 50007) return console.log(err)

                })

                col.stop("declined")

            }

        })

        col.on("end", async (collected, reason) => {

            if (reason === "accepted") {

                const accEmbed1 = new Discord.MessageEmbed()
                    .setColor("GREEN")
                    .setTitle("SUGGESTION ACCEPTED")
                    .setDescription(`${query}\n\n\`Suggested by ${message.author.tag}\``)
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setImage(image)
                    .setTimestamp()

                sugPage.edit({ embeds: [accEmbed1], components: [] })

            } else if (reason === "declined") {

                const decEmbed1 = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle("SUGGESTION DECLINED")
                    .setDescription(`${query}\n\n\`Suggested by ${message.author.tag}\``)
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
                    .setImage(image)
                    .setTimestamp()

                sugPage.edit({ embeds: [decEmbed1], components: [] })

            } 

        })
    
    }
}