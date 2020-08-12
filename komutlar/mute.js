const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async(client, message, args) => {
  
  const yetkiyok = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`**Üzgünüm Bu Komutu Kullanmak İçin Yeterli İzine Sahip Değilsin!**`, message.author.avatarURL)
  
  if (!message.member.hasPermission ("MANAGE_MESSAGES"))
    return message.channel.send(yetkiyok)
  
  let mtkisi = message.mentions.users.first()
  
  var sebp = args.slice(1).join(" ") || "Belirtilmemiş"
  
  const kisiyok = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`**Susturmak İstediğin Kişiyi Etiketlemelisin!**`)
  
  if (!mtkisi)
    return message.channel.send(kisiyok)
  
  const mutelencek = message.guild.member(mtkisi)
  
  mutelencek.addRole(db.fetch(`alphamuterol${message.guild.id}`))
  
  const tamamdir = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`**Belirttiğiniz Kişi Başarıyla Susturuldu!**`)
  
  message.channel.send(tamamdir)
  
  let modlogkanal = message.guild.channels.find(channel => channel.name === "ceza-takip")
  
  if (!modlogkanal) return;
  
  const sbb = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle(" Bir Kullanıcı Sunucuda Susturuldu")
  .addField(`Susturulan Kişi:`, `${mtkisi}`)
  .addField(` Susturan Kişi:`, `${message.author}`)
  .addField(`Sebep:`, `${sebp}`)
  .setTimestamp()

  message.guild.channels.get(modlogkanal.id).send(sbb)
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["mute"],
  perm: 0
}

exports.help = {
  name: "Mute",
  description: "Belirttiğiniz Kişiye Mute Atar",
  usage: "/mute @Kişi (Sebep)"
}