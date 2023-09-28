const API = require('anime-images-api')
const { MessageEmbed } = require("discord.js")
const images_api = new API() 
module.exports = {
name: "hug",
description: "hug someone",
options: [
    {
        name: "user",
        description: "the user to hug",
        type: "USER",
        required: true,
    }
],
async execute(client, interaction) {
       const user = interaction.options.getUser("user")
       if(!user) {
interaction.reply("Please provide the user u wanna hug!")
       return;
       }
        images_api.sfw.hug().then(response => {
             const embed = new MessageEmbed()
    .setDescription(`${interaction.user.username} hugged ${user.tag}!`)
    .setImage(response.image)
            interaction.reply({ embeds: [embed]})
        }) 
}
}