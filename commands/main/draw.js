const client = process.Discord
const maxDraws = 10
module.exports = {
  name: "draw",
  usage: "draw",
  desc: `Draws <x> cards up to ${maxDraws}, and with duplicates [yes | no]`,
  alias:["cards","card"],
  run(client, message, args) {
    var draws = args[0] || 1;
    
    var duplicates = args[1] || "yes";
    var card = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    var suit = [":spades:", ":hearts:", ":clubs:", ":diamonds:"];
    var cardSelected = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    var cardText = "";
    if (duplicates == "yes" && draws > maxDraws*2) {
      message.channel.send("Number of draws set to "+maxDraws*2);
      draws = maxdraws*2;
    } else if (duplicates == "no" && draws > maxDraws) {
      message.channel.send("Number of draws set to "+maxDraws);
      draws = maxDraws;
    }
    if (draws <= 0) {
      message.channel.send("Number of draws set to 1");
      draws = 1;
    }
    if (duplicates == "yes") {
      for (var i = 1; i <= draws; ++i) {
        var s = client.random(4);
        var c = client.random(13);
        cardText += (card[c] + suit[s] + " ");
      }
    } else {
      var i = 0;
      while (i < draws) {
        var s = client.random(4);
        var c = client.random(13);
        if (cardSelected[s, c] != 1) {
          cardText += (card[c] + suit[s] + " ");
          cardSelected[s, c] = 1;
          i++;
        }
      }
    }
    message.channel.send(`Your cards are:  ${cardText}`);
  }
}