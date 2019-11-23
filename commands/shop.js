const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
    let roles = bot.shop;
    let prices = bot.prices;
    let embed = new Discord.RichEmbed()
        .setTitle("Магазин")
        .setColor('#702db6')
    for (let i = 0; i < roles.length; i++) {
        embed.addField(`#${i + 1} - ${prices[i].toLocaleString()} ${bot.bal}`, `Вы получите роль **${roles[i]}**`, true)
    }
    return bot.send(embed)



};
module.exports.help = {
    name: "shop",
};