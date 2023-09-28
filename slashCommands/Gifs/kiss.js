const API = require('anime-images-api')
const { MessageEmbed } = require("discord.js")
const images_api = new API() 
module.exports = {
name: "kiss",
description: "kiss someone",
options: [
    {
        name: "user",
        description: "the user u wanna kiss",
        type: "USER",
        required: true,
    }
],
async execute(client, interaction) {
        const user = interaction.options.getUser("user")
        if(!user) {
message.reply("Please provide the user u wanna kiss!")
        return;}
        images_api.sfw.kiss().then(response => {
           const embed = new MessageEmbed()
    .setDescription(`${interaction.user.username} kissed ${user.tag}!`)
    .setImage(response.image)
            interaction.reply({ embeds: [embed]})
        }) 
}
}