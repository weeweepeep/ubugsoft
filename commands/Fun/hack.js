const { MessageEmbed } = require('discord.js')
const { randomPassword, randomNumber, ipAddress } = require('tech-tip-cyber') // npm i tech-tip-cyber@latest // For Random Age, Password And IP Address
const randomMail = require('tech-tip-cyber') // npm i tech-tip-cyber@latest // For Random Email

module.exports = {
    name: "hack", // You Can Keep Any Name
    description: 'Hack SomeOne', // Optional
    usage: "?hack @<user>",

    execute: async (client, message, args) => {

        const user = message.member
        const mention = message.mentions.members.first() || message.guild.members.cache.find(member => member.user.username.toLowerCase() === args.join(" ").toLowerCase()) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(member => member.displayName.toLowerCase() === args.join(" ").toLowerCase())
        if (!mention) return message.reply(`Who You Want To Hack?`) // If No User Is Mentioned

            const disemail = randomMail({ // Random Email For Discord Email
                domain: 'larryisgay@gmail.com' // You Can Keep Any Domain
            })

            const email = randomMail({ // Random Email For Gmail
                domain: 'gmail.com' // You Can Keep Any Domain
            })

            const dispassword = randomPassword(12) // Length Is 12 Of Password // Password For Discord

            const password = randomPassword(12) // Length Is 12 Of Password // Password For Gmail
 
            const ip = ipAddress() // Random IP Address

            const age = await randomNumber({ // Random Age
                Minimum: 8, // Minimum Number
                Maximum: 62, // Maximum Number
            }) // Will Show OutPut From 8(Minimum) To 70(Minimum+Maximum)(8+62)

            message.channel.send(`Starting To Hack ${mention.user.username}`).then(message => { // Edit Message
                setTimeout(function () {
                    message.edit(`Logging In To Discord Account...`)
                }, 2000)
                setTimeout(function () {
                    message.edit(`Logging In To Discord Account. 2FA Passed`)
                }, 5000)
                setTimeout(function () {
                    message.edit(`Logged In To Discord Of ${mention.user.username}\nEmail: ${disemail}\nPassword: ${dispassword}`)
                }, 8000)
                setTimeout(function () {
                    message.edit(`Injecting Virus In #${mention.user.discriminator}`)
                }, 11000)
                setTimeout(function () {
                    message.edit(`Successfully Injected Virus In #${mention.user.discriminator}`)
                }, 15000)
                setTimeout(function () {
                    message.edit(`Hacking Gmail Account...`)
                }, 18000)
                setTimeout(function () {
                    message.edit(`Hacking Gmail Account... Getting Password`)
                }, 22000)
                setTimeout(function () {
                    message.edit(`Hacked Gmail Account Of ${mention.user.username}\nEmail: ${email}\nPassword: ${password}`)
                }, 26000)
                setTimeout(function () {
                    message.edit(`Getting IP Address For You To Hack PC...`)
                }, 30000)
                setTimeout(function () {
                    message.edit(`Found IP Addrss Of ${mention.user.username}\nIP: ${ip}`)
                }, 35000)
                setTimeout(function () {
                    message.edit(`Getting Age For Personal Details...`)
                }, 37000)
                setTimeout(function () {
                    message.edit(`Found Age Of ${mention.user.username}\nAge: ${age}`)
                }, 40000)
                setTimeout(function () {
                    message.edit(`<a:bluecheck:817793462736781343> Successfully Hacked ${mention.user.username}`)
                }, 45000)
            })
            
        }
    }