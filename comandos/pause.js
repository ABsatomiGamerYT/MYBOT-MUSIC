const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
  name: "pause",
  alias: ["pausa","pausar"],

async execute (client, message, args){
message.delete({})

const serverQueue = client.distube.getQueue(message)

if(!message.member.voice.channel) return message.channel.send("Debes estar en el mismo canal de voz para usar el comando")

if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("Debes estar en el mismo canal de yo")

if(!serverQueue) return message.channel.send("No hay canciones reproduciendose")
if(serverQueue.pause) return message.channel.send("La musica ya esta pausada")

client.distube.pause(message)

message.channel.send("La cancion fue pausada Correctamente")


 }

}