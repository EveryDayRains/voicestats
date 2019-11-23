const Discord = module.require("discord.js");
const db = require('quick.db');
module.exports.run = async (bot, message, args) => {
  

    let user = message.mentions.members.first() || message.author;

    let money = db.fetch(`money_${user.id}`);
    if (money === null) money = bot.dbal;
    let checked;
    if (user.id == message.author.id) checked = user.tag; else { checked = user.user.tag };
    let embed = new Discord.RichEmbed()
        .setColor(bot.color)
        .setDescription(`У **${checked}** есть ${money} ${bot.bal}`);
    bot.send(embed)
 

};

module.exports.help = {
    name: "$"
};
