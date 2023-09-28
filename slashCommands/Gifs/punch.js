const API = require('anime-images-api')
const { MessageEmbed } = require("discord.js")
const images_api = new API() 
module.exports = {
name: "punch",
description: "punch someone",
options: [
    {
        name: "user",
        description: "the user to punch",
        type: "USER",
        required: true,
    }
],
async execute(client, interaction) {
    const user = interaction.options.getUser("user")
        if(!user) {
interaction.reply("Please provide the user u wanna punch!")
        return;}
    images_api.sfw.punch().then(response => {
            const embed = new MessageEmbed()
    .setDescription(`${interaction.user.username} punched ${user.tag}!`)
    .setImage(response.image)
            interaction.reply({ embeds: [embed]})
        }) 
}
}