const Discord = require('discord.js')
const simplydjs = require("simply-djs")
module.exports = {
    name: 'ticket',
    description: 'Creates Tickets',
    permissions: ["MANAGE_GUILD"],
    execute: async (client, message, args) => {
simplydjs.ticketSystem(message, message.channel, {
     embedDesc: 'Click The Button To Make Ticket', // default: '🎫 Create a ticket by clicking the button 🎫'
    embedColor: '', // default: #075FFFF
    embedFoot: '[support server](https://discord.gg/tBjawBEdWa)', // default: message.guild.name
    emoji: '', // default:, 🎫
    color: '', // default: blurple
})
}
}