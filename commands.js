var bot = process.DiscordBot;
var colors = require('colors/safe');
var Twitter = require("twitter");
//var utils = require("mc-utils");
//var concat = require("concat-stream");
var PNGImage = require('pngjs-image');
var gameList = require("./statusList.json");

// const reqFiles = ["npc.js","config.json","admin.js", "banned.json", "calc.js",
// 	"color.js", "help.js", "info.js", "insults.json", "series.js", "poll.js","rpg.json",
// "cipher.js","github.js","tarot.js","matrix.js"];
const reqFiles = {
	npc:"npc.js",
	config: "config.json",
	admin: "admin.js",
	banned: "banned.json",
	calc: "calc.js",
	color: "color.js",
	help: "help.js",
	info: "info.js",
	insults:"insults.json",
	series:"series.js",
	polls:"poll.js",
	rpg: "rpg.json",
	cipher: "cipher.js",
	gitH: "github.js",
	tarot: "tarot.js",
	matrix: "matrix.js"
}; // Names of variables

function requireFiles() {
	for (var name in reqFiles) {
		var fileName = reqFiles[name];
		global[name] = require("./" + fileName);
		console.log(colors.yellow(fileName) + colors.cyan(" loaded successfully"));
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
bot.polls = polls;
bot.npc = npc;
bot.rpg = rpg;
bot.darth = darth;
bot.server = server;
bot.formu = formu;
bot.ownerID = config.ownerID
function checkCommands(c, text, message) {
	var msg = text.split(' '); //Split the string on spaces
	switch (c) { //Command switcher
		case 'ping':
			message.channel.send("Pong");
			break;
		case 'calc':
			calc.calcCheck(msg, message);
			break;
		case 'admin':
			if (message.author.id == bot.ownerID) {
				admin.adminCheck(msg, message);
			} else {
				message.channel.send("<@" + message.author.id + "> *: You lack permission*")
			}
			break;
		case 'help':
			help.checkHelp(msg, message);
			break;
		case 'info':
			info.infoCheck(msg, message);
			break;
		case 'poll':
		case 'polls':
			polls.pollCheck(msg, message);
			break;
		// case 'mc':
		// case 'minecraft':
		// 	mc.minecraftCheck(msg, message);
		// 	break;
		case 'series':
			series.seriesCheck(msg, message);
			break;
		case 'butts':
			message.channel.send("<@"+message.author + ">: *You must like big butts then. Don't lie!*");
			break;
		case 'roll':
		case 'dice':
			rollDice(msg, message);
			break;
		case 'coin':
		case 'toss':
			coinFlip(msg, message);
			break;
		case 'integer':
		case 'int':
			randInteger(msg, message);
			break;
		case 'seq':
			//coinFlip(msg, chID);
			break;
		case 'game':
		case 'status':
			gameCheck(msg, message);
			break;
		case 'cards':
		case 'card':
		case 'draw':
			drawCards(msg, message);
			break;
		case 'cipher':
		case 'code':
			cipher.cipherCheck(msg, message);
			break;
		case 'adryd':
		case 'triangle':
			doAdryd(message);
			break;
		case 'hugs':
		case 'hug':
			sendHug(msg, message);
			break;
		case 'say':
		case 'echo':
		case 'repeat':
			msg = msg.join(" "); //Join with a space
			if(message.author.id === config.ownerID){
				repeatMessage(msg, message);
				try{
					message.delete();
				} catch (err) {
					// Just do nothing
				}
			}
			break;
		case 'reverse':
		case 'backwards':
			checkReverse(msg, message);
			break;
		case 'pet':
		case 'pat':
		case 'kiss':
		case 'cuddle':
		case 'snuggle':
			emoteBot(`Gives a ${c}`, msg, message);
			break;
		case 'cookie':
			emoteBot(`Gives a :${c}:`, msg, message);
			break;
		case 'pets':
		case 'pats':
		case 'kisses':
		case 'cuddles':
		case 'snuggles':
			emoteBot(`Gives ${c}`, msg, message);
			break;
		case 'cookies':
			emoteBot(`Gives :cookie:s`, msg, message);
			break;
		case 'insult':
			getInsult(message);
			break;
		case 'color':
			color.colorCheck(msg, message);
			break;
		case 'latex':
		case 'tex':
			calc.getLaTeX(msg, message);
			break;
		case '8-ball':
		case '8ball':
		case 'magic-conch':
			msg = msg.join(' ');
			get8Ball(msg, message);
			break;
		case 'map':
		case 'normalize':
			map(msg, message);
			break;
		case 'matrix':
			matrix.matrixCheck(msg,message);
			break;
		case "rpg":
			getRpgItem(message);
			break;
		case "10print":
		case "10-print":
			do10Print(msg, message);
			break;
		case "npc":
			npc.npcCheck(message);
			break;
		case 'tarot':
			tarot.tarotCheck(msg, message);
			break;
		// case "gh":
		// case "git":
		// case "github":
		// 	if(message.author.id == bot.ownerID) {
		// 		gitHubCheck(msg, message);
		// 	}
		// 	break;
		default: //Default to this if can't find a command
			message.channel.send(selectRandonCmdErr());
			break;
	}
}

function emoteBot(act, m, message) {
	if(m[0] === undefined || m[0] === '' || m[0]===null) {
		act = act.split(' ');
		console.log(act);
		var emote = act[act.length-1];
		message.channel.send(`Aww. Thank you for the ${emote}`)
	} else {
		message.channel.send(`${act} to ${m[0]}`);
	}

}

function gameCheck(m, message) {
	var gameType = "";
	console.log(m);
	if(m[0] == "add") {
		m.shift();
		gameType = m[0].toUpperCase();
		if(gameType === "" || gameType === undefined) {
			message.channel.send("I can't use an empty status");
		} else {
			m.shift();
			m = m.join(" ");
			gameList[gameType].push(m);
			bot.user.setActivity(m, {type: gameType});
			if(!gameList[gameType].hasOwnProperty(m)) {
				bot.fs.writeFileSync('./statusList.json', JSON.stringify(gameList, null, ' '));
			}
		}
	} else {
		gameType = m[0].toUpperCase();
		console.log(m[0]);
		if(gameType === "" || gameType === undefined) {
			admin.randomStatus("0");
		}
		else {
			m.shift()
			m = m.join(" ");
			bot.user.setActivity(m, {type: gameType});
		}
	}
}

function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function selectRandonCmdErr() {
	var randomResp = ["I'm sorry, I'm having trouble understanding what you want.",
	"Please give me something to do.",
	"I'm so bored. I need something to do",
	"Help my boredom. Tell me what to do.",
	"How bout you don't screw up and tell me what to do?",
	"You know I can't understand this.",
	"Why do you torture me with unintelligble blathering?"
  ];
	return randomResp[bot.random(randomResp.length)];
}

function do10Print(m, message) {
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
	message.channel.send(result);
}

// Outputs a random RPG item with random stats
function getRpgItem(message) {
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

// Gets an 8 ball answer
function get8Ball(text, message) {
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
	if(text != undefined && text != null && text != "" && text.length > 3) {
		response = bot.random(responses.length);
		msg = responses[response];
	}
	else {
		response = bot.random(noQuestion.length);
		msg = noQuestion[response];
	}
	message.channel.send(msg);
}
// Flips a coin
function coinFlip(m, message) {
	var flips;
	if (isNaN(m[0]) || m[0] == undefined) {
		flips = 1;
	}
	else {
		flips = m[0];
		m.shift();
	}
	if(m.length > 1) {
		m = m.join(" ");
	} else {
		m = m[0];
	}
	var headOpt = "";
	var tailOpt = "";
	var tossOptions = "";
	try {
		tossOptions = m.split('|');
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
	var optResult = "";
	if (flips > maxFlips) {
		message.channel.send("Coin flips set to "+maxFlips+".");
		flips = maxFlips;
	} else if (flips <= 0) {
		message.channel.send("Coin flips set to one.");
		flips = minFlips;
	}
	var flipText = "```\n";
	var randInt = 0;
	var ifHeads;
	for (var i = 1; i <= flips; ++i) {
		ifHeads = bot.random(2) == 1;
		//randInt = Math.random() * 2;
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
// Rolls dice
function rollDice(m, message) {
	var maxRolls = 300;
	var minRolls = 1;
	var maxSides = 100;
	var minSides = 4;
	var rolls = m[1] || minRolls;
	var sides = m[0] || minSides;
	rolls = rolls.toString().replace(/[^\d\w]/g,"");
	sides = sides.toString().replace(/[^\d\w]/g,"");
	if(isNaN(sides) && isNaN(rolls)) {
		message.reply("Sides and rolls must be a number.");
		return 0;
	} else if(isNaN(sides)) {
		message.reply("Sides must be a number.");
		return 0;
	} else if(isNaN(rolls)) {
		message.reply("Rolls must be a number.");
		return 0;
	}
	if (rolls > maxRolls) {
		message.channel.send("Rolls set to " + maxRolls + ".");
		rolls = maxRolls;
	} else if (rolls < minRolls) {
		message.channel.send("Rolls set to " + minRolls + ".");
		rolls = minRolls;
	}

	if(sides > maxSides) {
		sides = maxSides; // force the sides to be
		message.channel.send("Sides set to " + maxSides + ".");
	} else if(sides < minSides) {
		sides = minSides;
		message.channel.send("Sides set to " + minSides + ".");
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
			rollText += r<10?' ':'';
			if(rollArr[r] == null) {
				rollText += (r + ")  0 - 0%\n");
			} else {
				rollText += (r + ")  " + rollArr[r] + " - " +(Math.round(rollArr[r]/rolls*10000)/100)+ "%\n");
			}
		}
	}
	message.channel.send("```" + rollText.padStart(2) + "```\n");
}
// Gives a random Integer
function randInteger(m, message) {
	var randLength = bot.random(1, 75);
	var int = "";
	console.log(randLength);
	for (var i = 0; i < randLength; i++) {
		int += bot.random(10).toString();
	}
	if(int[0] === "0" && randLength >= 2) {
		console.log(int[0]);
		int = int.slice(1);
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

	message.channel.send("Your integer is: `" + int + "`");
}

function map(m, message) {
	var v = Number(m[0]);
	var imn = Number(m[1]);
	var imx = Number(m[2]);
	var omn = Number(m[3]) || 0;
	var omx = Number(m[4]) || 1;
	var result = bot.mapValue(v, imn, imx, omn, omx);

	message.channel.send("`"+result+"`");

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
function drawCards(m, message) {
	var draws = m[0] || 1;
	const maxDraws = 5;
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
				i++;
			}
		}
	}
	message.channel.send("Your cards are: `" + cardText + "`");
}
// ASCII impossible triangle
function doAdryd(message) {
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
	message.channel.send("```\n" + txt + "```");
}
// Hugs function
function sendHug(m, message) {
	var person = m[0];
	var targetID;
	console.log("person: "+person);
	try {
		targetID = person.match(/\d/g).join('');
	} catch (err) {
		targetID = message.author.id;
	}
	console.log("targetID: "+targetID);
	var hugs = ["c(^u^c)", "c(^.^c)", ">(^u^)<", "^w^", "c(^ε^c)", "(\\\\^u^(\\"];
	var int = bot.random(hugs.length);
	if (!(targetID == null || targetID =='')) {
		message.channel.send("Sending <@" + targetID + "> this hug: " + hugs[int]);
	} else {
		message.channel.send("Sending everyone this hug: " + hugs[int]);
	}
}

function repeatMessage(m, message) {
	var msg = m || -1;
	if (!message.author.bot) {
		if (msg == -1) {
			message.channel.send("\u200B\u180EI have nothing to say to you.");
		} else {
			message.channel.send("\u200B\u180E" +msg);
		}
	}
}

function checkReverse(m, message) {
	var trig = m[0];
	switch (trig) {
		case '-a':
			m.shift();
			m = m.join(" ");
			m.split("");
			reverseText(m, message, '');
			break;
		case '-w':
			m.shift();
			reverseText(m, message, ' ');
			break;
		default:
			message.channel.send("You forgot to put how you want the reverse text to be done.");
	}
}

function reverseText(msg, message, joinChar) {
	var reverseString = new Array();
	for (i = 0; i < msg.length; ++i) {
		var c = msg.length - i;
		reverseString[c] = msg[i];
	}
	reverseString = reverseString.join(joinChar);
	message.channel.send("\u200B\u180E" + reverseString);
}

function getInsult(message) {
	var i1, i2, i3;
	var insultString = "";
	var insult1 = insults.first;
	var insult2 = insults.second;
	var insult3 = insults.third;
	if (message.channel.type ==='dm') {
		i1 = bot.random(insult1.length);
		i2 = bot.random(insult2.length);
		i3 = bot.random(insult3.length);
		insultString = insult1[i1] + " " + insult2[i2] + " " + insult3[i3];
		insultString = insultString.toLowerCase();
		message.channel.send("Thou art a " + insultString + ".");
	}
}

var commands = {
  checkCommands: checkCommands
}
module.exports = commands;
