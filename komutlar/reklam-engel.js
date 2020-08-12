const db = require("quick.db");
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || "+";
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    const embed = new Discord.RichEmbed()
      .setDescription(`**Üzgünüm Bu Komutu Kullanmak İçin Yeterli İzine Sahip Değilsin!**`)
      .setColor("RANDOM");

    message.channel.send(embed);
    return;
  }
  if (!args[0]) {
    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("**Melik Bot Reklam-Engel Sistemi!**")
      .setDescription(
        `**Hatalı Kullanım! Doğru Kullanım: ${prefix}reklam-engel aç veya kapat**`
      );

    message.channel.send(embed);
    return;
  }
  let sa = await db.fetch(`reklame_${message.guild.id}`);
  if (args[0] == "aç") {
    if (sa) {
      const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("**Melik Bot Reklam-Engel Sistemi!**")
        .setDescription("**Görünüşe Göre Reklam-Engel Sistemi Zaten Aktif!**");

      message.channel.send(embed);
      return;
    } else {
      db.set(`reklame_${message.guild.id}`, "YEE");
      const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle("**Melik Bot Reklam-Engel Sistemi!**")
        .setDescription("**Reklam-Engel Sistemi Başırılı Bir Şekilde Açıldı!**");

      message.channel.send(embed);
    }
  } else if (args[0] == "kapat") {
    db.delete(`reklame_${message.guild.id}`);
    const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("**Melik Bot Reklam-Engel Sistemi!**")
      .setDescription("**Reklam-Engel Sistemi Başrılı Bir Şekilde Kapatıldı!**");

    message.channel.send(embed);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["reklamengel"],
  permLevel: 2,
  kategori: "sunucu"
};

exports.help = {
  name: "reklam-engel",
  description: "reklam engeli aktif edersiniz.",
  usage: "reklam-engel"
};