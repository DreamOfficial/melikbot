const Discord = require("discord.js");

exports.run = (client, message, params) => {
    var sans = ["XKDPPWWPPSPXLPEPDPDODSPSOOELDLDLDL", "ISKEOEKSOSKSKAKSLIXKS", "QWE:QWE:WQ:EQW:E:QWE:WQE:QW:EQW:E:QWE:QW:", "ASDHASGHDASGHDAGHSDGHASDGHASGHDASGHDAGHS", "QWEGQWGEWQGEGWQYQWRWQGFWQGFGQWHFGWQF", "AASFHQWFHOWQFOHWQFHUWQHFUWQHQHWHUQWHUQWFHUQHUFw"];
    var sonuc = sans[Math.floor((Math.random() * sans.length))];
    const embed = new Discord.RichEmbed()
    .addField(`***RANDOMUN***`, `${sonuc}`)
    message.author.sendEmbed(embed);
  if (message.channel.type !== 'dm') {
  const ozelmesajkontrol = new Discord.RichEmbed()
    .setColor(RANDOM)
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setAuthor("Randomun Özelden Gönderilmiştir !",message.author.avatarURL );
    message.channel.sendEmbed(ozelmesajkontrol) }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['random'],
  permLevel: 0
};

exports.help = {
  name: 'random',
  description: '',
  usage: 'dream farkıyla'
}; 