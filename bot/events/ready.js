const client = require("../index")

client.on("ready", async () => {
    console.log(`${client.user.username} is Online! In ${client.channels.cache.size} channels`)
    client.user.setActivity("with Joy! Use ?help", {
        type: "STREAMING",
        url: "https://www.twitch.tv/weeweepeepw"
    });
});


client.on("ready", () => {
  const activities = [
  `use ?invite`,
  `in ${client.guilds.cache.size} servers`,
  `use ?help`,
  `in ${client.channels.cache.size} channels`
];
  setInterval(() => {
  
    const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
    const newActivity = activities[randomIndex];

    client.user.setActivity(newActivity, {
        type: "STREAMING",
        url: "https://www.twitch.tv/weeweepeepw"
    });
  }, 5000);

});
