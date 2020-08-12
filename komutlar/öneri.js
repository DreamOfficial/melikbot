const Discord = require("discord.js")

exports.run = async(client, message, args) => {
  
  let istek = args.slice(0).join(" ")
  
  const bisiyaz = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Bir Öneri Belirtmelisin!`)
  
  if (!istek) return message.channel.send(bisiyaz)
  
  const tm = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor(`Öneriniz Başarıyla Gönderildi!`)

  message.delete(5000)
  message.channel.send(tm)
  
  const istegi = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle("Yeni Bir Öneri Geldi!")
  .addField(`Kullanıcı:`, `${message.author.tag}`)
  .addField(`Kullanıcı ID:`, `${message.author.id}`)
  .addField(`Kullanıcı Öneri:`, `${istek}`)
  
  client.channels.get("696116165050630214").send(istegi)
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["öneri"],
  perm: 0
}

exports.help = {
  name: "öneri",
  description: "İstek",
  usage: "t!öneri öneri"
}