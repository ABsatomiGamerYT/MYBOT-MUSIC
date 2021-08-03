const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const discord = require('discord-reply')

module.exports = {
  name: "skipto",
  alias: [""],

async execute (client, message, args){
  
  const queue = client.distube.getQueue(message)

  if(!message.member.voice.channel) return message.channel.send("Debes estar en un canal de voz.")

  if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("Debes estar en el mismo canal de voz que yo.")

  if(!queue) return message.channel.send("No hay canciones reproduciendose.")

  if(!args[0]) return message.channel.send("Debes decir hasta que canción vas a saltar.")
  if(isNaN(args[0])) return message.channel.send("Debes decir un número válido")

  client.distube.jump(message, parseInt(args[0] - 1))

 }

}