const Discord = require("discord.js")

exports.run = async(client, message, args) => {
  
  const yetkiyok = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`**Üzgünüm Bu Komutu Kullanmak İçin Yeterli İzine Sahip Değilsin!**`, message.author.avatarURL)
  
  if (!message.member.hasPermission ("MANAGE_MESSAGES"))
    return message.channel.send(yetkiyok)
  
  var sorusu = args.slice(0).join(" ")
  const sorudayaz = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`**Lütfen Oylama İçin Bir Şey Gir!**`)
  
  if (!sorusu)
    return message.channel.send(sorudayaz)
  
  
  const oylama = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTimestamp()
  .setDescription(`${sorusu}`)
  .setThumbnail(message.guild.iconURL)
  
  message.delete()
  message.channel.send(oylama)
  
  .then(function(message) {

         message.react('<a:evet:737219259729707089>');

         message.react('<a:hayir:737219212430278687>');

       });
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["oylama"],
  perm: 0
}

exports.help = {
  name: "Oylama",
  description: "Oylama Yapar",
  usage: "+oylama (Soru)"
}