const client = require("../index")
const cooldown = require('../models/cooldown')
require("dotenv").config()
const Discord = require('discord.js')
const { MessageEmbed } = require("discord.js")
const ms = require("ms")

client.on("messageCreate", async (message) => {
    
    
    let prefix = process.env.PREFIX;

    if (!message.content.startsWith(prefix) || message.author.bot || message.channel.type === "dm") return
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();
    

    
    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));
    if(!command) return message.reply(":x: | **this command doesn't exist!**")
    .then(async x => {
      await delay(5000);
      return x.delete();
    })
    
    function delay (ms) {
        return new Promise(r => setTimeout(r, ms))
    }
   
    const validPermissions = [
      "CREATE_INSTANT_INVITE",
      "KICK_MEMBERS",
      "BAN_MEMBERS",
      "ADMINISTRATOR",
      "MANAGE_CHANNELS",
      "MANAGE_GUILD",
      "ADD_REACTIONS",
      "VIEW_AUDIT_LOG",
      "PRIORITY_SPEAKER",
      "STREAM",
      "VIEW_CHANNEL",
      "SEND_MESSAGES",
      "SEND_TTS_MESSAGES",
      "MANAGE_MESSAGES",
      "EMBED_LINKS",
      "ATTACH_FILES",
      "READ_MESSAGE_HISTORY",
      "MENTION_EVERYONE",
      "USE_EXTERNAL_EMOJIS",
      "VIEW_GUILD_INSIGHTS",
      "CONNECT",
      "SPEAK",
      "MUTE_MEMBERS",
      "DEAFEN_MEMBERS",
      "MOVE_MEMBERS",
      "USE_VAD",
      "CHANGE_NICKNAME",
      "MANAGE_NICKNAMES",
      "MANAGE_ROLES",
      "MANAGE_WEBHOOKS",
      "MANAGE_EMOJIS",
    ]
  
    if(command.permissions){
      let invalidPerms = []
      for(const perm of command.permissions){
        if(!validPermissions.includes(perm)){
          return console.log(`Invalid Permissions ${perm}`);
        }
        if(!message.member.permissions.has(perm)){
          invalidPerms.push(perm);
        }
      }
      if (invalidPerms.length){
        const permissionembed = new MessageEmbed()
        .setTitle("Missing permissions")
        .setColor("RED")
        .setDescription(`Missing Permissions: \`${invalidPerms}\``)
        return message.reply({ embeds: [permissionembed]});
      }
    }
    
     const profileModel = require("../models/profileSchema");

    if (!message.content.startsWith(prefix) || message.author.bot) return;
  
    let profileData;
    try {
      profileData = await profileModel.findOne({ userID: message.author.id });
      if (!profileData) {
        let profile = await profileModel.create({
          userID: message.author.id,
          serverID: message.guild.id,
          coins: 1000,
          bank: 0,
        
        });profile.save();
      }
      }catch (err) {
      console.log(err);
    }
    
    
 
      
  
    async function commandExecute(){
    if(command) command.execute(client, message, args, Discord, cmd, profileData)
}
if(command.cooldown) {
    const current_time = Date.now();
    const cooldown_amount = (command.cooldown) * 1000

    cooldown.findOne({ userId: message.author.id, cmd: command.name }, async(err, data) => {
        if(data) {
            const expiration_time = data.time + cooldown_amount;
        
            if(current_time < expiration_time) {
                const time_left = (expiration_time -  current_time) / 1000
    
                if(time_left.toFixed(1) >= 3600){
                    let hour = (time_left.toFixed(1) / 3600);
                    return message.reply(`Please wait ${parseInt(hour)} more hours before using \`${command.name}\`!`)
                    .then(async x => {
      await delay(5000);
      return x.delete();
    })
                }
                if(time_left.toFixed(1) >= 60) {
                    let minute = (time_left.toFixed(1) / 60);
                    return message.reply(`Please wait ${parseInt(minute)} more minutes before using \`${command.name}\`!`)
                    .then(async x => {
      await delay(5000);
      return x.delete();
    })
                }
                let seconds = (time_left.toFixed(1));
                return message.reply(`Please wait ${parseInt(seconds)} more seconds before using \`${command.name}\`!`)
                .then(async x => {
      await delay(5000);
      return x.delete();
    })
            } else {
                await cooldown.findOneAndUpdate({ userId: message.author.id, cmd: command.name }, { time: current_time });
                commandExecute();
            }
        } else {
            commandExecute();
            new cooldown({
                userId: message.author.id,
                cmd: command.name,
                time: current_time,
                cooldown: command.cooldown,
            }).save();
        }
    })
} else {
    commandExecute();
};
         

    })
