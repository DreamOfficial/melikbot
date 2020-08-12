const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
exports.run = async (client, message, args) => {
const yetkinyokknk = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(`**Bu Komutu Kullanmak İçin Yeterli İzine Sahip Değilsin!**`, message.author.avatarURL)

const devredisi = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(`**Seviye Sistemi Başarıyla Devre Dışı Bırakıldı!**`, message.author.avatarURL)

const aktifedildi = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(`**Seviye Sistemi Başarıyla Aktif Edildi!**`, message.author.avatarURL)

if (message.member.id != message.guild.owner.id)
return message.channel.send(yetkinyokknk)

if(args[0] == "aç") {

db.set(`seviyeaktf.${message.guild.id}`, `ac`)

const tamam = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(`**Seviye Sistemi Başarıyla Aktif Edildi!**`, message.author.avatarURL)

message.channel.send(tamam)

return;
}

if(args[0] == "kapat") {

const tamama = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(`**Seviye Sistemi Başarıyla Devre Dışı Bırakıldı!**`, message.author.avatarURL)

message.channel.send(tamama)

db.delete(`seviyeaktf.${message.guild.id}`)

return;
}

}
exports.conf = {
enabled: true,
guildOnly: true,
aliases: ['seviye-sistemi'],
permLevel: 0
};

exports.help = {
name: 'Seviye',
description: 'Sunucuya bot eklendiğinde atılmasını sağlayan sistemi başarıyla aktifleştirirsiniz/kapatırsınız.',
usage: 'koruma-sistemi'
};