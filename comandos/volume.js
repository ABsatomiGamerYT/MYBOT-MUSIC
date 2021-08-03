const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const discord = require('discord-reply')

module.exports = {
  name: "volume",
  alias: [""],

async execute (client, message, args){

const queue = client.distube.getQueue(message)

if(!message.member.voice.channel) return message.channel.send("Debes estar en un canal de voz.")

if(message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("Debes estar en el mismo canal de voz que yo.")

if(!queue) return message.channel.send("No hay canciones reproduciendose.")

const porcentaje = args[0]
if(!porcentaje) return message.channel.send("Debes decir a que volumen lo vas a poner")
if(isNaN(porcentaje)) return message.channel.send("El porcentaje debe ser un número")
if(porcentaje < 1) return message.channel.send("El porcentaje **no** puede ser **menor** que **1**")
if(porcentaje > 100) return message.channel.send("El porcentaje **no** puede ser **mayor** que **100**")

client.distube.setVolume(message, porcentaje)
message.channel.send(`El volumen se ha establecido a **${porcentaje}%**`)

}

}