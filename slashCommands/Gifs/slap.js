const API = require('anime-images-api')
const { MessageEmbed } = require("discord.js")
const images_api = new API() 
module.exports = {
name: "slap",
description: "slap someone",
options: [
    {
        name: "user",
        description: "the user to slap",
        type: "USER",
        required: true,
    }
],
async execute(client, interaction) {
       const user = interaction.options.getUser("user")
       if(!user) {
interaction.reply("Please provide the user u wanna slap!")
        return;}
        images_api.sfw.slap().then(response => {
            const embed = new MessageEmbed()
    .setDescription(`${interaction.user.username} slapped ${user.tag}!`)
    .setImage(response.image)
            interaction.reply({ embeds: [embed]})
        }) 
}
}