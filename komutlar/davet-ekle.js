const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    const embed = new Discord.RichEmbed()
      .setDescription("**Üzgünüm Bu Komutu Kullanmak İçin Yeterli İzine Sahip Değilsin!**")
    .setFooter(bot.user.username, bot.user.avatarURL)
      .setColor("RANDOM");

    message.channel.send(embed);
    return;
  }

  let u = message.mentions.users.first();
let m = args.slice(1).join(" ")
  if (!u) {
    return message.channel.send(
      new Discord.RichEmbed()
      .setFooter(bot.user.username, bot.user.avatarURL)
        .setDescription("**Lütfen Davet Eklemek İstediğiniz Kişiyi Etiketleyin!**")
        .setColor("Random")
    );
  }
    if (!m) {
    return message.channel.send(
      new Discord.RichEmbed()
      .setFooter(bot.user.username, bot.user.avatarURL)
        .setDescription("**Lütfen Ekleyeceğiniz Davet Sayısını Belirtiniz!**")
        .setColor("RANDOM")
    );
  }
  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
  .setFooter(bot.user.username, bot.user.avatarURL)
    .setDescription(`**${u} İsimli Kişiye: ${m} Başarıyla Davet Eklendi! <a:onay:684757215390990414>**`);
  message.channel.send(embed);

  db.add(`davet_${u.id}_${message.guild.id}`, +m);
};

module.exports.conf = {
  aliases: ["davetekle"],
  permLevel: 2,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "davet-ekle",
  description: "davet-ekle",
  usage: "davet-ekle"
};
