const { Database } = require('quickmongo')
const mongoDBURL = process.env.MONGO_DB
const quickmongo = new Database(mongoDBURL)

module.exports = {
    name: "suggest",
    description: "Creates a suggestion",
    category: "Music",
    usage: '/suggest <Your Suggestion> (make a channel called: suggestions)',
    cooldown: 1,
    options: [
        {
            name: "suggestion",
            description: "the suggestion u wanna send",
            type: 3,
            required: true,
        }
    ],

    async execute(client, interaction, options, Discord) {
        const query = interaction.options.getString("suggestion")
        if (!query) return interaction.reply("State your suggestion please!")

        const image = interaction.attachments.first() ? interaction.attachments.first().proxyURL : null

        const sugEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("NEW SUGGESTION")
            .setDescription(`${query}\n\n\`Suggested by ${interaction.user.tag}\``)
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setImage(image)
            .setTimestamp()

        const channel = interaction.guild.channels.cache.find(channel => channel.name.toLowerCase() === "suggestions")
          if(!channel) {
          return await interaction.reply("tell the owner to make a channel called suggestions")
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

        interaction.reply("Your suggestion has been submitted")

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
                    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))

                interaction.user.send({ embeds: [accEmbed] }).catch(err => {

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
                    .setThumbnail(interaction.guild.iconURL({ dynamic: true }))

                interaction.user.send({ embeds: [decEmbed] }).catch(err => {

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
                    .setDescription(`${query}\n\n\`Suggested by ${interaction.user.tag}\``)
                    .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                    .setImage(image)
                    .setTimestamp()

                sugPage.edit({ embeds: [accEmbed1], components: [] })

            } else if (reason === "declined") {

                const decEmbed1 = new Discord.MessageEmbed()
                    .setColor("RED")
                    .setTitle("SUGGESTION DECLINED")
                    .setDescription(`${query}\n\n\`Suggested by ${interaction.user.tag}\``)
                    .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                    .setImage(image)
                    .setTimestamp()

                sugPage.edit({ embeds: [decEmbed1], components: [] })

            } 

        })
    
    }
}