const Discord = require("discord.js");

exports.run = function(client, message, args) {
  const yetkiyokembed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`**Üzgünüm Bu Komutu Kullanmak İçin Yeterli İzine Sahip Değilsin**`, message.author.avatarURL);

  const birinietiketleembed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`**Bir Kişiyi Etiketlemelisin!**`, message.author.avatarURL);

  if (!message.member.hasPermission("BAN_MEMBERS"))
    return message.channel.send(yetkiyokembed);

  const banlanacakkisi = message.mentions.users.first();
  if (!banlanacakkisi) return message.channel.send(birinietiketleembed);

  const yetkilileribanlayamam = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`**Yetkilileri Sunucudan Yasaklayamam!**`, message.author.avatarURL);

 if (!message.guild.member(banlanacakkisi).bannable)
   return message.channel.send(yetkilileribanlayamam);

  var sebebi = args.slice(1).join(" ") || "Belirtilmemiş"

  const basariylabanlandi = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`**Kullanıcı Başarıyla Sunucudan Yasaklandı.**`, message.author.avatarURL)

  message.guild.ban(banlanacakkisi);
  message.channel.send(basariylabanlandi);
  
  let modlogkanal = message.guild.channels.find(channel => channel.name === "ceza-takip")
  
  if (!modlogkanal) return;
  
  const sbb = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle("**Kullanıcı Sunucudan Yasaklandı!**")
  .addField(`**Yasaklanan Kişi**`, `${banlanacakkisi}`)
  .addField(`**Yasaklayan Kişi**`, `${message.author}`)
  .addField(`**Sebep**`, `${sebebi}`)
  .setTimestamp()

  message.guild.channels.get(modlogkanal.id).send(sbb)
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ban", "banla", "yasakla"],
  perm: 0
};

exports.help = {
  name: "Ban",
  description: "Kişiyi Sunucudan Yasaklar",
  usage: "+ban @Kişi Sebep"
};
