module.exports = {
  name: "toss",
  usage: "toss <x> ['Option 1|Option 2']",
  desc: "Tosses a coin <x> times and outputs the winning side and the results of each toss, H or T. Optionally you can specify 2 choices for the coin toss from which to select separated by | i.e Option 1|Option 2",
  alias: ["coin"],
  run(client, message, args) {
    var flips;
    if (isNaN(args[0]) || args[0] == undefined) {
      flips = 1;
    }
    else {
      flips = args[0];
      args.shift();
    }
    if(args.length > 1) {
      args = args.join(" ");
    } else {
      args = args[0];
    }
    var headOpt = "";
    var tailOpt = "";
    var tossOptions = "";
    try {
      tossOptions = args.split('|');
      headOpt = tossOptions[0] + " ";
      tailOpt = tossOptions[1] + " ";

    } catch (err) {
      if(tossOptions.length == 1) {
        message.channel.send("Please give me two options from which to choose in the form `[opt1|opt2]`. Thank you!");
        return false;
      }
    }


    const maxFlips = 500;
    const minFlips = 1
    var headCount = 0;
    var tailCount = 0;
    var headPercent = 0;
    var tailPercent = 0;
    if (flips > maxFlips) {
      message.channel.send("Coin flips set to "+maxFlips+".");
      flips = maxFlips;
    } else if (flips <= 0) {
      message.channel.send("Coin flips set to one.");
      flips = minFlips;
    }
    var flipText = "```\n";
    var ifHeads;
    for (var i = 1; i <= flips; ++i) {
      ifHeads = client.random(2) == 1;
      if (ifHeads) {
        flipText += "H";
        headCount++;
      } else {
        flipText += "T";
        tailCount++;
      }
    }
    headPercent = Math.round(headCount / flips * 100000) / 1000;
    tailPercent = Math.round(tailCount / flips * 100000) / 1000;

    flipText += "\n\n"+ headOpt +"-Heads-: " + headCount + " - " + headPercent + "%";
    flipText += "%\n"+ tailOpt +"-Tails-: " + tailCount + " - " + tailPercent + "%```\n";
    flipText += "**";
    console.log(tossOptions);
    if(tossOptions != null && tossOptions != undefined && tossOptions != '') {
      flipText += headCount > tailCount ? headOpt : tailOpt;
    } else {
      flipText += headCount > tailCount ? "Heads " : "Tails ";
    }
    flipText += "wins!**";
    message.channel.send(flipText);
  }
}