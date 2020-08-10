/*Variable area*/
var config = require("./config.json"); // Must be first because it is the settings for most of below
//var utils = require("mc-utils");
//var concat = require("concat-stream");
const DiscordBot = require('discord.js');
var colors = require('colors/safe');
var PNGImage = require('pngjs-image');
//var straw = require('strawpoll');
const reqFiles = ["commands.js"];
const names = ["commands"]; // Names of variables



function requireFiles() {
	for (var name of names) {
		var fileIndex = names.indexOf(name);
		global[name] = require("./" + reqFiles[fileIndex]);
		console.log(colors.yellow(reqFiles[fileIndex]) + colors.cyan(" loaded successfully"));
	}
}

const bot = new DiscordBot.Client();

	// login to Discord with your app's token
	bot.login(config.token);


process.DiscordBot = bot;
// Required files and modules
//var banned = require("./banned.json");
//console.log(colors.yellow("./banned.json") + colors.cyan(" loaded successfully"));
const fs = require('fs');
const url = require('url');
const request = require('request');
//Bot properties declared
requireFiles();
bot.sendMessages = sendMessages;
bot.colors = colors;
bot.PNGImage = PNGImage;
var logText = "";
const trigger = config.trigger;
const triggerLength = trigger.length;
bot.trigger = trigger;
bot.request = request;
bot.fs = fs;
bot.url = url;
var quitStatus = false;
bot.inStandby = false;
bot.quitStatus = quitStatus;

//Other vars
var mIndex = 0;
var cIndex = 2;
var logFileName = "";
const MAX_INTEGER = 2147483647;
const MIN_INTEGER = -2147483648;
const TAU = 2*Math.PI;
const PI = Math.PI;
const POS_PHI = (1+Math.sqrt(5.0))/2;
const NEG_PHI = (1-Math.sqrt(5.0))/2;
const REC_POS_PHI = POS_PHI - 1;
const REC_NEG_PHI = NEG_PHI - 1;
bot.TAU = TAU;
bot.PI = PI;
bot.POS_PHI = POS_PHI;
bot.NEG_PHI = NEG_PHI;
bot.REC_POS_PHI = REC_POS_PHI;
bot.REC_NEG_PHI = REC_NEG_PHI;
/*Event area*/

