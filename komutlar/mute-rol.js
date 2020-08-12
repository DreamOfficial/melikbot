const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async(client, message, args) => {
  
  const yetkiyok = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`**Üzgünüm Bu Komutu Kullanmak İçin Yeterli İzine Sahip Değilsin!**`)
  
  if (!message.member.hasPermission ("ADMINISTRATOR"))
    return message.channel.send(yetkiyok)
  
  var mutrol = message.mentions.roles.first()
  
  const rolyok = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`**Mute Rolünü Ayarlamak İçin Lütfen Bir Rol Etiketle!**`)
  
  if (!mutrol)
    return message.channel.send(rolyok)
  
  db.set(`alphamuterol${message.guild.id}`, mutrol.id)
  
  const tmdr = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`**Mute Rolü Başarıyla Ayarlandı!**`)
  
  message.channel.send(tmdr)
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["mute-rol"],
  perm: 0
}

exports.help = {
  name: "Mute Rol",
  description: "Mute Atınca Verilecek Rolü Ayarlarsınız",
  usage: "+mute-rol @Rol"
}