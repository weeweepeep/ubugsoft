const profileModel = require("../../models/profileSchema");
module.exports = {
  name: "withdraw",
  aliases: ["wd"],
    category: "Economy",
  cooldown: 5,
  description: "withdraw cash from your bank",
  usage: "?wd <cash>",
  options: [
    {
      name: "amount",
      description: "the amount of cash u wanna withdraw",
      type: 4,
      required: true,
    }
  ],
  async execute(client, interaction, options, profileData) {
    const amount = interaction.options.getInteger("amount")
    if (amount % 1 != 0 || amount <= 0) return interaction.reply("Withdrawn amount must be a whole number");

    try {
      if (amount > profileData.bank) return interaction.reply(`You don't have that amount of cash to withdraw`);

      await profileModel.findOneAndUpdate(
        {
          userID: interaction.user.id,
        },
        {
          $inc: {
            coins: amount,
            bank: -amount,
          },
        }
      );

      return interaction.reply(`You withdrew :money_with_wings: **${amount}** of cash into your wallet`);
    } catch (err) {
      console.log(err);
    }
  },
};
