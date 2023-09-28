const API = require('anime-images-api')
const { MessageEmbed } = require("discord.js")
const images_api = new API() 
module.exports = {
name: "cuddle",
description: "cuddle someone",
options: [
    {
        name: "user",
        description: "the user u wanna cuddle",
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
        images_api.sfw.cuddle().then(response => {
            const embed = new MessageEmbed()
    .setFooter(`${interaction.user.username} is cuddling ${user.tag}!`)
    .setImage(response.image)
            interaction.reply({ embeds: [embed]})
        }) 
}
}