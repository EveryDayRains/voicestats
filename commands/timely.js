const Discord = module.require("discord.js");
const db = require('quick.db');
const ms = require("parse-ms");
module.exports.run = async (bot, message, args) => {

    let money = db.fetch(`money_${message.author.id}`);
    let time = db.fetch(`timely_${message.author.id}`);
    if (money === null) money = bot.dbal;
    if (time === null) time = 100;
    let s = ms(((bot.cd / 60) / 1000) - (Date.now() - time));
    let wrong = new Discord.RichEmbed()
        .setColor('#ee281f')
        .setDescription(`**${message.author.tag}** Вы уже получили свою ежедневную награду. Вы сможете получить её заново через ${s.days}d ${s.hours}h ${s.minutes}m ${s.seconds}s`);

    if (time > Date.now()) return bot.send(wrong)

    let add = Date.now() + ((bot.cd * 60) * 1000);
    let mh;
    let cd;
    if (bot.cd > 60) { mh = 'ч'; cd = (bot.cd / 60) } else { mh = 'м'; cd = bot.cd };
    let embed = new Discord.RichEmbed()
        .setColor(bot.color)
        .setDescription(`**${message.author.tag}** Вы получили свои ${bot.timely} ${bot.bal}. Вы сможете получить снова через ${cd}${mh}`);
    bot.send(embed)
    db.add(`money_${message.author.id}`, bot.timely);
    db.set(`timely_${message.author.id}`, add)


};
module.exports.help = {
    name: "timely"
};