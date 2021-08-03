const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const discord = require('discord-reply')

module.exports = {
  name: "repeat",
  alias: [""],

async execute (client, message, args){

const queue = client.distube.getQueue(message)

if(!message.member.voice.channel) return message.channel.send("Debes estar en un canal de voz.")

if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("Debes estar en el mismo canal de voz que yo.")

if(!queue) return message.channel.send("No hay canciones reproduciendose.")


const opcion = args[0]
if(!opcion) return message.channel.send("Debes decirme una opción. (on/off)")


if(opcion !== 'on'){
    if(opcion !== 'off'){
      return message.channel.send("Eso no es una opción válida.")
    }
}

if(opcion !== 'off'){
    if(opcion !== 'on'){
      return message.channel.send("Eso no es una opción válida.")
    }
}
  
if(opcion === 'off'){
   client.distube.setRepeatMode(message, 0);
   message.channel.send("La **repetición** se ha **desactivado**")
}

if(opcion === 'on'){
   client.distube.setRepeatMode(message, 2);
   message.channel.send("La **repetición** se ha **activado**")
}

  }
}