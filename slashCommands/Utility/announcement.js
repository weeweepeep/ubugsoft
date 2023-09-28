module.exports = {
    name: "announce",
    aliases: ["anc"],
    description: "Creates a announcement",
    category: "Utility",
    usage: '?announce <channel> <Announcement>',
    cooldown: 1,
    permissions: "MANAGE_GUILD",
    options: [
        {
            name: "channel",
            description: "the channel where u wanna post the announcement",
            type: 7,
            required: true,
        },
        {
            name: "announcement",
            description: "the message u wanna announce",
            type: 3,
            required: true,
        },
        {
            name: "ping",
            description: "the users u wanna ping",
            type: 9,
            required: false,
        }
    ],

    async execute(client, interaction, options, Discord) {
        const emojiA = "<a:stop:817792640199426119>"
        const channel = interaction.options.getChannel("channel")

        const anc = interaction.options.getString("announcement")

        if (!anc) return interaction.reply("Please provide what to announce!")

        let mention

        if (interaction.options.getString("ping") === "-ping") {


                if (interaction.options.getString("ping") === '-ping')


            mention = true

        } else mention = false

        if (mention === true) channel.send('@everyone')
        const ancEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
            .setTitle(`${emojiA}NEW ANNOUNCEMENT${emojiA}`)
            .setDescription(interaction.options.getString("announcement"))
            .setTimestamp()
        interaction.reply("sent the announcement!")
        channel.send({ embeds: [ancEmbed] }).then((msg) => {

            msg.react("⬆")
            msg.react("⬇")

            

        }).catch(err => {
            throw err
        })
    }
        

    }