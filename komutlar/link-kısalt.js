const Discord = require('discord.js');
const shorten = require('isgd');

exports.run = (client, message, args, tools) => {
    message.delete();
  const havatidayi = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription("**| Doğrı Kullanım Şekli : +link-kısalt (Link) (İsim)**")
  const haah = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription("**| Doğru Bir Link Girmelisin**")
    if (!args[0]) return message.channel.send(havatidayi)

    if(!args[1]) {

        shorten.shorten(args[0], function(res) {
            if (res.startsWith('**Hata:**')) message.channel.send(haah);

            message.channel.send(`**<${res}>**`);
        })
    } else {
        shorten.custom(args[0], args[1], function(res) {

          const d = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription(`**| İşte Kısaltılmış Linkin <${res}>**`)
          const me = new Discord.RichEmbed()
          .setColor("RANDOM")
          .setDescription(`**| İşte Kısaltılmış Linkin <${res}>**`)
            if (res.startsWith('**Hata:**')) message.channel.send(d);

            message.channel.send(me);
        })
    }

};

exports.conf = {
 enabled: true,
 guildOnly: true,
 aliases: ["link-kısalt"],
 permLevel: 0
};

exports.help = {
 name: 'kısalt',
 description: 'İstediğiniz URLni Kısaltır. ',
 usage: 'kısalt'
};