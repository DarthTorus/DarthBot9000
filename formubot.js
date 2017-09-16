/*Variable area*/
var utils = require("mc-utils");
//var concat = require("concat-stream");
var Discordbot = require('discord.io');
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

var config = require("./config.json"); // Must be first because it is the settings for most of below

var bot = new Discordbot.Client({
	token: config.token,
	autorun: true
});
process.DiscordBot = bot;
// Required files and modules
var banned = require("./banned.json");
const fs = require('fs');
const url = require('url');
const request = require('request');
//Bot properties declared
requireFiles();
bot.sendMessages = sendMessages;
bot.colors = colors;
bot.PNGImage = PNGImage;
var logText = "";
const trigger = ">>>";
const triggerLength = 3;
bot.trigger = trigger;
bot.request = request;
bot.utils = utils;
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

bot.on("ready", function(rawEvent) {
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
	console.log(colors.cyan("Logged in as: " + bot.username + " - (" + bot.id + ")"));
	logText += "Logged in as: " + bot.username + " - (" + bot.id + ")" + "\r\n";
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

bot.on("message", function(user, userID, channelID, message, rawEvent) {
	var serverName = "";
	var serverID = 0;
	if (!(channelID in bot.directMessages)) {
		serverID = bot.channels[channelID].guild_id;
	}

	var channelName = "";
	var logDate = new Date();
	var logHour = logDate.getHours();
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
	if(message.toLowerCase() == ">>>admin -ese") {
		if(banned.servers.indexOf(serverID) > -1) {
			var bannedID = banned.servers.indexOf(serverID);
			console.log("serverID: "+serverID);
			console.log("banned.servers[bannedID]: "+banned.servers[bannedID]);
			console.log("bannedID: "+bannedID);
			var m = [banned.servers[bannedID]];
			bot.banned.servers.splice(bannedID, 1);
			bot.fs.writeFileSync('./banned.json', JSON.stringify(bot.banned, null, ' '));
		}
	}
	var command = message.split(" ");
	var cmnd = command[0];
	var triggerCheck = cmnd.substring(0, triggerLength);
	var mainCmnd = cmnd.substring(triggerLength, cmnd.length).toLowerCase();
	command.shift();

	var msgID = rawEvent.d.id; //For future reference?
	var serverName, channelName;
	if (!(channelID in bot.directMessages)) {
		for (var i in bot.servers) {
			if (i == bot.channels[channelID].guild_id) {
				serverName = bot.servers[i].name;
				channelName = bot.servers[i].channels[channelID].name
			}
		}
	} else {
		serverName = "Direct Message";
		channelName = user;
	}
	logText = logTime + user + "(" + userID + ") in server \'" + serverName + "\' in channel \'" + channelName + "\':\r\n---" + message + "\r\n";
	logText += "============================================================================\r\n";
	if (triggerCheck == trigger || userID === bot.id) {
		if (banned.servers.indexOf(serverID) != -1) {
			console.log(colors.magenta("[WARNING] Server: " + serverName + " - " + serverID + " is banned"));
			return;
		} else if (banned.users.indexOf(userID) != -1) {
			console.log(colors.magenta("[WARNING] User: " + user + " - @" + userID + " is banned"));
			return;
		} else {
			// Do the command
			console.log(colors.yellow("Server ID: " + serverID));
			console.log(colors.yellow("Channel ID: " + channelID));
			console.log(colors.blue("Message ID: " + msgID));
			console.log(colors.cyan(logTime + user + " - ID: ") + colors.yellow("@" + userID));
			console.log("in " + colors.magenta(serverName + " - #" + channelName));
			//console.log(message);
			console.log(colors.white(bot.fixMessage(message)));
			console.log("----------");

		}
		message = command.join(" ");
		if (triggerCheck == trigger) {
			if (bot.inStandby && mainCmnd === "admin" && userID == "133370041142870016") {
				console.log("ADMIN CHECK"); //I sent a wake command while bot is sleeping
				console.log(message);
				var msg = message.split(" ");
				admin.adminCheck(msg, channelID);
			} else if (bot.inStandby) {
				//Bot in standby, didn't receive wake command from me
				console.log("Sleeping: " + bot.inStandby);
				return;
			} else { //Bot is not in sleep mode. Anyone can send commands
				console.log(colors.cyan("Checking Commands"));
				console.log(colors.white(message));
				commands.checkCommands(mainCmnd, message, userID, channelID);
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

bot.on("disconnect", function(errMsg, code) {
	console.log(colors.yellow("Bot disconnected"));
	var dateEnded = new Date();
	var endText = "Disconnected on: " + dateEnded + " because of: " + errMsg + " with code " + code + "\r\n";
	endText += ("Uptime: " + Math.floor((dateEnded - bot.startDate) * 1000) + " s");
	console.log(colors.red(endText));
	fs.appendFile(logFileName, endText + "\r\n", (err) => {
		if (err) throw err;
		console.log(colors.gray("Data added."));
	});
	if (!bot.quitStatus) {
		setTimeout(function() {
			bot.connect();
		}, 60000); //Auto reconnect
	}
});

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

bot.reload = function(cI) {
	array = {};
	try {
		for (var file of reqFiles) {
			delete require.cache[require.resolve("./" + file)];

		}
		requireFiles();
		array = Object.assign({}, commands);
		bot.sendMessages(cI, ["\u200B\u180ESuccessfully reloaded"]);
		admin.randomStatus("0");
	} catch (e) {
		bot.sendMessages(cI, ["\u200B\u180ECouldn't reload for some reason."]);
		admin.randomStatus("a broken record");
	}
}
