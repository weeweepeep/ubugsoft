const profileModel = require("../../models/profileSchema");
module.exports = {
  name: "remove",
  aliases: [],
  permissions: "ADMINISTRATOR",
    category: "Economy",
  description: "remove cash from a player",
  usage: "?give @<user> <cash>",
  options: [
    {
      name: "user",
      description: "the user to remove cash",
      type: 9,
      required: true,
    },
    {
      name: "amount",
      description: "the amount u wanna remove from the user",
      type: 4,
      required: true
    }
  ],
  async execute(client, interaction, options) {
      if (interaction.user.id !== "775236227141599285") return interaction.reply("Only my creator can use this command!")
    const amount = interaction.options.getInteger("amount");
    const target = interaction.options.getMentionable("user");
    if (!target) return interaction.reply("That user does not exist");

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
            coins: -amount,
          },
        }
      );

      return interaction.channel.send(`This player has been removed 💸**${amount}** of cash!`);
    } catch (err) {
      console.log(err);
    }
  },
};
