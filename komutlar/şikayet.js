const Discord = require("discord.js")

exports.run = async(client, message, args) => {
  
  let istek = args.slice(0).join(" ")
  
  const bisiyaz = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`Bir Şikayet Belirtmelisin!`)
  
  if (!istek) return message.channel.send(bisiyaz)
  
  const tm = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`Şikayetiniz Başarıyla Bildirildi!`)

  message.delete(5000)
  message.channel.send(tm)
  
  const istegi = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle("Yeni Bir Şikayet Geldi!")
  .addField(`Kullanıcı:`, `${message.author.tag}`)
  .addField(`Kullanıcı ID:`, `${message.author.id}`)
  .addField(`Kullanıcının Şikayeti:`, `${istek}`)
  
  client.channels.get("696116165050630214").send(istegi)
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["şikayet"],
  perm: 0
}

exports.help = {
  name: "şikayet",
  description: "İstek",
  usage: "+şikayet şikayet"
}