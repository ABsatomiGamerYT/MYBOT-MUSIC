module.exports = (client) => {

    const array = [
        {
          name: `QUE VIVA LA MUSICA UWU`,
          type: `PLAYING`
        },
        {
          name: `ABsatomiGamerYT en yt`,
          type: `LISTENING`
        }
      ]
      
          setInterval(() => {
              function presence() {
                  client.user.setPresence({
                    status: 'online',
                      activity: array[Math.floor(Math.random() * array.length)],
                  });
              }
              presence();
          }, 20000);
      
          console.log("EL BOT DE MUSICA ESTA LISTO")
    
}