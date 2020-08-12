const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async(client, message, args) => {

const sifitldm = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(`**Seviyeniz Başarıyla Sıfırlandı!**`, message.author.avatarURL)

message.channel.send(sifitldm)

db.delete(`hamsterlvl.${message.author.id + message.guild.id}`)
db.delete(`hamsterxpmiktari.${message.author.id + message.guild.id}`)
}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["seviye-sıfırla"],
perm: 0
}

exports.help = {
name: "Seviye Sıfırla",
description: "Shows Avatar",
usage: "/avatar @User"
}