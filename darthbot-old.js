/*Variable area*/
// Must be first because it is the settings for most of below
require("dotenv").config();
const DiscordBot = require('discord.js');
let colors = require('colors/safe');
let PNGImage = require('pngjs-image');
//var straw = require('strawpoll');
const reqFiles = {commands:"commands.js"}; // Names of variables

function requireFiles() {
	for (var name in reqFiles) {
		var fileName = reqFiles[name];
		global[name] = require("./" + fileName);
		console.log(colors.brightYellow(fileName) + colors.brightGreen(" loaded successfully"));
	}
}



const bot = new DiscordBot.Client();
// login to Discord with your app's token
bot.login(process.env.TOKEN);

process.DiscordBot = bot;
// Required files and modules
//var banned = require("./banned.json");
//console.log(colors.yellow("./banned.json") + colors.brightGreen(" loaded successfully"));
const fs = require('fs');
const url = require('url');
const request = require('request');
//Bot properties declared
try {
	requireFiles();
} catch (error) {
	console.log(colors.brightRed(`There has been an error of type ${error}`));
	console.error(error);
	return;
}
bot.colors = colors;
bot.PNGImage = PNGImage;
const trigger = process.env.TRIGGER;
const triggerLength = trigger.length;
bot.trigger = trigger;
bot.request = request;
bot.fs = fs;
bot.url = url;
let quitStatus = false;
bot.inStandby = false;
bot.quitStatus = quitStatus;

//Other vars
var logFileName = "";
const MAX_INTEGER = 2147483647; // Max possible Integer
const MIN_INTEGER = -2147483648; // Min possible Integer
const TAU = 2*Math.PI; // Makes using radians bearable
const PI = Math.PI; // Helps with some functions
const POS_PHI = (1+Math.sqrt(5.0))/2; //Golden Ratio
const NEG_PHI = (1-Math.sqrt(5.0))/2; // The complement of the Golden Ratio
const REC_POS_PHI = POS_PHI - 1; //Reciprocal of Golden Ratio
const REC_NEG_PHI = NEG_PHI - 1; //Reciprocal of the complement of the Golden Ratio
bot.TAU = TAU;
bot.PI = PI;
bot.POS_PHI = POS_PHI;
bot.NEG_PHI = NEG_PHI;
bot.REC_POS_PHI = REC_POS_PHI;
bot.REC_NEG_PHI = REC_NEG_PHI;

/*Event area*/

bot.once('ready', () => {
	bot.startDate = new Date();
	
	quitStatus = false;
	console.log(colors.brightCyan("Started: ") + colors.brightBlue(bot.startDate));
	console.log(colors.brightGreen("Connected!"));
	console.log(colors.brightCyan("Logged in as: ") + colors.brightWhite(bot.user.tag) + " - " + colors.brightMagenta(`@${bot.user.id}`));
	if(bot.inStandby) {
		admin.randomStatus("in dreams.");
	}
	else {
		admin.randomStatus("0");
	}
});

