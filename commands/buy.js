const Discord = module.require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {
    let prices = bot.prices;
    let shop = bot.shop;
    let money = db.fetch(`money_${message.author.id}`);
    let x = args[0] - 1;

    if (!args) return;
    if (x < 0) return;
    if (money === null) money = bot.dbal;

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    if (!isNumeric(x)) return;

    let wrong = new Discord.RichEmbed()
        .setColor('#ee281f')
    if (!prices[x]){wrong.setDescription(`**${message.author.tag}** Ни одного предмета с этим номером не было найдено.`);return bot.send(wrong)};


    if (money < prices[x]){wrong.setDescription(`**${message.author.tag}** У Вас недостаточно ${bot.bal}`);return bot.send(wrong)};
    let role = message.guild.roles.find(r => r.name === `${shop[x]}`);
    
    if (!role){wrong.setDescription(`**${message.author.tag}** Администратор еще не создал эту роль,${bot.bal} не будут списаны`);return bot.send(wrong)};
    
    if (message.member.roles.has(role.id)) return;
    let embed = new Discord.RichEmbed()
        .setDescription(`**${message.author.tag}** Вы успешно купили **${shop[x]}**`)
        .setColor('#702db6');
    bot.send(embed)

    db.subtract(`money_${message.author.id}`, prices[x])
    message.member.addRole(role);

};
module.exports.help = {
    name: "buy",
};