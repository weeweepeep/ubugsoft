const profileModel = require("../../models/profileSchema")

module.exports = {
name: "give",
description: "give ur cash to a player",
usage: "/give @<user> <amount>",
options: [
  {
    name: "user",
    description: "the user u wanna give cash to",
    type: 9,
    required: true,
  },
  {
    name: "amount",
    description: "the amount u wanna give to the user",
    type: 4,
    required: true,
  }
],

async execute(client, interaction, args, Discord, cmd, profileData) {
const target = interaction.options.getMentionable("user")

    if(target.id === interaction.user.id) {
return interaction.reply("u cant give money to urself!")}
const amount = interaction.options.getInteger("amount")

    if(amount > profileData.coins) {
return interaction.reply("u dont have that amount of money!")
}
    if (amount % 1 != 0 || amount <= 0) return interaction.reply("amount must be a whole number");

    try {
      const targetData = await profileModel.findOne({ userID: target.id });
      if (!targetData) return interaction.reply(`This user doens't exist in the database!`);

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
          userID: interaction.user.id
        },
        {
          $inc: {
            coins: -amount,
          },
        }
      );

      return interaction.channel.send(`This player has been given 💸**${amount}** of cash!`);
    } catch (err) {
      console.log(err);
    }
}
}