function clearRequireCache() {
  Object.keys(require.cache).forEach(function(key) {
    delete require.cache[key];
  });  
}

module.exports = {
  name: "reload",
  usage: "reload",
  desc: "Will reload the bot",
  alias: ["-r"],
  run(client, message, args) {
    if(message.author.id != process.env.OWNER_ID) {
      message.reply("You don't have the permission to do that.")
    } 
    else {
      try {
        clearRequireCache()
        client.loadFiles(client)
        message.reply(`I have reloaded sucessfully`)
        client.randomStatus("0")
      }
      catch(error) {
        message.reply(`I can't seem to reload. I have an error of: ${error}`)
        client.randomStatus("with a broken script")
      }
    }
  }
}