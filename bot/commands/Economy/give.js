const profileModel = require("../../models/profileSchema")

module.exports = {
name: "give",
description: "give ur cash to a player",
usage: "?give @<user> <amount>",

async execute(client, message, args, Discord, cmd, profileData) {
const target = message.mentions.users.first()
if(!target) {
return message.reply("cant find that user!")
}
    if(target.id === message.author.id) {
return message.reply("u cant give money to urself!")}
const amount = args[1]
if(!amount) {
return message.reply("please provide an amount!")
}
    if(amount > profileData.coins) {
return message.reply("u dont have that amount of money!")
}
    if (amount % 1 != 0 || amount <= 0) return message.reply("amount must be a whole number");

    try {
      const targetData = await profileModel.findOne({ userID: target.id });
      if (!targetData) return message.reply(`This user doens't exist in the database!`);

      await profileModel.findOneAndUpdate(
        {
          userID: target.id,
        },
        {
          $inc: {
            coins: amount,
          },
        }
      );
        
      await profileModel.findOneAndUpdate(
        {
          userID: message.author.id
        },
        {
          $inc: {
            coins: -amount,
          },
        }
      );

      return message.reply(`This player has been given 💸**${amount}** cash!`);
    } catch (err) {
      console.log(err);
    }
}
}