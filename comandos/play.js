const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const discord = require('discord-reply')

module.exports = {
  name: "play",
  alias: [""],

async execute (client, message, args){
message.delete({})

try {
      const cancion = args.join(" ");

      if (!message.member.voice.channel) return message.channel.send("Debes estar en un canal de voz.")

      if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send("Debes estar en el mismo canal de voz que yo.")

      if (!cancion) return message.channel.send("Dime que canción vas a reproducir.")

      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel.permissionsFor(message.guild.me).has("VIEW_CHANNEL"))
        return message.channel.send('Necesito el permiso **ver canal** para poder unirme.')

      if (!voiceChannel.permissionsFor(message.guild.me).has("CONNECT"))
        return message.channel.send('Necesito que me des permisos para **conectarme** a tu canal de voz.')

      if (!voiceChannel.permissionsFor(message.guild.me).has("SPEAK"))
        return message.channel.send('Necesito el permiso **hablar** para poder ponerte la canción.')

      client.distube.play(message, cancion)

} catch (e) {
    message.channel.send(`Hubo un error inesperado: **${e}**`)
}

  }

 }
 