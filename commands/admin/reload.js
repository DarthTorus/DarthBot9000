function deleteBotCommandModules() {
  for(var key in require.cache) { // loop through each key
     if(key.includes("commands")) { // If the key includes folder names of "commands", delete that key. We want the events to stay loaded.
      delete key
    }
  }
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
        deleteBotCommandModules()
        client.loadFiles()
        message.reply(`I have reloaded sucessfully`)
        client.randomStatus("0")
      }
      catch(error) {
        message.reply(`I can't seem to reload. I have an error of:\n\`\`\`\n${error}\`\`\``)
        client.randomStatus("with a broken script")
      }
    }
  }
}