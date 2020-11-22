const client = process.Discord
module.exports = ( ) => {

  return ( message ) => {
      var serverName;
      var serverID;
      var channelName;
      var channelID;
      //console.log(message);
      if(message.channel.type ==='text') {
        serverName = message.guild.name;
        serverID = message.guild.id;
        channelName = message.channel.name;
        channelID = message.channel.id
      } else {
        serverName = "Direct Messages";
        serverID = message.channel.id;
        channelName = message.author.username;
        channelID = message.author.id;
      }
    
      var userName = message.author.username;
      var userID = message.author.id;
      var logDate = new Date().toLocaleTimeString('en-US', { hour12: false })
     /*  var logHour = logDate.getHours();
      var logMin = logDate.getMinutes();
      var logSec = logDate.getSeconds(); */
      if ( message.author.bot || !message.content.startsWith( process.env.TRIGGER ) ) return

      const args = message.content.split(' ')
      let request = args.shift()
          .slice( process.env.TRIGGER.length );
      console.log(request)
      let parent;
      if ( client.commands.has( request ) && client.commands.get( request ).has('default') ) {
          parent = request
          request = args.shift() || 'default'
      } else {
          parent = 'main'
      }
      const command = client.commands.get( parent ).find(command => command.name === request || command.alias.includes(request) )
      if ( !command ) return
      // Log the command
			console.log(client.colors.brightYellow("Server ID: " + serverID));
			console.log(client.colors.brightYellow("Channel ID: " + channelID));
			console.log(client.colors.brightYellow("Message ID: " + message.id));
			console.log(client.colors.brightCyan(`${logDate} ${message.author.username} - ID: `) + client.colors.brightYellow(`@${userID}`));
			console.log("in " + client.colors.magenta(serverName + " - #" + channelName));
			console.log(client.colors.white(message.content));
      command.run( client, message, args ) 
         
  }

}