module.exports = {
  name: "triangle",
  usage: "triangle",
  desc: "Just run it",
  alias: ["adryd"],
  run(client, message, args) {
    var txt = "```\n";
    txt += "            __\n";
    txt += "           /\\ \\\n";
    txt += "          /  \\ \\\n";
    txt += "         / /\\ \\ \\\n";
    txt += "        / / /\\ \\ \\\n";
    txt += "       / / /  \\ \\ \\\n";
    txt += "      / / /    \\ \\ \\\n";
    txt += "     / / /      \\ \\ \\\n";
    txt += "    / / /        \\ \\ \\\n";
    txt += "   / / /          \\ \\ \\\n";
    txt += "  / / /            \\ \\ \\\n";
    txt += " / / /______________\\_\\ \\\n";
    txt += "/ / /____________________\\\n";
    txt += "\\/_______________________/\n";
    txt += "```"
    message.channel.send(`${txt}`);
  }
}