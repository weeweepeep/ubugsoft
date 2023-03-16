const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "quote",
    description: "gives a funny quote",
    usage: "/quote",

    execute(client, interaction, options) {
        const quotes = [
            "When there's a hole, there's a goal -MIchael Haughey 2023",
            "Doggos be like woof woof and then proceed to remove the trash from the bin -MIchael Haughey 2023",
            "Josh be like oooh oooh aaa aaa when he see women -Michael Haughey 2023",
            "I guess I'll just never play with you again -Sharav Sharma 2023",
            "Michael, Caitlins so f***ing hot -Desmond 2022",
            "PLEASE DESMOND  I JUST NEED 36 PENCE -Michael Haughey 2023",
            "ayo? -Medha 2023",
            "ayo!!!!!? -Caitlin Chan 2023",
            "How can I be homophobic, my bitch is gay -Caitlin Chan 2023",
            "I'm a hungry hungry shark -Joshua Haughey 2023",
            "I am eating so much ass in hungry shark i'm like nom nom nom when I see ass -Michael Haughey 2023" ,
            "Actually don't touch my glasses or else I will use the gayslayer on you -Young man Kwok",
            "The gayslayer was super effective -Young man Kwok",
            "Stop lying, your father left to America  for the milk -Young man kwok",
            "Stop please i'm drowning in code -Desmond Chan 2023",
            "Life is like riding a bicycle. To keep balanced you must keep moving -Swarit Sethia 2022",
            "Your brother coloured a pencil black and called it Emmanuel -Swarit Sethia 2023",
            "The best things in life come in small packages -Mr Humber 2023",
            "TICKLE HIS BALLS DUDE -Michael Haughey 2022",
            "pornhub is all u need -josh 1/3/2023",
            "Sex is like school, you learn new things in both -josh 2023",
            "Life is cuckolding, you'll never get anywhere watching others actions -josh 2023",
            "Life is like riding a dick, to keep your balance you must keep moving upward and downwore -josh 2023",
            "Life is like a dick: is long and hard -josh 2023",
            "Daddy Dezzy is so smashable -Michael and young man 2023",
            "Michael is a mug breaker, Desmond plays soldier, youngman is in the closet. We all have our flaws, but josh is just overrated -Jack Parry 2023",
            "you know sheep? the one that goes like bAhAHhAhah -young man 2023",
            "do you know michale? which one? the famous one -des/ym/ed 2023",
            "i love big H -desmond 2023",
            "who is big H -caitlin 2023",
            "aiya, so P U DISGUSTING -michael 2023",
            "add me back desmond!!!! -josh 2023",
            "The younger the more I hunger -Eduardo 2023",
            "3 men 3 women, prefect -michael 2023",
            "3 inches is average -eduardo 2023",
            "make it a threesome please -michael 2023",
            "also i can sleep with my dog now -oscar 2023",
            "I’ve got to physically turn it on -desmond 2023"
        ]
        const answer = Math.floor(Math.random() * (quotes.length))
        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle("Funny quotes from the boys")
            .addField("quote:", quotes[answer])
        

            interaction.reply({ embeds: [embed] })

        
    }
}