var bot = process.DiscordBot;
var colors = require('colors/safe');
var Twitter = require("twitter");
var utils = require("mc-utils");
//var concat = require("concat-stream");
var PNGImage = require('pngjs-image');

const reqFiles = ["config.json","admin.js", "banned.json", "calc.js",
	"color.js", "help.js", "info.js", "insults.json", "materials.json",
	"minecraft.js","series.js", "poll.js","rpg.json","cipher.js"];
const names = ["config","admin", "banned", "calc", "color",
	"help", "info", "insults", "mat", "mc","series","polls","rpg","cipher"]; // Names of variables


function requireFiles() {
	for (var name of names) {
		var fileIndex = names.indexOf(name);
		global[name] = require("./" + reqFiles[fileIndex]);
		console.log(colors.yellow(reqFiles[fileIndex]) + colors.cyan(" loaded successfully"));
	}
}

requireFiles();

var darth = new Twitter({
	consumer_key: config.twitter.o.ck,
	consumer_secret: config.twitter.o.cs,
	access_token_key: config.twitter.o.tk,
	access_token_secret: config.twitter.o.ts,
});
var server = new Twitter({
	consumer_key: config.twitter.s.ck,
	consumer_secret: config.twitter.s.cs,
	access_token_key: config.twitter.s.tk,
	access_token_secret: config.twitter.s.ts,
});
var formu = new Twitter({
	consumer_key: config.twitter.b.ck,
	consumer_secret: config.twitter.b.cs,
	access_token_key: config.twitter.b.tk,
	access_token_secret: config.twitter.b.ts,
});

bot.admin = admin;
bot.banned = banned;
bot.insults = insults;
bot.mat = mat;
bot.polls = polls;
bot.rpg = rpg;
bot.darth = darth;
bot.server = server;
bot.formu = formu;



function checkCommands(c, message, uID, chID) {
	var msg = message.split(' '); //Split the string on spaces
	switch (c) { //Command switcher
		case 'ping':
			sendMessages(chID, ["Pong"]);
			break;
		case 'calc':
			calc.calcCheck(msg, chID);
			break;
		case 'admin':
			if (!(chID in bot.directMessages)) {
				var serverID = bot.channels[chID].guild_id;
			}
			if (uID == "133370041142870016" || serverID == "172689601935179776" || (chID in bot.directMessages)) {
				admin.adminCheck(msg, chID);
			} else {
				sendMessages(chID, ["<@" + uID + "> *: You lack permission*"])
			}
			break;
		case 'help':
			help.checkHelp(msg, uID);
			break;
		case 'info':
			info.infoCheck(msg, uID, chID);
			break;
		case 'poll':
		case 'polls':
			polls.pollCheck(msg, uID, chID);
			break;
		case 'mc':
		case 'minecraft':
			mc.minecraftCheck(msg, chID);
			break;
		case 'series':
			series.seriesCheck(msg,chID);
			break;
		case 'butts':
			sendMessages(chID, ["<@" + uID + "> *: You must like big butts then. Don't lie!*"]);
			break;
		case 'roll':
			rollDice(msg, chID);
			break;
		case 'coin':
			coinFlip(msg, chID);
			break;
		case 'integer':
			randInteger(msg, chID);
			break;
		case 'seq':
			//coinFlip(msg, chID);
			break;
		case 'game':
			msg = msg.join(" ");
			admin.randomStatus(msg);
			break;
		case 'cards':
			drawCards(msg, chID);
			break;
		case 'cipher':
			cipher.cipherCheck(msg, chID, uID);
			break;
		case 'adryd':
		case 'triangle':
			doAdryd(chID);
			break;
		case 'hugs':
		case 'hug':
			sendHug(msg, chID, uID);
			break;
		case 'say':
			msg = msg.join(" "); //Join with a space
			repeatMessage(msg, chID, uID);
			break;
		case 'reverse':
			checkReverse(msg, chID);
			break;
		case 'insult':
			getInsult(uID, chID);
			break;
		case 'color':
			color.colorCheck(msg, chID);
			break;
		case 'latex':
		case 'tex':
			calc.getLaTeX(msg, chID);
			break;
		case '8-ball':
		case '8ball':
		case 'magic-conch':
			msg = msg.join(' ');
			get8Ball(msg, chID);
			break;
		case 'map':
		case 'normalize':
			map(msg, chID);
			break;
		case "rpg":
			getRpgItem(chID);
			break;
		case "10print":
		case "10-print":
			do10Print(msg, chID);
			break;
		default:
			break;
	}
}

