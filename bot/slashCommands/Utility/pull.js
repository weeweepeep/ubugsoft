module.exports = {
    name: "pull",
    description: "pull a member to ur voice channel",
    permissions: "ADMINISTRATOR",
    category: "Music",
    usage: "/pull @<user>",
    options: [
        {
            name: "user",
            description: "the user u wanna pull to  the vc",
            type: 9,
            required: true,
        }
    ],

    async execute(client, interaction) {
        const member = interaction.options.getMentionable("user")
        if(!member) return interaction.reply("Please mention a member in the server!");
        if(!member.voice.channel) {
            return interaction.reply("The member u mentioned isnt in a voice channel!");

        }

        if(!interaction.member.voice.channel)
        return interaction.reply("please join a voice channel first!");
        member.voice.setChannel(interaction.member.voice.channel);
        interaction.reply("pulled member to ur voice channel!")
    }
}