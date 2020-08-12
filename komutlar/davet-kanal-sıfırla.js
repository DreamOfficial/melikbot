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

  let kanal = await db.fetch(`davetkanal_${message.guild.id}`)

  if (!kanal) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setDescription("**Ayarlanmayan Davet Kanalını Sıfırlayamam!**")
      .setFooter(bot.user.username, bot.user.avatarURL)
        .setColor("RANDOM")
    );
  }
  db.delete(`davetkanal_${message.guild.id}`)
  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
  .setFooter(bot.user.username, bot.user.avatarURL)
    .setDescription(`**Ayarlanan Davet Kanalı Başarılı Bir Şekilde Sıfırlandı!**`);
  message.channel.send(embed);
return
  
};

module.exports.conf = {
  aliases: ["davetkanalsıfırla"],
  permLevel: 2,
  enabled: true,
  guildOnly: true,
  kategori: "moderasyon"
};

module.exports.help = {
  name: "davet-kanal-sıfırla",
  description: "davet-kanal-sıfırla",
  usage: "davet-kanal-sıfırla"
};
