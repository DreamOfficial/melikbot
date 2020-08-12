const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async(client, message, args) => {

  const yetkimyok = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`**Üzgünüm Bu Komutu Kullanmak İçin Yeterli İzine Sahip Değilsin!**`)
  
  let rol = await db.fetch(`kskgrol${message.guild.id}`)
  let rolbul = message.guild.roles.get(rol)
  
  if(!message.member.roles.has(rolbul.id))
     return message.channel.send(yetkimyok)
  
let kayitedilcekkisi = message.mentions.users.first()

    const kisifyo = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`**Bir Kişi Etiketlemelisin!**`)
    
    if (!kayitedilcekkisi)
      return message.channel.send(kisifyo)
    
    const kayitkisi = message.guild.member(kayitedilcekkisi)
    
    var isim = args.slice(1).join(" ")
    
    const ama = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`**Bir İsim Ve Yaş Belirtmelisin!**`)
    
    if (!isim)
      return message.channel.send(ama)
    
    let tag = db.get(`kstag${message.guild.id}`)
    
    kayitkisi.setNickname(`${tag} | ${isim}`)
    
    kayitkisi.removeRole(db.fetch(`ksalinacakrol${message.guild.id}`))
    
    kayitkisi.addRole(db.fetch(`ksverilecekrol${message.guild.id}`))
    
    const tmyaptm = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`**Kullanıcı Başarıyla Kayıt Edildi!**`, kayitedilcekkisi.avatarURL)
    
    message.channel.send(tmyaptm)
  let modlogkanal = message.guild.channels.find(channel => channel.name === "")
  
  if (!modlogkanal) return;
  
  const sbb = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle("Kullanıcı Sunucudan Yasaklandı!")
  .addField(`Kayıt Edilen Kişi`, `${kayitedilcekkisi}`)
  .addField(`Kayıt Eden Ki`, `${message.author}`)
  .setTimestamp()

  message.guild.channels.get(modlogkanal.id).send(sbb)
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kayıt-et"],
  perm: 0
}

exports.help = {
  name: "Kayıt Et",
  description: "Kayıt Eder",
  usage: "+kayıt-et @Kişi (İsim) (Yaş)"
}