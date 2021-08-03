const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const discord = require('discord-reply')

module.exports = {
  name: "resume",
  alias: [""],

async execute (client, message, args){

  const queue = client.distube.getQueue(message)

  if(!message.member.voice.channel) return message.channel.send("Debes estar en un canal de voz.")

  if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("Debes estar en el mismo canal de voz que yo.")

  if(!queue.pause) return message.channel.send("La canción no estaba pausada.")
  client.distube.resume(message)
      message.channel.send("La canción fue continuada correctamente")
      return;

  }

 }