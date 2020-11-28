module.exports = {
  name: 'ping',
  usage: 'ping',
  desc: 'Checks if the bot is responding to commands',
  alias: [],
  run (client, message, args) {
      message.channel.send( 'Pong!' )

  }

}