function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function do10Print(m, cI) {
	var defW = 40;
	var defH = 30;
	var width = Number(m[0]) || defW;
	var height = Number(m[1] || defH)
	if(width > defW) {
		width = defW;
	}
	if(height > defH) {
		height = defH;
	}
	var result = "```";
	var rand = 0;
	for(var r = 1; r <= height; r++) {
		for(var c = 1; c <= width; c++) {
			rand = bot.random(2);
			if(rand == 1) {
				result += "\\";
			}
			else {
				result += "/";
			}
			if(c == width) {
				result += "\n";
			}
		}
	}
	result += "```";
	console.log(bot.colors.magenta(result));
	bot.sendMessages(cI, [result]);
}

// Outputs a random RPG item with random stats
function getRpgItem(cI) {
	var rpgObj = bot.rpg;
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
			randVal = bot.mapValue(bot.random(-15,20),-15,20,-75,100);
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
	console.log(sel);
	bot.sendMessages(cI,[(itemText+ formatText + statText)])
}

// Gets an 8 ball answer
function get8Ball(mesg, cI) {
	var responses = [
		"Yes", "No","Perhaps","Maybe",
		"All lines are busy. Please try again",
		"Odds are in your favor.", "The outlook does not look great",
		"Try again in an hour.", "Sorry I'm sleeping", "Out to Lunch",
		"Absolutely!", "Negative.", "Positive!", "Not even worth an answer.",
		"Of course.", "All signs point to yes."];
	var noQuestion = ["Did you have a question?", "I'm not psychic", "I can't read minds!",
		"Ask me *something*!", "Need something?","You really should ask me something.",
		"This silence is awkward to me","Help, I'm scared of mind reading!",
		"Uhh... Forget the question?","I may have forgotten the question",
		"Don't be a pie; ask something."];

	var response = "";
	var msg = "";
	//console.log("`mesg :" + mesg + ":`");
	if(mesg != undefined && mesg != null && mesg != "" && mesg.length > 3) {
		response = bot.random(responses.length);
		msg = responses[response];
	}
	else {
		response = bot.random(noQuestion.length);
		msg = noQuestion[response];
	}
	//console.log(msg);
	bot.sendMessages(cI, [msg]);
}
// Flips a coin
function coinFlip(m, cI) {
	var flips = m[0] || 1;
	var headCount = 0;
	var tailCount = 0;
	var headPercent = 0;
	var tailPercent = 0;
	if (flips > 750) {
		bot.sendMessages(cI, ["Coin flips set to 250."]);
		flips = 750;
	} else if (flips <= 0) {
		bot.sendMessages(cI, ["Coin flips set to one."]);
		flips = 1;
	}
	var flipText = "";
	var randInt = 0;
	var ifHeads;
	for (var i = 1; i <= flips; ++i) {
		ifHeads = bot.random(2) == 1;
		//randInt = Math.random() * 2;
		if (ifHeads) {
			flipText += "H ";
			headCount += 1;
		} else {
			flipText += "T ";
			tailCount += 1;
		}
	}
	headPercent = Math.round(headCount / flips * 100000) / 1000;
	tailPercent = Math.round(tailCount / flips * 100000) / 1000;
	bot.sendMessages(cI, ["```" + flipText + "\n\nHeads: " + headCount + " - " + headPercent + "%\nTails: " + tailCount + " - " + tailPercent + "%```\n"]);
}
// Rolls dice
function rollDice(m, cI) {
	var maxRolls = 300;
	var minRolls = 1;
	var maxSides = 100;
	var minSides = 4;
	var rolls = m[1] || minRolls;
	var sides = m[0] || minSides;
	rolls = rolls.toString().replace(/[^\d\w]/g,"");
	sides = sides.toString().replace(/[^\d\w]/g,"");
	if(isNaN(sides) && isNaN(rolls)) {
		bot.sendMessages(cI, ["Sides and rolls must be a number."]);
		return 0;
	} else if(isNaN(sides)) {
		bot.sendMessages(cI, ["Sides must be a number."]);
		return 0;
	} else if(isNaN(rolls)) {
		bot.sendMessages(cI, ["Rolls must be a number."]);
		return 0;
	}
	if (rolls > maxRolls) {
		bot.sendMessages(cI, ["Rolls set to " + maxRolls + "."]);
		rolls = maxRolls;
	} else if (rolls < minRolls) {
		bot.sendMessages(cI, ["Rolls set to " + minRolls + "."]);
		rolls = minRolls;
	}

	if(sides > maxSides) {
		sides = maxSides; // force the sides to be
		bot.sendMessages(cI, ["Sides set to " + maxSides + "."]);
	} else if(sides < minSides) {
		sides = minSides;
		bot.sendMessages(cI, ["Sides set to " + minSides + "."]);
	}
	var randInt = 0;
	var rollText = "";
	var rollArr = [];
	for (var r = 1; r <= rolls; ++r) {
		randInt = bot.random(sides) + 1;
		if(rollArr.hasOwnProperty(randInt.toString())) {
			rollArr[randInt]++;
		} else {
			rollArr[randInt] = 1;
		}
		rollText += (randInt + " ");
	}
	rollText += "\n\n";
	if(sides <= 10 && rolls >=5) {
		for (var r = 1; r <= sides; ++r) {
			if(rollArr[r] == null) {
				rollText += (r + ") 0 - 0%\n");
			} else {
				rollText += (r + ") " + rollArr[r] + " - " +(Math.round(rollArr[r]/rolls*10000)/100)+ "%\n");
			}
		}
	}
	bot.sendMessages(cI, ["```" + rollText + "```\n"]);
}
// Gives a random Integer
function randInteger(m, cI) {
	var rand = bot.random(1, 75);
	var int = "";
	console.log(rand);
	for (var i = 0; i < rand; i++) {
		int += bot.random(10).toString();
	}
	if(int[0] === "0" && rand >= 2) {
		console.log(int[0]);
		int = int.split('');
		int.shift();
		int = int.join("");
	}
	if (m[0] === "neg") {
		int = "-" + int;

	} else if (m[0] === "pos") {
		//do nothing
	} else {
		var randInt = 0;
		randInt = bot.random() < 0.5;
		if (randInt) {
			int = "-" + int;
		}
	}

	bot.sendMessages(cI, ["Your integer is: `" + int + "`"]);
}

