const MAX_DRAWS = 15
module.exports = {
  name: "draw",
  usage: "draw <x> [no | yes]",
  desc: `Draws <x> cards up to ${MAX_DRAWS} without duplicates and up to ${MAX_DRAWS*2} with duplicates`,
  alias:["cards","card"],
  run(client, message, args) {
    let draws = args[0] || 1;
    
    let duplicates = args[1] || "yes";
    let value = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let suit = ["♣", "♥", "♠", "♦"];
    let cardSelected = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    let cardText = "";
    if (duplicates == "yes" && draws > MAX_DRAWS*2) {
      message.channel.send("Number of draws set to "+MAX_DRAWS*2);
      draws = MAX_DRAWS*2;
    } 
    else if (duplicates == "no" && draws > MAX_DRAWS) {
      message.channel.send("Number of draws set to "+MAX_DRAWS);
      draws = MAX_DRAWS;
    }
    if (draws <= 0) {
      message.channel.send("Number of draws set to 1");
      draws = 1;
    }
    if (duplicates == "yes") {
      for (var i = 1; i <= draws; ++i) {
        var s = client.random(4);
        var c = client.random(13);
        cardText += (value[c] + suit[s] + " ");
      }
    } else {
      var i = 0;
      while (i < draws) {
        var s = client.random(suit.length)
        var v = client.random(value.length)
        if (cardSelected[s][v] == 0) {
          cardText += (value[v] + suit[s] + " ");
          cardSelected[s][v] = 1;
          i += 1
        }
      }
    }
    message.channel.send(`Your cards are: \`${cardText}\``);
  }
}