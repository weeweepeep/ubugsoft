const profileModel = require("../../models/profileSchema");
module.exports = {
  name: "deposit",
  aliases: ["dep"],
    category: "Economy",
  cooldown: 5,
  description: "Deposit cash into your bank!",
  usage: "/dep <cash>",
  options: [
   {
     name: "amount",
     description: "the amount u wanna deposit",
     type: 4,
     required: true,
   }
  ],
  async execute(client, interaction, options, profileData) {
    const amount = interaction.options.getInteger("amount")
    if (amount % 1 != 0 || amount <= 0) return interaction.reply("Deposit amount must be a whole number");
    try {
      if (amount > profileData.coins) return interaction.reply(`You don't have that amount of cash to deposit`);
      await profileModel.findOneAndUpdate(
        {
          userID: interaction.user.id,
        },
        {
          $inc: {
            coins: -amount,
            bank: amount,
          },
        }
      );

      return interaction.reply(`You deposited :money_with_wings: **${amount}** of cash into your bank`);
    } catch (err) {
      console.log(err);
    }
  },
};
