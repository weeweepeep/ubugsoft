const { CommandInteraction, MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const client= require("../index")
const cooldown = require('../models/cooldown')
require("dotenv").config()

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction  
     * @returns 
     */
    async execute(interaction) {
        if (interaction.user.bot || interaction.channel.type === "dm") return
        if(interaction.isCommand) {
            const command = client.slash_commands.get(interaction.commandName);
            if(!command) return client.commands.delete(interaction.commandName)
            let options = interaction.options._hoistedOptions
            const profileModel = require("../models/profileSchema");
    
  
    let profileData;
    try {
      profileData = await profileModel.findOne({ userID: interaction.user.id });
      if (!profileData) {
        let profile = await profileModel.create({
          userID: interaction.user.id,
          serverID: interaction.guild.id,
          coins: 1000,
          bank: 0,
        
        });profile.save();
      }
      }catch (err) {
      console.log(err);
    }
            function delay (ms) {
        return new Promise(r => setTimeout(r, ms))
    }
                           
            async function commandExecute(){
    if(command) command.execute(client, interaction, options, Discord, profileData)
}
if(command.cooldown) {
    const current_time = Date.now();
    const cooldown_amount = (command.cooldown) * 1000

    cooldown.findOne({ userId: interaction.user.id, cmd: command.name }, async(err, data) => {
        if(data) {
            const expiration_time = data.time + cooldown_amount;
        
            if(current_time < expiration_time) {
                const time_left = (expiration_time -  current_time) / 1000
    
                if(time_left.toFixed(1) >= 3600){
                    let hour = (time_left.toFixed(1) / 3600);
                    return interaction.reply(`Please wait ${parseInt(hour)} more hours before using \`${command.name}\`!`)
                    
                }
                if(time_left.toFixed(1) >= 60) {
                    let minute = (time_left.toFixed(1) / 60);
                    return interaction.reply(`Please wait ${parseInt(minute)} more minutes before using \`${command.name}\`!`)
                    
                }
                let seconds = (time_left.toFixed(1));
                return interaction.reply(`Please wait ${parseInt(seconds)} more seconds before using \`${command.name}\`!`)
      
            } else {
                await cooldown.findOneAndUpdate({ userId: interaction.user.id, cmd: command.name }, { time: current_time });
                commandExecute();
            }
        } else {
            commandExecute();
            new cooldown({
                userId: interaction.user.id,
                cmd: command.name,
                time: current_time,
                cooldown: command.cooldown,
            }).save();
        }
    })
} else {
    commandExecute();
};
        }
    }
}