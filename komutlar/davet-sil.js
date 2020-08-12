const Discord = require("discord.js");
const db = require("quick.db");
module.exports.run = async (bot, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "!";
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    const embed = new Discord.RichEmbed()
      .setDescription("**Üzgünüm Bu Komutu Kullanmak İçin Yeterli İzine Sahip Değilsin!**")
      .setColor("RANDOM")
.setFooter(bot.user.username, bot.user.avatarURL)
    message.channel.send(embed);
    return;
  }

  let u = message.mentions.users.first();
let m = args.slice(1).join(" ")
  if (!u) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription("**Lütfen Davet Silmek İstediğiniz Kişiyi Etiketleyin!**")
        .setColor("RANDOM")
      .setFooter(bot.user.username, bot.user.avatarURL)
    );
  }
    if (!m) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription("**Lütfen Sileceğiniz Davet Sayısını Belirtiniz!**")
        .setColor("RANDOM")
      .setFooter(bot.user.username, bot.user.avatarURL)
    );
  }
  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`**${u} İsimli Kişiden: ${m} Başarıyla Davet Silindi!**`)
  .setFooter(bot.user.username, bot.user.avatarURL)
  message.channel.send(embed);

  db.add(`davet_${u.id}_${message.guild.id}`, -m);
};

module.exports.conf = {
  aliases: ["davetsil"],
  permLevel: 2,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "davet-sil",
  description: "davet-sil",
  usage: "davet-sil"
};
