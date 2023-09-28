const { CommandInteraction, MessageEmbed } = require("discord.js")
const Discord = require("discord.js")
const client= require("../index")
const cooldown = require('../models/cooldown')
require("dotenv").config()
const quick = require("quick.db")
const fetch = require("node-fetch")
const axios = require("axios")
const ms = require("ms")
const giveawayModel = require("../models/giveawaySchema")

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
            if(!command) return interaction.reply({ embeds: [
                new MessageEmbed()
                .setColor("RED")
                .setDescription("❌ An error occured while executing this command.")
            ]}) && client.commands.delete(interaction.commandName)
            let options = interaction.options._hoistedOptions
            const profileModel = require("../models/profileSchema");

            const { GiveawaysManager } = require('discord-giveaways');
const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
    // This function is called when the manager needs to get all giveaways which are stored in the database.
    async getAllGiveaways() {
        // Get all giveaways from the database. We fetch all documents by passing an empty condition.
        return await giveawayModel.find().lean().exec();
    }

    // This function is called when a giveaway needs to be saved in the database.
    async saveGiveaway(messageId, giveawayData) {
        // Add the new giveaway to the database
        await giveawayModel.create(giveawayData);
        // Don't forget to return something!
        return true;
    }

    // This function is called when a giveaway needs to be edited in the database.
    async editGiveaway(messageId, giveawayData) {
        // Find by messageId and update it
        await giveawayModel.updateOne({ messageId }, giveawayData, { omitUndefined: true }).exec();
        // Don't forget to return something!
        return true;
    }

    // This function is called when a giveaway needs to be deleted from the database.
    async deleteGiveaway(messageId) {
        // Find by messageId and delete it
        await giveawayModel.deleteOne({ messageId }).exec();
        // Don't forget to return something!
        return true;
    }
};

// Create a new instance of your new class
const manager = new GiveawayManagerWithOwnDatabase(client, {
    default: {
        botsCanWin: false,
        embedColor: '#FF0000',
        embedColorEnd: '#000000',
        reaction: '🎉'
    }
});
// We now have a giveawaysManager property to access the manager everywhere!
client.giveawaysManager = manager;
    
  
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