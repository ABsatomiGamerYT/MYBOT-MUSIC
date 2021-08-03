const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const discord = require('discord-reply')

module.exports = {
  name: "ping",
  alias: [],

async execute (client, message, args){

  message.channel.send(`Mi ping es de **${client.ws.ping}**`)

 }

}
