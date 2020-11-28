module.exports = {
  name: "randomize",
  usage: "randomize <values separated by commas>",
  desc: "Randomizes the list provided",
  alias: [],
  run(client, message, args) {
    let msg = args.join(' ')
    let startList = msg.split(", ")
	  let randomList = []

    while(startList.length > 0) {
      var tempIndex = client.random(startList.length)
      randomList.push(startList[tempIndex])
      startList.splice(tempIndex,1)
    }
    message.channel.send(`Your randomized list: \`\`\`\n${randomList.join("\n")}\`\`\``)
  }
}