function map(m, cI) {
	var v = Number(m[0]);
	var imn = Number(m[1]);
	var imx = Number(m[2]);
	var omn = Number(m[3]);
	var omx = Number(m[4]);
	var result = bot.mapValue(v, imn, imx, omn, omx);

	bot.sendMessages(cI, ["`"+result+"`"]);

}

bot.random = function() {
	var min, max, num = 0;
	if (arguments.length == 1) {
		// Between 0 and max
		max = arguments[0];
		min = 0;
	} else if (arguments.length == 2) {
		// between min and max
		min = arguments[0];
		max = arguments[1];
	} else {
		// a decimal between 0 and 1 by default
		return Math.random();
	}

	num = Math.floor(Math.random() * (max - min)) + min;
	return num;
}

bot.mapValue = function(x, inMin, inMax, outMin, outMax) {
	var outMin = Number(arguments[3]) || 0;
	var	outMax = Number(arguments[4]) || 1;

	var outRange = outMax-outMin;
	var inRange = inMax - inMin;
	console.log((x-inMin)*(outRange)/(inRange) + outMin);
	return ((x-inMin)*(outRange)/(inRange) + outMin);
}
// Draws cards
function drawCards(m, cI) {
	var draws = m[0] || 1;
	var duplicates = m[1] || "yes";
	var card = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
	var suit = ["♠", "♥", "♣", "♦"];
	var cardSelected = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	];

	var cardText = "";
	if (duplicates == "yes" && draws > 20) {
		bot.sendMessages(cI, ["Number of draws set to 20"]);
		draws = 20;
	} else if (duplicates == "no" && draws > 10) {
		bot.sendMessages(cI, ["Number of draws set to 10"]);
		draws = 10;
	}
	if (draws <= 0) {
		bot.sendMessages(cI, ["Number of draws set to 1"]);
		draws = 1;
	}
	if (duplicates == "yes") {
		for (var i = 1; i <= draws; ++i) {
			var s = bot.random(4);
			var c = bot.random(13);
			cardText += (card[c] + suit[s] + " ");
		}
	} else {
		var i = 0;
		while (i < draws) {
			var s = bot.random(4);
			var c = bot.random(13);
			if (cardSelected[s, c] != 1) {
				cardText += (card[c] + suit[s] + " ");
				cardSelected[s, c] = 1;
				i += 1;
			}
		}
	}
	bot.sendMessages(cI, ["Your cards are: " + cardText + "."]);
}
// ASCII impossible triangle
function doAdryd(cI) {
	var txt = "";
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
	bot.sendMessages(cI, ["```\n" + txt + "```"]);
}
// Hugs function
function sendHug(m, cI, uI) {
	var person = m[0] || uI;
	var hugs = ["c(^u^c)", "c(^.^c)", ">(^u^)<", "^w^", "c(^ε^c)", "(\\\\^u^(\\"];

	var int = bot.random(hugs.length);
	console.log(hugs.length);
	if (person == uI) {
		bot.sendMessages(cI, ["Sending <@" + uI + "> this hug: " + hugs[int]]);
	} else {
		bot.sendMessages(cI, ["Sending " + person + " this hug: " + hugs[int]]);
	}
}

