const Discord = require("discord.js")
const db = require("megadb")
const cooldowns = new Discord.Collection()

module.exports = async (client, message) => {

let prefix = '+'

if(message.author.bot) return;
if(message.channel.type === 'dm') return;
if(!message.content.startsWith(prefix)) return;

let usuario = message.mentions.members.first() || message.member; 
const args = message.content.slice(prefix.length).trim().split(/ +/g);
const command = args.shift().toLowerCase();

const options = {
    args,
    commands: client.commands
};

let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));

if(cmd){
  
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection())
    }
    let now = Date.now()
    let timestamps = cooldowns.get(command.name)
    let cooldownAmount = (command.cooldown || 3) * 1000
    if (timestamps.has(message.author.id)) {
        let expirationTime = timestamps.get(message.author.id) + cooldownAmount
        if (now < expirationTime) {
            let timeleft = (expirationTime - now) / 1000
            return message.channel.send(`Hey **${message.author.tag}**, espera **${timeleft.toFixed(0)} segundos** antes de usar el comando`)
        }
    }
    timestamps.set(message.author.id, now)
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
    timestamps.set(message.author.id, now)
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)
 cmd.execute(client, message, args)
}

if(!cmd){
   const embed = new Discord.MessageEmbed()
        .setTitle("ADVERTENCIA")
        .setDescription(`El comando **${command}** no existe, prueba usándolo de otra forma.`)
        .setColor("RED")
        .setTimestamp()
  message.channel.send(embed)
  return;
}

}