const Discord = module.require("discord.js");
module.exports.run = async (bot, message, args) => {

    let ot = ["It is certain", "It is decidedly so", " Without a doubt", "Yes — definitely", "You may rely on it", "As I see it, yes", " Most likely", "Outlook good", "Signs point to yes", "Yes", "Reply hazy, try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don’t count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"]
    var rand = Math.floor(Math.random() * ot.length);
    let answer = args.join(" ")
    if (!answer) return;
    let embed = new Discord.RichEmbed()
        .setColor(bot.color)
        .setDescription(`${message.author.tag}`)
        .addField(`:question: Вопрос`, answer)
        .addField(`:8ball: 8ball`, ot[rand]);

    bot.send(embed)


};
module.exports.help = {
    name: "8ball"
};