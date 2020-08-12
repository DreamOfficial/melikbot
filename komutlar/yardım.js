const Discord = require('discord.js');


exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('Melik Bot Yardım Menüsü')
.setTimestamp()
.addField('Eğlence Komutları', '``1vs1``, ``8ball``, ``slots``, ``sayı-tahmin``, ``aşk-ölçer``')
.addField('Yetkili Komutları', '``ban``, ``kick``, ``sil``, ``kayıt yardım``, ``yaz``, ``herkesedm``, ``oylama``, ``sunucupanel``, ``otorol``, ``uyarı``, ``uyarılar``, ``uyarı-sil``, ``mute-rol``, ``mute-``, ``reklam-engel``, ``reklam-kick``, ``gelen-giden`` ``gelen-giden-kapat``, ``mod-log``')
.addField('Genel Komutlar', '``kullanıcı-bilgi``, ``sunucubilgi``, ``avatar``, ``link-kısalt``, ``bot-bilgi``, ``şikayet``, ``öneri``')
.addField('Davet Komutları', '``davetlerim``, ``davet-ekle``, ``davet-kanal-sıfırla``, ``davet-kanal``, ``davet-oluştur``, ``davet-sil``, ``davet-stokla``')
.addField('Seviye Komutları', '``seviye-sistemi``, ``seviye-log``, ``seviye-sıfırla``, ``seviye``')
.setFooter('Melik Bot ', client.user.avatarURL)
.setTimestamp()
.setThumbnail(client.user.avatarURL)
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [], 
  permLevel: 0 
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};
 