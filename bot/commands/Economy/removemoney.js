const profileModel = require("../../models/profileSchema");
module.exports = {
  name: "remove",
  aliases: [],
  permissions: ["ADMINISTRATOR"],
    category: "Economy",
  description: "remove cash from a player",
  usage: "?give @<user> <cash>",
  async execute(client, message, args, Discord, cmd, profileData) {
      if (message.author.id !== "775236227141599285") return message.reply("Only my creator can use this command!")
      if (!args.length) return message.channel.send("You need to mention a player to give them cash");
    const amount = args[1];
    const target = message.mentions.users.first();
    if (!target) return message.reply("That user does not exist");

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
            coins: -amount,
          },
        }
      );

      return message.channel.send(`This player has been removed 💸**${amount}** of cash!`);
    } catch (err) {
      console.log(err);
    }
  },
};
