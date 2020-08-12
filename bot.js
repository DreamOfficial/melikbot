const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const db = require("quick.db")
require('./util/eventLoader')(client);
const YouTube = require('simple-youtube-api');
const queue = new Map(); 
const express = require('express');
const app = express();
const http = require('http');

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sa') {
    msg.reply('Aleyküm Selam, Hoşgeldin Dostum! 😜');
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);


//Sunucu-Panel//
client.on("guildMemberAdd", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
    let toplamuye = member.guild.channels.find(x =>(x.name).startsWith("Toplam Üye •"))
    let toplamaktif = member.guild.channels.find(x =>(x.name).startsWith("Aktif Üye •"))
    let botlar = member.guild.channels.find(x =>(x.name).startsWith("Botlar •"))
    let rekoraktif = member.guild.channels.find(x =>(x.name).startsWith("Rekor Aktiflik •"))
    
    if(member.guild.members.filter(off => off.presence.status !== 'offline').size > rekoronline) {
      db.set(`panelrekor_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
    }
    try{
      toplamuye.setName(`Toplam Üye • ${member.guild.members.size}`)
      toplamaktif.setName(`Aktif Üye • ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`)
      botlar.setName(`Botlar • ${member.guild.members.filter(m => m.user.bot).size}`)
      rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
   } catch(e) { }
  }
})


client.on("guildMemberRemove", async(member) => {
  let sunucupaneli = await db.fetch(`sunucupanel_${member.guild.id}`)
  if(sunucupaneli) {
    let rekoronline = await db.fetch(`panelrekor_${member.guild.id}`)
    let toplamuye = member.guild.channels.find(x =>(x.name).startsWith("Toplam Üye •"))
    let toplamaktif = member.guild.channels.find(x =>(x.name).startsWith("Aktif Üye •"))
    let botlar = member.guild.channels.find(x =>(x.name).startsWith("Botlar •"))
    let rekoraktif = member.guild.channels.
    find(x =>(x.name).startsWith("Rekor Aktiflik •"))
    
    if(member.guild.members.filter(off => off.presence.status !== 'offline').size > rekoronline) {
      db.set(`panelrekor_${member.guild.id}`, member.guild.members.filter(off => off.presence.status !== 'offline').size)
    }
    try{
      toplamuye.setName(`Toplam Üye • ${member.guild.members.size}`)
      toplamaktif.setName(`Aktif Üye • ${member.guild.members.filter(off => off.presence.status !== 'offline').size}`)
      botlar.setName(`Botlar • ${member.guild.members.filter(m => m.user.bot).size}`)
      rekoraktif.setName(`Rekor Aktiflik • ${rekoronline}`)
   } catch(e) { }
  }
})
//Sunucu-Panel Bitiş//


//Teşekkür-Mesajı//
client.on('guildCreate', guild => {

    let kanal = guild.channels.filter(c => c.type === "text").random()

    kanal.send("Beni Sunucunuza Eklediğiniz İçin Teşekkürler! Prefixim +");

});
//Teşekkür-Mesajı Bitiş//


//Reklam-Engel//
client.on("message", async message => {
  let reklamengel = await db.fetch(`reklame_${message.guild.id}`);

  let reklamkick = await db.fetch(`reklamk_${message.guild.id}`);
  let sa = message.member;
  if (!reklamengel) return;
  else {
    const reklamlar = [
      "discord.app",
      "discord.gg",
      "https",
      ".com",
      "www.",
      "http",
      ".net",
      ".io",
      ".pw",
      ".gg",
      ".com.tr",
      ".org",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"
    ];
    if (reklamlar.some(a => message.content.toLowerCase().includes(a))) {
      if (message.member.hasPermission("BAN_MEMBERS")) return;
      else {
      if (!reklamkick) {
        message.delete();
        message.member.send("**Lütfen Reklam Yapma!**");
        message.channel.send(`<@${sa.id}> **Lütfen Reklam Yapmayı Bırak!**`);
        return;
      } else {
        message.delete();
        db.add(`reklamyap_${message.guild.id}_${message.member.id}`, +1);
        let reklama = await db.fetch(
          `reklamyap_${message.guild.id}_${message.member.id}`
        );
        if (reklama == "3") {
          const embed = new Discord.RichEmbed()
            .setDescription(
              `<@${sa.id}> **Çok Fazla Reklam Yaptığın İçin Sunucudan Atılıyorsun!** (${reklama}/3)`
            )
            .setColor("BLACK");
          message.channel.send(embed);
          db.delete(`reklamyap_${message.guild.id}_${message.member.id}`);
          message.member.send("**Lütfen Bir Daha Reklam Yapma!**");
          sa.kick();
          return;
        }
        const embed = new Discord.RichEmbed()
          .setDescription(
            `<@${sa.id}> **Lütfen Reklam Yapmayı Bırak!** (${reklama}/3)`
          )
          .setColor("RANDOM")
        message.channel.send(embed);
        message.member.send("**Lütfen Reklam Yapma!**")
        return;
        }
      }
    }
  }
});
//Reklam-Engel Bitiş//

//MOD-LOG Sistemi//
client.on('channelCreate', async channel => {
  const c = channel.guild.channels.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.RichEmbed()
                    .addField(`Bir Kanal oluşturuldu!`, ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\n ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
    c.send(embed)
});

client.on('channelDelete', async channel => {
  const c = channel.guild.channels.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    let embed = new Discord.RichEmbed()
                    .addField(`Bir Kanal silindi`, ` İsmi: \`${channel.name}\`\n Türü: **${channel.type}**\n ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)

    c.send(embed)
});

   client.on('channelNameUpdate', async channel => {
  const c = channel.guild.channels.get(db.fetch(`codeminglog_${channel.guild.id}`));
  if (!c) return;
    var embed = new Discord.RichEmbed()
                    .addField(`Bir Kanal İsmi değiştirildi`, ` Yeni İsmi: \`${channel.name}\`\n ID: ${channel.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${channel.client.user.username}#${channel.client.user.discriminator}`, channel.client.user.avatarURL)
    c.send(embed)
});




