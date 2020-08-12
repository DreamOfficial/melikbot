const Discord = require("discord.js");
exports.run = function(client, message, args) {
  const miktarbelirt = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription("**| Silinecek Mesaj Miktarı Belirtmen Gerek!**")
  
  if (!message.member.hasPermission("MANAGE_MESSAGES"))
    return message.reply("**Üzgünüm Bu Komutu Kullanmak İçin İzniniz Yok!**");
  if (!args[0])
    return message.channel.send(miktarbelirt);
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel
      .send(`**✅ | ${args[0]} Adet Mesajı Sildim.**`)
      .then(msg => msg.delete(5000));
    const botunmesajyonet = new Discord.RichEmbed();
    let messagecount = parseInt(args.join(" "));
    message.channel
      .fetchMessages({
        limit: messagecount
      })
      .then(messages => message.channel.bulkDelete(messages));
    const sohbetsilindi = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTimestamp()
      .addField("**🌍 | Eylem:**", "**Mesaj Silme**")
      .addField("**👨 | Yetkili:**", message.author.username)
      .addField("**🔥 | Sonuç:**", `Başarılı`)
      .addField("**📝 | Kaç Adet:**", +messagecount)
    return message.channel
      .sendEmbed(sohbetsilindi)
      .then(msg => msg.delete(5000));
    console
      .log("**Sohbet**" + message.member + "**Tarafından Silindi!**")
      .then(msg => msg.delete(5000));
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sil", "temizle"],
  permLevel: 2
};

exports.help = {
  name: "Sil"
};
