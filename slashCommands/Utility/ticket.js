const Discord = require('discord.js')
const simplydjs = require("simply-djs")
module.exports = {
    name: 'ticket',
    description: 'Creates Tickets',
    permissions: "MANAGE_GUILD",
    execute: async (client, interaction) => {
simplydjs.ticketSystem(interaction, interaction.channel, {
     embedDesc: 'Click The Button To Make Ticket', // default: '🎫 Create a ticket by clicking the button 🎫'
    embedColor: '', // default: #075FFFF
    embedFoot: '[support server](https://discord.gg/tBjawBEdWa)', // default: interaction.guild.name
    emoji: '', // default:, 🎫
    color: '', // default: blurple
})
}
}