const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async(client, message, args) => {

const yetkiyokknks = new Discord.RichEmbed()
.setColor("RANDOM")
.setAuthor(`Bu Komutu Kullanmak İçin Yeterli İzine Sahip Değilsin!`, message.author.avatarURL)

if (!message.member.hasPermission ("ADMINISTRATOR"))
return message.channel.send(yetkiyokknks)

  const bsii = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor("Ne Yapmak İstiyorsun?\n+otorol sıfırla veya +otorol ayarla @Rol", message.author.avatarURL)
  
if(args.slice(0).join(" ").length < 1) 
  message.channel.send(bsii)
  
if(args[0] == "ayarla") {
  
var otorolrol = message.mentions.roles.first()

const roldeetiketlesene = new Discord.RichEmbed()
.setColor("RANDOM")
.setAuthor(`Bir Rol Etiketlemelisin!`, message.author.avatarURL)

if (!otorolrol)
return message.channel.send(roldeetiketlesene)

db.set(`alphaotorol${message.guild.id}`, otorolrol)

const tmmknkshadibb = new Discord.RichEmbed()
.setColor("RANDOM")
.setAuthor(`Belirtilen Rol Başarıyla Ayarlandı!`, message.author.avatarURL)

message.channel.send(tmmknkshadibb)
                        
return

};

  if(args[0] == "sıfırla") {
    
    db.delete(`alphaotorol${message.guild.id}`)
    
  const ram = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Otorol Başarıyla Sıfırlandı!`, message.author.avatarURL)
  
  message.channel.send(ram)
    
  }
  
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["otorol", "oto-rol"],
    perm: 0
};

exports.help = {
    name: "Otorol",
    description: "Otorolü Ayarlar",
    usage: "/otorol ayarla @rol/sıfırla"
};