client.on('emojiCreate', emoji => {
  const c = emoji.guild.channels.get(db.fetch(`codeminglog_${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Bir Emoji Oluşturuldu`, ` İsmi: \`${emoji.name}\`\n GIF?: **${emoji.animated}**\n ID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(embed)
    });
client.on('emojiDelete', emoji => {
  const c = emoji.guild.channels.get(db.fetch(`codeminglog_${emoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Bir Emoji Silindi!`, ` İsmi: \`${emoji.name}\`\n GIF? : **${emoji.animated}**\n ID: ${emoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${emoji.client.user.username}#${emoji.client.user.discriminator}`, emoji.client.user.avatarURL)

    c.send(embed)
    });
client.on('emojiUpdate', (oldEmoji, newEmoji) => {
  const c = newEmoji.guild.channels.get(db.fetch(`codeminglog_${newEmoji.guild.id}`));
  if (!c) return;

    let embed = new Discord.RichEmbed()
                    .addField(`Bir Emoji Güncellendi`, ` Eski İsmi: \`${oldEmoji.name}\`\n Yeni ismi: \`${newEmoji.name}\`\n ID: ${oldEmoji.id}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${newEmoji.client.user.username}#${newEmoji.client.user.discriminator}`, newEmoji.client.user.avatarURL)

    c.send(embed)
    });

client.on('guildBanAdd', async (guild, user) => {    
    const channel = guild.channels.get(db.fetch(`codeminglog_${guild.id}`));
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.RichEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                    .addField(`Bir Kullanıcı Banlandı`, ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Sebep: **${entry.reason || 'Belirtmedi'}**\n Banlayan: **${entry.executor.username}#${entry.executor.discriminator}**`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} Tarafından`, entry.executor.avatarURL)

    channel.send(embed)
});


client.on('guildBanRemove', async (guild, user) => {    
    const channel = guild.channels.get(db.fetch(`codeminglog_${guild.id}`));
  if (!channel) return;
  
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())

    let embed = new Discord.RichEmbed()
                    .setAuthor(`${user.username}#${user.discriminator}`, user.avatarURL)
                    .addField(`Bir Kullanıcının Banı Açıldı`, ` İsmi: \`${user.username}\`\n ID: **${user.id}**\n Banı Kaldıran: **${entry.executor.username}#${entry.executor.discriminator}**`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${entry.executor.username}#${entry.executor.discriminator} Tarafından`, entry.executor.avatarURL)

    channel.send(embed)
});
client.on('messageDelete', async message => {    
  if(message.author.bot) return

    const channel = message.guild.channels.get(db.fetch(`codeminglog_${message.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
                    .setAuthor(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
                    .setDescription("Bir Mesaj Silindi!")                
                    .addField(`Silinen Mesaj : ${message.content}`,`Kanal: ${message.channel.name}`)
                  //  .addField(`Kanal:`,`${message.channel.name}`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    .setFooter(`${message.client.user.username}#${message.client.user.discriminator}`, message.client.user.avatarURL)

    channel.send(embed)
});

client.on('messageUpdate', async(oldMessage, newMessage) => {
    if(oldMessage.author.bot) return;
    if(oldMessage.content == newMessage.content) return;

    const channel = oldMessage.guild.channels.get(db.fetch(`codeminglog_${oldMessage.guild.id}`));
    if(!channel) return;

    let embed = new Discord.RichEmbed()
    .setDescription("Bir Mesaj Güncellendi!")
    .addField("Eski Mesaj : ",`${oldMessage.content}`)
    .addField("Yeni Mesaj : ",`${newMessage.content}`)
    .addField("Kanal : ",`${oldMessage.channel.name}`)
    .setTimestamp()
    .setColor("RANDOM")
    .setFooter(`${oldMessage.client.user.username}#${oldMessage.client.user.discriminator}`,`${oldMessage.client.user.avatarURL}`)

    channel.send(embed)
});

client.on('roleCreate', async (role) => {    

    const channel = role.guild.channels.get(db.fetch(`codeminglog_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
.addField(`Bir Rol oluşturuldu`, ` İsmi: \`${role.name}\`\n ID: ${role.id}`)                    
.setTimestamp()
.setColor("RANDOM")
.addField("Rol renk kodu : ",`${role.hexColor}`)
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(embed)
});

client.on('roleDelete', async (role) => {    

    const channel = role.guild.channels.get(db.fetch(`codeminglog_${role.guild.id}`));
  if (!channel) return;
  
    let embed = new Discord.RichEmbed()
.addField(`Bir Rol silindi`, ` İsmi: \`${role.name}\`\n ID: ${role.id}`)                    
.setTimestamp()
.setColor("RANDOM")
    .addField("Rol renk kodu : ",`${role.hexColor}`)
.setFooter(`${role.client.user.username}#${role.client.user.discriminator}`, role.client.user.avatarURL)

    channel.send(embed)
})
client.on('voiceStateUpdate', (oldMember, newMember) => {
  
 // if (!logA[oldMember.guild.id]) return;
  
  if (db.has(`codeminglog_${oldMember.guild.id}`) === false) return;
  
  var kanal = oldMember.guild.channels.get(db.fetch(`codeminglog_${oldMember.guild.id}`).replace("<#", "").replace(">", ""))
  if (!kanal) return;
  
  let newUserChannel = newMember.voiceChannel
  let oldUserChannel = oldMember.voiceChannel

  if(oldUserChannel === undefined && newUserChannel !== undefined) {

    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`${newMember.user.tag} Adlı Kullanıcı \`${newUserChannel.name}\` İsimli Sesli Kanala Giriş Yaptı!`)
    kanal.send(embed);
    
  } else if(newUserChannel === undefined){

    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setDescription(`${newMember.user.tag} Adlı Kullanıcı Ses Kanalından Çıkış Yaptı!`)
    kanal.send(embed);
    
  }
});
//MOD-LOG Sistemi Bitiş//

//Davet-Sistemi//
const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on("guildMemberRemove", async member => {
  let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
  if (!kanal) return;
  let veri = await db.fetch(`rol1_${member.guild.id}`);
  let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
  let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
  let veri2 = await db.fetch(`rol2_${member.guild.id}`);
  let d = await db.fetch(`bunudavet_${member.id}`);
  const sa = client.users.get(d);
  const sasad = member.guild.members.get(d);
  let sayı2 = await db.fetch(`davet_${d}_${member.guild.id}`);
  db.add(`davet_${d}_${member.guild.id}`, -1);

  if (!d) {
    const aa = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(`\`\`${member.user.tag}\`\` **Adlı Kullanıcı Sunucudan Çıkış Yaptı. \n Kullanıcıyı Davet Eden:** \`\`Bulunamadı!\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);
    return;
  } else {
    const aa = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(
        ` \`\`${member.user.tag}\`\` **Adlı Kullanıcı Sunucudan Çıkış Yaptı.\n Kullanıcıyı Davet Eden:** \`\`${sa.tag}\`\``
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);

    if (!veri) return;

    if (sasad.roles.has(veri)) {
      if (sayı2 <= veri12) {
        sasad.removeRole(veri);
        return;
      }
    }
    if (sasad.roles.has(veri2)) {
      if (!veri2) return;
      if (sayı2 <= veri21) {
        sasad.removeRole(veri2);
        return;
      }
    }
  }
});

client.on("guildMemberAdd", async member => {
  member.guild.fetchInvites().then(async guildInvites => {
    let veri = await db.fetch(`rol1_${member.guild.id}`);
    let veri12 = await db.fetch(`roldavet1_${member.guild.id}`);
    let veri21 = await db.fetch(`roldavet2_${member.guild.id}`);
    let veri2 = await db.fetch(`rol2_${member.guild.id}`);
    let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
    if (!kanal) return;
    const ei = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;

    const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
    const sasad = member.guild.members.get(invite.inviter.id);
    const davetçi = client.users.get(invite.inviter.id);

    db.add(`davet_${invite.inviter.id}_${member.guild.id}`, +1);
    db.set(`bunudavet_${member.id}`, invite.inviter.id);
    let sayı = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

    let sayı2;
    if (!sayı) {
      sayı2 = 0;
    } else {
      sayı2 = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);
    }

    const aa = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(
        ` \`\`${member.user.tag}\`\` **İsimli Kullanıcı Sunucuya Giriş Yaptı.\n Kullanıcıyı Davet Eden:** \`\`${davetçi.tag}\`\`\n **Toplam \`\`${sayı2}\`\` Daveti Oldu!**`
      )
      .setFooter(client.user.username, client.user.avatarURL);
    client.channels.get(kanal).send(aa);
    if (!veri) return;

    if (!sasad.roles.has(veri)) {
      if (sayı2 => veri12) {
        sasad.addRole(veri);
        return;
      }
    } else {
      if (!veri2) return;
      if (sayı2 => veri21) {
        sasad.addRole(veri2);
        return;
      }
    }
  });
});
//Davet-Sistemi Bitiş//


//Seviye Sistemi
client.on("message", async msg => {

let durm = db.fetch(`seviyeaktf.${msg.guild.id}`)

if (!durm)
return;
else (durm == "ac")

if (msg.author.bot)
return;

if (msg.channel.type === "dm")
return;

if (msg.content.length >= 2) {

db.add(`hamsterxpmiktari.${msg.author.id + msg.guild.id}`, 2)

};

const kisiId = msg.author.id

const snn = msg.author

if (db.fetch(`hamsterxpmiktari.${msg.author.id + msg.guild.id}`) >= 300) {

db.add(`hamsterlvl.${msg.author.id + msg.guild.id}`, 1)
db.add(`hamsterxpmiktari.${msg.author.id + msg.guild.id}`, -300)

let lvllog = db.fetch(`hamsterxplogkanal.${msg.guild.id}`)

if (!lvllog)
return;

const lvllogknl = client.channels.get(lvllog.id)

let msj = db.fetch(`lvlupmsj.${msg.guild.id}`)
.replace(`%kişi%`, `<@${kisiId}>`)
.replace(`%level%`, db.fetch(`hamsterlvl.${msg.author.id + msg.guild.id}`))

if (!msj)
return;

const lvlatladimsj = msj

const sbb = new Discord.RichEmbed()
.setColor("RANDOM")
.setDescription(lvlatladimsj)
.setThumbnail(snn.avatarURL)

lvllogknl.send(sbb)

};

});

//gelen-giden
client.on("guildMemberAdd", member => {
 let gelengiden = JSON.parse(fs.readFileSync('./ayarlar/gelengiden.json', 'utf8'));
  var asd = db.fetch(`hgbb_${member.guild.id}`)
     let guild = member.guild;
       var Durum = member.user.presence.status;
        var Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
        var durm = (Durum == "online" ? ("Çevrimiçi", `Çevrimiçi`) : (Durum == "offline" ? ("Çevrimdışı", `Çevrimdışı`) : (Durum == "idle" ? ("Boşta", `<Boşta`) : (Durum == "dnd" ? ("Rahatsız Etmeyin", `Rahatsız Etme`) : ("Bilinmiyor/bulunamadı.")))))
  const channel = member.guild.channels.find("id", asd.id);
  if (!channel) return;
  const embed = new Discord.RichEmbed()
    .setColor("GREEN")
    .setAuthor(
      member.user.tag,
      member.user.avatarURL || member.user.defaultAvatarURL
    )
    .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
    .setTitle(`**${member.user.username}** **${guild.name}** Adlı Sunucumuza Giriş Yaptı!`)
    .setDescription(`**${member.guild.memberCount}** Üyeye Ulaştık!`)
    .addField("`kullanıcı`", `${member.user.tag}`)
    .addField("`ID`", `${member.user.id}`)
    .addField("`Durum`", `${durm}`)
    .setTimestamp();
  channel.send(embed);
});

client.on("guildMemberRemove", member => {
    let gelengiden = JSON.parse(fs.readFileSync('./ayarlar/gelengiden.json', 'utf8'));
    var asd = db.fetch(`hgbb_${member.guild.id}`)
         let guild = member.guild;
         var Durum = member.user.presence.status;
        var Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
        var durm = (Durum == "online" ? ("Çevrimiçi", `Çevrimiçi`) : (Durum == "offline" ? ("Çevrimdışı", `Çevrimdışı`) : (Durum == "idle" ? ("Boşta", `Boşta`) : (Durum == "dnd" ? ("Rahatsız Etmeyin", `Rahatsız Etme`) : ("Bilinmiyor/bulunamadı.")))))
  const channel = member.guild.channels.find("id", asd.id);
  if (!channel) return;
  const embed = new Discord.RichEmbed()
    .setColor("RED")
    .setAuthor(
      member.user.tag, 
      member.user.avatarURL || member.user.defaultAvatarURL
    )
    .setThumbnail(member.user.avatarURL || member.user.defaultAvatarURL)
    .setTitle(`**${member.user.username}** **${guild.name}** Adlı Sunucumuzdan Ayrıldı!`)
    .setDescription(`**${member.guild.memberCount}** Üyeye düştük!`)
    .addField("`kullanıcı`", `${member.user.tag}`)
    .addField("`ID`", `${member.user.id}`)
    .addField("`Durum`", `${durm}`)
    .setTimestamp();
  channel.send(embed);
});

;

//Otorol
client.on("guildMemberAdd", member => {

let otorolrolu = db.fetch(`alphaotorol${member.guild.id}`)

if (!otorolrolu)
  return;

const roll = otorolrolu.id

if(!roll)
  return;

member.addRole(roll)

});