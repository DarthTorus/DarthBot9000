const RPG_ITEMS = require("../../json/rpgItems.json")
module.exports = {
  name: "item",
  usage: "item",
  desc: "Generates a random item",
  alias:[],
  run(client,message,args) {
    var rpgObj = RPG_ITEMS;
	  var adj = rpgObj.adjectives;
	  var col, trt, item, phrase, sel;

    var colorI = client.random(adj.colors.length);
    var traitI = client.random(adj.traits.length);
    var itemI = client.random(rpgObj.items.length);
    var phraseI = client.random(rpgObj.phrases.length);
    var statI = 0;
    var itemText = "";
    var formatText = "================================================\n";
    var statText = "";
    col = client.titleCase(adj.colors[colorI]);
    trt = client.titleCase(adj.traits[traitI]);
    item = client.titleCase(rpgObj.items[itemI]);
    phrase = rpgObj.phrases[phraseI];
    itemText = "```diff\nThe " + trt + " " + col + " " + item + " of " + phrase + "\n";
    sel = new Set();
    while(sel.size < 3) {
      statI = client.random(rpgObj.stats.length);
      sel.add(rpgObj.stats[statI]);
    }
    var statArr = Array.from(sel)
    for(var i = 0; i < 3; i++) {
      var randBool = client.random() < 0.5;
      var randVal = 0;
      if(randBool) {
        randVal = client.mapValue(client.random(-15,10),-10,10,-50,50);
        if(randVal >= 0) {
          randVal = "+" + randVal;
        }
        randVal += "%";

      } else {
        randVal = client.mapValue(client.random(-20,20),-20,20,-100,100);
        if(randVal >= 0) {
          randVal = "+" + randVal;
        }
      }
      statText += randVal + " to " + statArr[i] + "\n";
    }
    statText += "```";
    message.channel.send((itemText+ formatText + statText));
  }
}