bot.on("message", message => {
	var serverName;
 	var serverID;
	var channelName;
	var channelID;
	//console.log(message);
	if(message.channel.type ==='text') {
		serverName = message.guild.name;
		serverID = message.guild.id;
		channelName = message.channel.name;
		channelID = message.channel.id
	} else {
		serverName = "Direct Messages";
		serverID = message.channel.id;
		channelName = message.author.username;
		channelID = message.author.id;
	}

	var userName = message.author.username;
	var userID = message.author.id;
	var logDate = new Date();
	var logHour = logDate.getHours();
	var logMin = logDate.getMinutes();
	var logSec = logDate.getSeconds();
	logHour = logHour < 10 ? "0"+logHour: logHour;
	logMin = logMin < 10 ? "0"+logMin: logMin;
	logSec = logSec < 10 ? "0"+logSec: logSec;
	var logTime = "[" + logHour + ":" + logMin + ":" + logSec + "] ";
	if(message.content.toLowerCase() == "d!admin -ese") { // Am I trying to enable a server to execute bot commands?
		if(banned.servers.indexOf(serverID) > -1) {
			var bannedID = banned.servers.indexOf(message.guild.id);
			console.log("serverID: "+serverID);
			console.log("banned.servers[bannedID]: "+banned.servers[bannedID]);
			console.log("bannedID: "+bannedID);
			bot.banned.servers.splice(bannedID, 1);
			bot.fs.writeFileSync('./banned.json', JSON.stringify(bot.banned, null, ' '));
		}
		return;
	}
	var command = message.content.split(" "); // Split the message on spaces into an array 
	var cmnd = command[0]; // Take the first element as the trigger and command
	var triggerCheck = cmnd.substring(0, triggerLength); // triggerCheck tests if the first x characters, based off triggerLength of the first element of the cmnd array is the trigger
	var mainCmnd = cmnd.substring(triggerLength, cmnd.length).toLowerCase(); // Makes the main command case-insensitive so HuG works exactly like Hug and hug
	command.shift(); // Removes the first element so all that is left are the subcommands if any or arguments
	if(message.content.endsWith("/s")) {
		commands.createSarcasmText(message.content.substring(0,message.content.length-2),message);
		try{
			message.delete();
		} catch (err) {
			// Just do nothing
		}
		return;
	}
	if (triggerCheck == trigger || message.author.id === bot.id) {
		if (banned.servers.indexOf(serverID) != -1) { //Check if the server is not on the banned list.
			console.log(colors.magenta("[WARNING] Server: " + serverName + " - " + serverID + " is banned"));
			return;
		} else if (banned.users.indexOf(message.author.id) != -1) { //check if user isn't banned from using the bot
			console.log(colors.magenta("[WARNING] User: " + userName + " - @" + userID + " is banned"));
			return;
		} else {
			// Log the command
			console.log(colors.brightYellow("Server ID: " + serverID));
			console.log(colors.brightYellow("Channel ID: " + channelID));
			console.log(colors.brightYellow("Message ID: " + message.id));
			console.log(colors.brightCyan(logTime + message.author.username + " - ID: ") + colors.brightYellow("@" + userID));
			console.log("in " + colors.magenta(serverName + " - #" + channelName));
			console.log(colors.white(message.content));

		}
		text = command.join(" ");
		if (triggerCheck == trigger) {
			if (bot.inStandby && mainCmnd === "admin" && message.author.id == process.env.OWNER_ID) {
				console.log("ADMIN CHECK"); //I sent an admin command while bot is sleeping
				console.log(text);
				var msg = text.split(" "); //Split the text since I need to check for the subcommand
				admin.adminCheck(msg, message); // This will check if it's a wake up command
			} else if (bot.inStandby) {
				//Bot in standby, didn't receive wake command from me
				console.log("Sleeping: " + bot.inStandby);
				message.channel.send("I am asleep.");
				return;
			} else { 
				//Bot is not in sleep mode. Anyone can send commands
				console.log(colors.brightCyan("Checking Commands")); //This was to make sure the bot got to this point
				commands.checkCommands(mainCmnd, text, message);
			}
		}
	}
});


bot.disconnect= function(message) {
	message.channel.send("Powering down for now!");
	bot.quitStatus = true;

	console.log(colors.yellow("Bot disconnected"));
	var dateEnded = new Date();
	var endText = "Disconnected on: " + dateEnded + "\r\n";
	endText += ("Uptime: " + Math.floor((dateEnded - bot.startDate) * 1000) + " s");
	console.log(colors.red(endText));
	try {
		bot.destroy();
	}
	catch (err) {

	}
}

bot.reload = function(message) {
	try {
		commands.reload(message);
		delete require.cache[require.resolve("./commands.js")];
		requireFiles();
		message.channel.send("\u200B\u180ESuccessfully reloaded");
		admin.randomStatus("0");
	} catch (e) {
		message.channel.send("\u200B\u180ECouldn't reload for some reason.");
		admin.randomStatus("a broken record");
	}
}
