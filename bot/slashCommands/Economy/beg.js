  const profileModel = require("../../models/profileSchema");
module.exports = {
  name: "beg",
  aliases: [],
  cooldown: 10,
  category: "Economy",
  description: "beg for cash",
  usage: "/beg",
  async execute(client, interaction, options) {
    const randomNumber = Math.floor(Math.random() * 500) + 100;
    const response = await profileModel.findOneAndUpdate(
      {
        userID: interaction.user.id,
      },
      {
        $inc: {
          coins: randomNumber,
        },
      }
    );
    return interaction.reply(`${interaction.user.username}, you begged and received  :money_with_wings:${randomNumber} cash`);
  },
};
