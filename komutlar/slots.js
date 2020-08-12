const Discord = require('discord.js');
exports.run = async (client, message, args) => {
    if (!message.guild.member(client.user).hasPermission("SEND_MESSAGES")) return message.author.send('I don\'t have permission to Send Messages. Please enable send messages for my role!');

    let slots = ["🍕", "🌭", "🍔", "🍟", "🍰"];
    let Sonuç1 = Math.floor((Math.random() * slots.length));
    let Sonuç2 = Math.floor((Math.random() * slots.length));
    let Sonuç3 = Math.floor((Math.random() * slots.length));
    let name = message.author.displayName;
    let aicon = message.author.displayAvatarURL;

    if (slots[Sonuç1] === slots[Sonuç2] && slots[Sonuç3]) {
        let wEmbed = new Discord.RichEmbed()
            .setFooter("Tebrikler, Kazandın!", aicon)
            .setTitle(':slot_machine: Slots :slot_machine:')
            .addField('Sonuç:', slots[Sonuç1] + slots[Sonuç2] + slots[Sonuç3], true)
            .setColor("#f4e842");
        message.channel.send(wEmbed);
    } else {
        let embed = new Discord.RichEmbed()
            .setFooter('Eyvah, Kaybettin!', aicon)
            .setTitle(':slot_machine: Slots :slot_machine:')
            .addField('Sonuç:', slots[Sonuç1] + slots[Sonuç2] + slots[Sonuç3], true)
            .setColor("#f4e842");
        message.channel.send(embed);
    }

}


exports.conf = {
    aliases: ["slots"]
};

exports.help = {
    name: 'slots',
    description: 'Slot Oyunu Oynatır',
    usage: 'slots'
}