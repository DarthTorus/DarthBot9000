const { alias } = require("../main/cookie");

module.exports = {
  name: "default",
  usage: "rpg <command>",
  desc: "Role-playing game commands",
  alias: [],
  run(client, message, args) {
    message.reply("I can't just do things randomly. I do as I am told.")
  }
}