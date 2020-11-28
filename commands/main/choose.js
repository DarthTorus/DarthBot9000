module.exports = {
  name: "choose",
  usage: "choose <values separated by commas>",
  desc: "Chooses a random item from the list provided",
  alias: ["select"],
  run(client, message, args) {
    let options = args.join(' ').split(", ")
    message.channel.send(`Randomly chosen option: ${options[client.random(options.length)]}`)
  }
}