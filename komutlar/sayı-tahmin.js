const Discord = require('discord.js');
const { stripIndents } = require('common-tags');

exports.run = async (client, message, args) => {
  this.games = new Set();
  if(this.games.has(message.channel.id)) await message.reply('Kanal başına sadece bir düello meydana gelebilir.');
    const islem = Math.floor(Math.random() * (100 - 1)) + 1
    const fixedlisonuç = islem
    let choice;
    let haklar = 10
    await message.react('🚀')
    this.games.add(message.channel.id);
  const hadibaqim = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(stripIndents`**💫 | ${message.author}, Numarayı Tahmin Et 0 ve 100 Arası \`${haklar}\` Deneme Hakkın Var**`)
    await message.channel.send(hadibaqim);
           let uwu = false;
            while (!uwu && haklar !== 0) {
                const response = await message.channel.awaitMessages(neblm => neblm.author.id === message.author.id, { max: 1, time: 15000 });
              if(!response.first()) { 
                this.games.delete(message.channel.id);
                const agab = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setDescription(`**⌛ | ${message.author}, Zaman Doldu**`)
                message.channel.send(agab)
                const devamke = new Discord.RichEmbed()
                .setColor("RANDOM")
                .setDescription(`**💥 | ${message.author}, Kaybettin Sayı : \`${fixedlisonuç}\`**`)
                message.channel.send(devamke)
              }              
                const choice = response.first().content
                if(isNaN(choice)) {
                  continue;
                }
                if (choice !== fixedlisonuç)  {
                  haklar -= 1
                  if(fixedlisonuç > choice) {
                    const duvu = new Discord.RichEmbed()
                    .setColor("RANDOM")
                    .setDescription(stripIndents`**🎄 | ${message.author}, :small_red_triangle: Daha Büyük Bir Numara Söylemelisin\n🎲 | \`${haklar}\` Deneme Hakkın Kaldı**`)
                  await message.channel.send(duvu);
                  continue;
                  }
                  if(fixedlisonuç < choice) {
                    const dududu = new Discord.RichEmbed()
                    .setColor("RANDOM")
                    .setDescription(stripIndents`**🎄 | ${message.author}, :small_red_triangle_down: Daha Küçük Bir Numara Söylemelisin\n🎲 | \`${haklar}\` Deneme Hakkın Kaldı**`)
                    await message.channel.send(dududu);
                  continue;
                  }
                }
                if (choice == fixedlisonuç) {
                  uwu = true
                }
                }
                if (haklar == 0) {
                  this.games.delete(message.channel.id);
                  const devamke2 = new Discord.RichEmbed()
                  .setColor("RANDOM")
                  .setDescription(`**💥 | ${message.author}, Kaybettin Sayı : \`${fixedlisonuç}\`**`)
                  await message.channel.send(devamke2)
                }
                if (uwu) {
                  const deevam = new Discord.RichEmbed()
                  .setColor("RANDOM")
                  .setDescription(`**<a:parti:687306398626742301> | ${message.author}, Doğru Tahmin Sayı \`${fixedlisonuç}\`**`)
                  this.games.delete(message.channel.id);
                  await message.channel.send(deevam)
                try {
            } catch(e) {
              this.games.delete(message.channel.id);
            message.channel.send('Bir hata oluştu')
        }
    } else {
      this.games.delete(message.channel.id);
      return console.log('Bir hata oluştu')
    }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['sayıtahmini', 'sayıtahmin', 'sayı-tahmini', 'sayı-tahmin'],
  permLevel: 0
};

exports.help = {
    name: 'sayı-tahmin',
  description: 'Rastgele rakam belirler ve siz o rakamı bulmaya çalışırsınız.',
  usage: 'sayı-tahmin'
};