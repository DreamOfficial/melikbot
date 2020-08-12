const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async(client, message, args) => {
  
  const yetkiyok = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`**Üzgünüm Bu Komutu Kullanmak İçin Yeterli İzine Sahip Değilsin!**`, message.author.avatarURL)
  
  if (!message.member.hasPermission ("MANAGE_MESSAGES"))
    return message.channel.send(yetkiyok)
  
  const kisiyok = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`**Uyarılarını Görmek İstediğin Kişiyi Etiketlemelisin!**`, message.author.avatarURL)
  
  var kisi = message.mentions.users.first()
  
  if (!kisi)
    return message.channel.send(kisiyok)
  
  const yok = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`**Bu Kullanıcının Hiç Uyarısı Yok!**`, kisi.avatarURL)
  
  let uyarisi = await db.get(`uyarı.${kisi.id+message.guild.id}`)
  if (!uyarisi || uyarisi == 0) return message.channel.send(yok)
        let uyarisayiyolla = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setDescription(`**${kisi.username} Adlı Kullanıcının Toplam Uyarısı : **` + db.get(`uyarı.${kisi.id+message.guild.id}`) || '0', true)
       

message.channel.send(uyarisayiyolla)
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["uyarılar", "infractions", "uyarı-bak"],
  perm: 0
}

exports.help = {
  name: "Uyarılar",
  description: "Kişinin Varsa Uyarılarını Gösterir",
  usage: "+uyarılar @Kişi"
}