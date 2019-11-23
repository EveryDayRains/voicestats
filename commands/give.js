const Discord = module.require("discord.js");
const db = require('quick.db');
module.exports.run = async (bot, message, args) => {

    let user = message.guild.member(message.mentions.users.first())

    if (!user) return;

    let money = db.fetch(`money_${message.author.id}`);
    if (money === null) money = bot.dbal;

    let uMoney = db.fetch(`money_${user.id}`);
    if (uMoney === null) uMoney = bot.dbal;

    if (user.id == message.author.id) return;
    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    let payed = args[0];
    if (payed < 1) return;
    if (!isNumeric(payed)) return

    Math.ceil(payed)

    let wrong = new Discord.RichEmbed()
        .setColor('#ee281f')
        .setDescription(`**${message.author.tag}** У Вас недостаточно ${bot.cname}`);
    if (Math.ceil(payed) > money) return bot.send(wrong)

    let embed = new Discord.RichEmbed()
        .setColor(bot.color)
        .setDescription(`**${message.author.tag}** подарил ${Math.ceil(payed)} ${bot.bal} ${user.user.tag}`);

    bot.send(embed)

    db.subtract(`money_${message.author.id}`, Math.ceil(payed));
    db.add(`money__${user.id}`, Math.ceil(payed));


};
module.exports.help = {
    name: "give"
};