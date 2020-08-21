var bot = process.DiscordBot;
var config = require("./config.json");
function infoCheck(m, message) {
	switch (m[0]) {
		// case "twitter":
		// 	m.shift();
		// 	twitter(m, cI);
		// 	break;
		case "add":
			addBotToServer(message);
			break;
		// case "ip":
		// 	bot.sendMessages(cI, ["IP: `" + config.ip + "`"]);
		// 	break;
		case "uptime":
			calcUptime(message);
			break;
		case "credits":
			sendCredits(message);
			break;
		case "qrcode":
			message.channel.send(config.qrcode);
			break;
		case "bot":
			sendBotInfo(message);
			break;
		default:
	}
}

function sendCredits(message) {
	let messageText = "**Credit To:**\n";
	messageText += "Adyrd - *Bot Logo*\n";
	messageText += "AstroSnail - *Help with help files*\n";
	messageText += "Pridark - *Main Server Icon*"
	message.channel.send(messageText);
}

// function twitter(t, cI) {
// 	switch (t) {
// 		case "owner":
// 			bot.sendMessages(cI, ["Owner: " + config.twitter.l.o]);
// 			break;
// 		case "server":
// 			bot.sendMessages(cI, ["Server: " + config.twitter.l.s]);
// 			break;
// 		default:
// 			break;
// 	}
// }

function calcUptime(message) {
	var time = 0;
	var days = 0;
	var hrs = 0;
	var min = 0;
	var sec = 0;
	var date = Date.now();
	var temp = Math.floor((date - bot.startDate) / 1000);
	sec = temp % 60;
	temp = Math.floor(temp / 60);
	min = temp % 60;
	temp = Math.floor(temp / 60);
	hrs = temp % 24;
	temp = Math.floor(temp / 24);
	days = temp;
	var dayText = " days, ";
	var hrText = " hours, ";
	var minText = " minutes, ";
	var secText = " seconds.";
	if (days == 1) {
		dayText = " day, ";
	}
	if (hrs == 1) {
		hrText = " hour, ";
	}
	if (min == 1) {
		minText = " minute, ";
	}
	if (sec == 1) {
		secText = " second.";
	}

	message.channel.send("I have been running for: ```xl\n" + days + dayText +
		hrs + hrText + min + minText + sec + secText + "```");
}

function sendBotInfo(message) {
	calcUptime(message);
	var numServers = Object.keys(bot.servers).length;
	var m = "Owner: Darth Torus\n";
	m += "Library: Discord.js\n";
	m += "Language: NodeJS/Javascript\n";
	m += "Servers: " + numServers;
	message.channel.send("```xl\n" + m + "```")
}

function addBotToServer(message) {
	try {
		message.author.send("Invite link: " + config.addLink);
		message.channel.send("I have sent an invite link with the swiftest digital falcon bits could create to your DMs!");
	}
	catch (err) {
		message.channel.send("I couldn't send you a link to add me to your wonderful server!");
	}
}

var infoFunctions = {
	infoCheck: infoCheck
};

module.exports = infoFunctions;
