const profileModel = require("../../models/profileSchema");
module.exports = {
  name: "withdraw",
  aliases: ["wd"],
  permissions: [],
    category: "Economy",
  cooldown: 5,
  description: "withdraw cash from your bank",
  usage: "?wd <cash>",
  async execute(client, message, args, Discord, cmd, profileData) {
    const amount = args[0];
    if (amount % 1 != 0 || amount <= 0) return message.reply("Withdrawn amount must be a whole number");

    try {
      if (amount > profileData.bank) return message.reply(`You don't have that amount of cash to withdraw`);

      await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            coins: amount,
            bank: -amount,
          },
        }
      );

      return message.channel.send(`You withdrew :money_with_wings: **${amount}** of cash into your wallet`);
    } catch (err) {
      console.log(err);
    }
  },
};
