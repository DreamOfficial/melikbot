const Discord = require(`discord.js`)

exports.run = async (bot, message, args) => {
  try {
    let invite = await message.channel.createInvite({
      maxAge: args.age * 60,
      maxUses: args.uses
    });
      const sunucubilgi = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setTimestamp()
        .setDescription(`**Davet Linki Başarılı Bİr Şekilde Oluşturulmuştur! (https://discord.gg/${invite.code}) Ancak Sunucuya Bir Kişi Davet Ettiğinde Benim Adıma Davet Edilecekdir!**`)
      .setFooter(bot.user.username, bot.user.avatarURL)
    return message.channel.sendEmbed(sunucubilgi).catch(e => {
return
    });
  }
  catch (e) {
return
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['davetoluştur'],
  permLevel: 0
};

exports.help = {
  name: 'davet-oluştur',
  description: 'davet-oluştur',
  usage: 'davet-oluştur'
};