function repeatMessage(m, cI, uI) {
	var msg = m || -1;
	if (uI != "205766554644643840") {
		if (msg == -1) {
			bot.sendMessages(cI, ["\u200B\u180EI have nothing to say to you."]);
		} else {
			bot.sendMessages(cI, ["\u200B\u180E" + msg]);
		}
	}
}

function checkReverse(m, cI) {
	var trig = m[0];
	switch (trig) {
		case '-a':
			m.shift();
			m = m.join(" ");
			m.split("");
			reverseText(m, cI, "");
			break;
		case '-w':
			m.shift();
			reverseText(m, cI, " ");
			break;
		default:
			bot.sendMessages(cI, ["You forgot to put how you want the reverse text to be done."]);
	}
}

function reverseText(msg, chI, joinChar) {
	var reverseString = new Array();
	for (i = 0; i < msg.length; ++i) {
		var c = msg.length - i;
		reverseString[c] = msg[i];
	}
	reverseString = reverseString.join(joinChar);
	bot.sendMessages(chI, ["\u200B\u180E" + reverseString])
}

function getInsult(uI, cI) {
	var i1, i2, i3;
	var insultString = "";
	var insult1 = insults.first;
	var insult2 = insults.second;
	var insult3 = insults.third;
	if (cI in bot.directMessages) {
		i1 = bot.random(insult1.length);
		i2 = bot.random(insult2.length);
		i3 = bot.random(insult3.length);
		insultString = insult1[i1] + " " + insult2[i2] + " " + insult3[i3];
		insultString = insultString.toLowerCase();
		bot.sendMessages(uI, ["Thou " + insultString + "."]);
	}
}

var commands = {
  checkCommands: checkCommands
}
module.exports = commands;
