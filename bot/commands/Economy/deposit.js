const profileModel = require("../../models/profileSchema");
module.exports = {
  name: "deposit",
  aliases: ["dep"],
    category: "Economy",
  permissions: [],
  cooldown: 5,
  description: "Deposit cash into your bank!",
  usage: "?dep <cash>",
  async execute(client, message, args, Discord, cmd, profileData) {
    const amount = args[0];
    if (amount % 1 != 0 || amount <= 0) return message.reply("Deposit amount must be a whole number");
    try {
      if (amount > profileData.coins) return message.reply(`You don't have that amount of cash to deposit`);
      await profileModel.findOneAndUpdate(
        {
          userID: message.author.id,
        },
        {
          $inc: {
            coins: -amount,
            bank: amount,
          },
        }
      );

      return message.channel.send(`You deposited :money_with_wings: **${amount}** of cash into your bank`);
    } catch (err) {
      console.log(err);
    }
  },
};