bot.once('ready', () => {
	bot.startDate = new Date();
	var year = bot.startDate.getFullYear();
	var month = bot.startDate.getMonth() + 1;
	var day = bot.startDate.getDate();
	if (month < 10) {
		month = "0" + month;
	}
	if (day < 10) {
		day = "0" + day;
	}
	logFileName = ("logs/" + year + "-" + month + "-" + day + ".txt");

	quitStatus = false;
	console.log(colors.cyan("File Name: " + logFileName));
	logText += "File Name: " + logFileName + "\r\n";
	console.log(colors.cyan("Started: " + bot.startDate));
	logText += "Started: " + bot.startDate + "\r\n";
	console.log(colors.gray("Connected!"));
	logText += "Connected!\r\n";
	console.log(colors.cyan("Logged in as: " + bot.user.tag + " - (" + bot.user.id + ")"));
	logText += "Logged in as: " + bot.user.tag + " - (" + bot.user.id + ")" + "\r\n";
	if(bot.inStandby) {
		admin.randomStatus("in dreams.");
	}
	else {
		admin.randomStatus("0");
	}
	fs.appendFile(logFileName, logText, (err) => {
		if (err) throw err;
		console.log(colors.gray("Data added."));
	});
});

 bot.on("message",
 message => {
	var serverName;
 	var serverID;
	var channelName;
	var channelID;
	//console.log(message);
	var serverName, channelName;
	if(message.channel.type ==='text') {
		serverName = message.guild.name;
		serverID = message.guild.id;
		channelName = message.channel.name;
		channelId = message.channel.id
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
	bot.send = message.channel.send;
	if (logHour <= 9) {
		logHour = "0" + logHour;
	}
	var logMin = logDate.getMinutes();
	if (logMin <= 9) {
		logMin = "0" + logMin;
	}
	var logSec = logDate.getSeconds();
	if (logSec <= 9) {
		logSec = "0" + logSec;
	}
	var logTime = "[" + logHour + ":" + logMin + ":" + logSec + "] ";
	if(message.content.toLowerCase() == ">>>admin -ese") {
		if(banned.servers.indexOf(serverID) > -1) {
			var bannedID = banned.servers.indexOf(message.guild.id);
			console.log("serverID: "+serverID);
			console.log("banned.servers[bannedID]: "+banned.servers[bannedID]);
			console.log("bannedID: "+bannedID);
			var m = [banned.servers[bannedID]];
			bot.banned.servers.splice(bannedID, 1);
			bot.fs.writeFileSync('./banned.json', JSON.stringify(bot.banned, null, ' '));
		}
	}
	var command = message.content.split(" ");
	var cmnd = command[0];
	var triggerCheck = cmnd.substring(0, triggerLength);
	var mainCmnd = cmnd.substring(triggerLength, cmnd.length).toLowerCase();
	command.shift();

	//var msgID = rawEvent.d.id; //For future reference?

	logText = logTime + message.author.username + "(" + message.author.id + ") in server \'" + serverName + "\' in channel \'" + channelName + "\':\r\n---" + message.content + "\r\n";
	logText += "============================================================================\r\n";
	if (triggerCheck == trigger || message.author.id === bot.id) {
		if (banned.servers.indexOf(serverID) != -1) {
			console.log(colors.magenta("[WARNING] Server: " + serverName + " - " + serverID + " is banned"));
			return;
		} else if (banned.users.indexOf(message.author.id) != -1) {
			console.log(colors.magenta("[WARNING] User: " + userName + " - @" + userID + " is banned"));
			return;
		} else {
			// Do the command
			console.log(colors.yellow("Server ID: " + serverID));
			console.log(colors.yellow("Channel ID: " + channelID));
			console.log(colors.blue("Message ID: " + message.id));
			console.log(colors.cyan(logTime + message.author.username + " - ID: ") + colors.yellow("@" + userID));
			console.log("in " + colors.magenta(serverName + " - #" + channelName));
			//console.log(message);
			//console.log(colors.white(bot.fixMessage(message)));
			console.log("----------");

		}
		text = command.join(" ");
		if (triggerCheck == trigger) {
			if (bot.inStandby && mainCmnd === "admin" && message.author.id == config.ownerID) {
				console.log("ADMIN CHECK"); //I sent a wake command while bot is sleeping
				console.log(text);
				var msg = text.split(" ");
				admin.adminCheck(msg, message);
			} else if (bot.inStandby) {
				//Bot in standby, didn't receive wake command from me
				console.log("Sleeping: " + bot.inStandby);
				message.channel.send("I am asleep.");
				return;
			} else { //Bot is not in sleep mode. Anyone can send commands
				console.log(colors.cyan("Checking Commands"));
				commands.checkCommands(mainCmnd, text, message);
			}
		}

		fs.appendFile(logFileName, logText, (err) => { //Log command sent along with user and server
			if (err) throw err;
			console.log(colors.gray("Data added."));
		});
	}
	//console.log("Bot sleeping (last check) = " + bot.inStandby);
});

bot.on("presence", function(user, userID, status, gameName, rawEvent) {
	/*console.log(user + " is now: " + status);*/
});

bot.on("debug", function(rawEvent) {
	/*console.log(rawEvent)*/ //Logs every event
});

// bot.on("disconnect", () => {
//
// });

/*Function declaration area*/
function sendMessages(ID, messageArr, interval) {
	var callback, resArr = [],
		len = messageArr.length;
	typeof(arguments[2]) === 'function' ? callback = arguments[2]: callback = arguments[3];
	if (typeof(interval) !== 'number') interval = 1000;

	function _sendMessages() {
		setTimeout(function() {
			if (messageArr[0]) {
				bot.sendMessage({
					to: ID,
					typing: false,
					message: messageArr.shift()
				}, function(err, res) {
					if (err) {
						resArr.push(err);
					} else {
						resArr.push(res);
					}
					if (resArr.length === len)
						if (typeof(callback) === 'function') callback(resArr);
				});
				_sendMessages();
			}
		}, interval);
	}
	_sendMessages();
}

function sendFiles(ID, fileArr, interval) {
	var callback, resArr = [],
		len = fileArr.length;
	typeof(arguments[2]) === 'function' ? callback = arguments[2]: callback = arguments[3];
	if (typeof(interval) !== 'number') interval = 1000;

	function _sendFiles() {
		setTimeout(function() {
			if (fileArr[0]) {
				bot.uploadFile({
					to: ID,
					typing: false,
					file: fileArr.shift()
				}, function(err, res) {
					if (err) {
						resArr.push(err);
					} else {
						resArr.push(res);
					}
					if (resArr.length === len)
						if (typeof(callback) === 'function') callback(resArr);
				});
				_sendFiles();
			}
		}, interval);
	}
	_sendFiles();
}

bot.disconnect= function(message) {
	message.channel.send("Powering down for now!");
	bot.quitStatus = true;

	console.log(colors.yellow("Bot disconnected"));
	var dateEnded = new Date();
	var endText = "Disconnected on: " + dateEnded + "\r\n";
	endText += ("Uptime: " + Math.floor((dateEnded - bot.startDate) * 1000) + " s");
	console.log(colors.red(endText));
	fs.appendFile(logFileName, endText + "\r\n", (err) => {
		if (err) throw err;
		console.log(colors.gray("Data added."));
	});
	try {
		bot.destroy();
	}
	catch (err) {

	}
}

bot.reload = function(message) {
	array = {};
	try {
		for (var file of reqFiles) {
			delete require.cache[require.resolve("./" + file)];
		}
		requireFiles();
		array = Object.assign({}, commands);
		message.channel.send("\u200B\u180ESuccessfully reloaded");
		admin.randomStatus("0");
	} catch (e) {
		message.channel.send("\u200B\u180ECouldn't reload for some reason.");
		admin.randomStatus("a broken record");
	}
}
