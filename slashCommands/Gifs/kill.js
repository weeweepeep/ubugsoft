const API = require('anime-images-api')
const { MessageEmbed } = require("discord.js")
const images_api = new API() 
module.exports = {
name: "kill",
description: "kill someone",
options: [
    {
        name: "user",
        description: "the user to kill",
        type: "USER",
        required: true,
    }
],
async execute(client, interaction) {
               const user = interaction.options.getUser("user")
               if(!user) {
    interaction.reply("Please provide the user u wanna kill!")
               return;}
        images_api.sfw.kill().then(response => {
            const embed = new MessageEmbed()
    .setDescription(`${interaction.user.username} killed ${user.tag}!`)
    .setImage(response.image)
            interaction.reply({ embeds: [embed]})
        }) 
}
}