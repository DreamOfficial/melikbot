const Discord = require("discord.js")
const db = require("quick.db")

exports.run = async(client, message, args) => {

const yetkiyokknks = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(`**Bu Komutu Kullanmak İçin Yeterli İzine Sahip Değilsin!**`, message.author.avatarURL)

if (!message.member.hasPermission ("ADMINISTRATOR"))
return message.channel.send(yetkiyokknks)

if(args[0] == "yardım") { 

const bsii = new Discord.RichEmbed()
.setColor("RANDOM")
.addField(`+seviye-log kanal #Kanal`, `Seviye Atlanıldığında Atılacak Mesajın Kanalını Ayarlar (Seviye Mesajını Ayarlamayı Unutmayı)`)
.addField(`+seviye-log yazı (Mesaj)`, `Örnek Vererek Anlatacağım (+seviye-log yazı Tebrikler %kişi% Level Atladı! Artık %level% Level!) Burda %kişi% Level Atlayan Kişinin Adını Yazar, %level% İse Levelini Yazar`)

message.channel.send(bsii)

return;
};

if(args[0] == "kanal") {

var kanal = message.mentions.channels.first()

const kanalyazknk = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(`**Bir Kanal Etiketlemelisin!**`, message.author.avatarURL)

if (!kanal)
return message.channel.send(kanalyazknk)

await db.set(`hamsterxplogkanal.${message.guild.id}`, kanal)

const kanalyazknkk = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(`**Kanal Başarıyla Ayarlandı!**`, message.author.avatarURL)

message.channel.send(kanalyazknkk)

return;
};

if(args[0] == "yazı") {

var yazi = args.slice(1).join(" ")

const yaziyazknkm = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(`**Bir Yazı Belirtmelisin!**`, message.author.avatatURL)

if (!yazi)
return message.channel.send(yaziyazknkm)

db.set(`lvlupmsj.${message.guild.id}`, yazi)

const tmmdir = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(`**Mesaj Başarıyla Ayarlandı!**`, message.author.avatarURL)

message.channel.send(tmmdir)

return;
};

};

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ["seviye-log"],
perm: 0
}

exports.help = {
name: "Avatar",
description: "Shows Avatar",
usage: "/avatar @User"
}