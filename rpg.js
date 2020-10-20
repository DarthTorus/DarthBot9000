var bot = process.DiscordBot;
var rpgItems = require("./rpgItems.json");
var npc = require("./npc.js")

function rpgCheck(msg, message) {
  console.log(msg);
  switch (msg[0]) {
    case 'item':
      getRpgItem(message);
      break;
    case 'npc':
    case 'cave':
    case 'dungeon':
    case 'weather':
    default:
      message.channel.send("I'm sorry, but this command doesn't exist yet.");
  }
}


function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}

// Outputs a random RPG item with random stats
function getRpgItem(message) {
	var rpgObj = rpgItems;
	var adj = rpgObj.adjectives;
	var col, trt, item, phrase, sel;

	var colI = bot.random(adj.colors.length);
	var traitI = bot.random(adj.traits.length);
	var itemI = bot.random(rpgObj.items.length);
	var phrI = bot.random(rpgObj.phrases.length);
	var statI = 0;
	var itemText = "";
	var formatText = "================================================\n";
	var statText = "";
	col = capitalize(adj.colors[colI]);
	trt = capitalize(adj.traits[traitI]);
	item = capitalize(rpgObj.items[itemI]);
	phrase = rpgObj.phrases[phrI];
	itemText = "```diff\nThe " + trt + " " + col + " " + item + " of " + phrase + "\n";
	sel = new Set();
	while(sel.size < 3) {
		statI = bot.random(rpgObj.stats.length);
		sel.add(rpgObj.stats[statI]);
	}
	var statArr = Array.from(sel)
	for(var i = 0; i < 3; i++) {
		var randBool = bot.random() < 0.5;
		var randVal = 0;
		if(randBool) {
			randVal = bot.mapValue(bot.random(-15,10),-10,10,-50,50);
			if(randVal >= 0) {
				randVal = "+" + randVal;
			}
			randVal += "%";

		} else {
			randVal = bot.mapValue(bot.random(-20,20),-20,20,-100,100);
			if(randVal >= 0) {
				randVal = "+" + randVal;
			}
		}
		statText += randVal + " to " + statArr[i] + "\n";
	}
	statText += "```";
	message.channel.send((itemText+ formatText + statText));
}

var rpg = {
  rpgCheck: rpgCheck
}
module.exports = rpg;
