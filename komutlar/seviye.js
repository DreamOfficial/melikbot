const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async(client, message, args) => {

const kisi = message.mentions.users.first() || message.author

const btln = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(`**Botların Leveli Yoktur!**`, message.author.avatarURL)

if (kisi.bot === true)
return message.channel.send(btln)

const lvl = db.fetch(`hamsterlvl.${kisi.id + message.guild.id}`)

const sdsm = new Discord.RichEmbed()
.setColor("RANDOM")
.setTitle(`${kisi.username} - Seviye Profili`)
.addField(`XP`, db.fetch(`hamsterxpmiktari.${kisi.id + message.guild.id}`))
.addField(`Level`, lvl)
.setThumbnail(kisi.avatarURL)

message.channel.send(sdsm)

}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["seviye"],
perm: 0
}

exports.help = {
name: "Seviye Profil",
description: "Shows Avatar",
usage: "/avatar @User"
}