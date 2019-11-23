//discord.js | fs | quick.db | parse-ms
/*
    token - Ваш токен
    prefix - Ваш префикс
    currency - Значок валюты
    cooldown - Задержка !timely в минутах
    defaultBal - Начальный баланс
    timely - бонус за timely
    embedColor - Цвет сообщений
    shop - Роли в магазине
    prices - Цены | Соответствуют индексу тому что в shop те shop["a","b","c"] prices = [1,2,3] a=1 b=2 c=3
    voicesec - Сколько секунд надо быть в войсе
    voiceBonus - Награда за голосовой онлайн
*/
const Discord = require('discord.js');
const db = require('quick.db');
const fs = require("fs")
const bot = new Discord.Client();

bot.commands = new Discord.Collection();

let config = require('./settings.json');
let token = config.token;
let prefix = config.prefix;

bot.bal = config.currency;
bot.dbal = config.defaultBal;
bot.timely = config.timely;
bot.cd = config.cooldown;
bot.cname = config.cName
bot.color = config.embedColor;
bot.shop = config.shop;
bot.prices = config.prices;
bot.vSec = config.voiceSec;
bot.vBonus = config.voiceBonus;

fs.readdir('./commands/', (err, files) => {
    if (err) console.log(err);
    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) console.log("Нет комманд для загрузки!!");
    console.log(`Загружено ${jsfiles.length} комманд`);
    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}.${f} Загружен!`);
        bot.commands.set(props.help.name, props);

    });
});

bot.on('ready', () => {
    console.log(`Ваш любимый ботик ${bot.user.username} запустился`);
    bot.generateInvite(["ADMINISTRATOR"]).then(link => {
        console.log(link);
    });

    bot.user.setPresence({ game: { name: `Я бот ${bot.user.username}`, status: 'online' } });

    setInterval(function () {
        let all = db.all()
        for (let i = 0; i < all.length; i++) {
            if (all[i].ID.indexOf('cvoice') != -1) {
                let userid = (all[i].ID).replace(/\D/g,'');
                let onVoice = db.fetch(`cvoice_${userid}`);
                let voiceDate = db.fetch(`voice_${userid}`);
                let money = db.fetch(`money_${userid}`);
                if (money === null) money = bot.dbal;
                if (onVoice == true && voiceDate <= Date.now()) {
                    db.set(`voice_${userid}`,Date.now()+(bot.vSec*1000))
                    db.add(`money_${userid}`,bot.vBonus)
                }
            }

        }
    }, 5000);


});

bot.on('message', async message => {

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    bot.send = function (msg) {
        message.channel.send(msg);
    };

    let messageArray = message.content.split(" ");
    let command = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    let cmd = bot.commands.get(command.slice(prefix.length));
    if (cmd) cmd.run(bot, message, args);

});


bot.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel
    let oldUserChannel = oldMember.voiceChannel

    let voice = db.fetch(`voice_${newMember.id}`);
    if (voice === null) voice = Date.now();
    let cvoice = db.fetch(`cvoice_${newMember.id}`);
    if (cvoice === null) cvoice = true;
    if (newUserChannel){db.set(`cvoice_${newMember.id}`,true);db.set(`voice_${newMember.id}`,Date.now());}
    if (!newUserChannel) db.set(`cvoice_${newMember.id}`,false);
});

bot.login(token);