const Discord = require('discord.js');
const client = new Discord.Client()

const sql = require('sqlite');
const config = require('./config.json');
const { Collection, Guild } = require('discord.js');

const fs = require('fs');
let { readdirSync } = require('fs');


client.queue = new Map();


///////////////////HANDLER////////////////

client.commands = new Discord.Collection();
const commandFiles = fs
	.readdirSync('./comandos')
	.filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./comandos/${file}`);
	client.commands.set(command.name, command);
}

for(const file of readdirSync('./eventos')){
  if(file.endsWith('.js')){
    let fileName = file.substring(0, file.length - 3)

    let fileContents = require(`./eventos/${file}`)

    client.on(fileName, fileContents.bind(null, client))
  }
}


//////////////////////TEMA MUSICA////////////////
const DisTube = require("distube");

client.distube = new DisTube(client, {

 emitNewSongOnly: true,
     searchSongs: false,
     leaveOnStop: true,
   leaveOnFinish: true,
    leaveOnEmpty: true,
     searchSongs: 10,

 customFilters: {
        cursed: "vibrato=f=6.5,tremolo,aresample=48000,asetrate=48000*1.25",
          "8d": "apulsator=hz=0.075",
       lowbass: "bass=g=6",
        treble: "treble=g=5",
    normalizer: "dynaudnorm=f=200",
         clear: "dynaudnorm=f=200",
   },
}); 

client.distube.on("playSong", (message, queue, song) => message.channel.send(`Reproduciendo ahora: **${song.name}** - **${song.formattedDuration}**`))

client.distube.on("addSong", (message, queue, song) => message.channel.send(`Canción añadida a la playlist: **${song.name}** - **${song.formattedDuration}**`))

client.distube.on("addList", (message, queue, playlist) => message.channel.send(`Playlist: **${playlist.name}** canciones: (**${playlist.songs.length}** songs)`))

client.distube.on("playList", (message, queue, playlist, song) => message.channel.send(`Playlist: **${playlist.name}** canciones: (**${playlist.songs.length}**).\nAhora: **${song.name}** - **${song.formattedDuration}**`))

client.distube.on("empty", (message) => message.channel.send("`El canal está vacío, voy a abandonarlo.`"))

client.distube.on("finish", (message) => message.channel.send("No hay más canciones en la playlist, voy a abandonar el canal de voz."))

client.distube.on("noRelated", (message) => message.channel.send("No se han encontrado resultados :c"))

client.distube.on("error", (message, err) => message.channel.send(`Hubo un error inesperado 😔 **(${err})**`))

client.distube.on("empty", (message) => message.channel.send("El canal está vacío, voy a abandonarlo."))

client.distube.on("finish", (message) => message.channel.send("No hay más canciones en la playlist, voy a abandonar el canal de voz."))

client.distube.on("noRelated", (message) => message.channel.send("No se han encontrado resultados :c"))

client.distube.on("searchResult", (message, result) => {

let i = 0;
const embedSerachResuls = new Discord.MessageEmbed()

      .setTitle(`Elije una Opcción`)
      .setDescription(`${result.map(song => `**\`${++i}\`** ${song.name} - \`${song.formattedDuration}\``).join("\n")}`)
      .setColor("BLUE")
      .setFooter("Solo tienes 30 segundos!`");

message.channel.send(embedSerachResuls)
})

client.distube.on("searchCancel", (message) => message.channel.send("Búsqueda cancelada."))

client.login(config.token);