  const profileModel = require("../../models/profileSchema");
module.exports = {
  name: "beg",
  aliases: [],
  cooldown: 10,
    category: "Economy",
  permissions: [],
  usage: "?beg",
  description: "beg for cash",
  async execute(client, message, args, discord, cmd, profileData) {
    const randomNumber = Math.floor(Math.random() * 500) + 100;
    const response = await profileModel.findOneAndUpdate(
      {
        userID: message.author.id,
      },
      {
        $inc: {
          coins: randomNumber,
        },
      }
    );
    return message.channel.send(`${message.author.username}, you begged and received  :money_with_wings:${randomNumber} cash`);
  },
};
