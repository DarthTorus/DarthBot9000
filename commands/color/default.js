module.exports = {
  name: "default",
  usage: "color <subcommand>",
  desc: "Color commands",
  alias: ["colour"],
  run(client, message, args) {
    message.channel.send("Please type a subcommand.")
  }
}