var bot = process.DiscordBot;

function adminCheck(m, cI) {
	console.log(m[0]);
	switch (m[0]) {
		case '-w':
			wake(cI);
			break;
		case '-s':
			sleep(cI);
			console.log("received sleep");
			break;
		case '-q':
			quit(cI);
			break;
		case '-t':
			tweetCheck(m, cI);
			break;
		case '-skt':
			sendKayTweets(cI);
			break;
		case '-ct':
			checkNumTweets(cI);
			break;
		case '-sdm':
			sendDM(m, cI);
			break;
		case '-cdm':
			checkDMS(m, cI);
			break;
		case '-r':
			bot.reload(cI);
			break;
		case '-ar':
			m.shift();
			addRole(m, cI);
			break;
		case '-er':
			m.shift();
			changeRole(m, cI);
			break;
		case '-dr':
			m.shift();
			removeRole(m, cI);
			break;
		case '-au':
			m.shift();
			addUserToRole(m, cI);
			break;
		case '-ru':
			m.shift();
			removeUserFromRole(m, cI);
			break;
		case '-ku':
			m.shift();
			kickUser(m, cI);
			break;
		case '-bu':
			m.shift();
			banUser(m, cI);
			break;
		case '-pue':
			m.shift();
			prohibitUserExecution(m, cI);
			break;
		case '-pse':
			m.shift();
			prohibitServerExecution(m, cI);
			break;
		case '-eue':
			m.shift();
			enableUserExecution(m, cI);
			break;
		case '-ese':
			m.shift();
			enableServerExecution(m, cI);
			break;
		case '-ubu':
			m.shift();
			unbanUser(m, cI);
			break;
		case '-mu':
			m.shift();
			muteUser(m, cI);
			break;
		case '-umu':
			m.shift();
			unmuteUser(m, cI);
			break;
		case '-du':
			m.shift();
			deafenUser(m, cI);
			break;
		case '-udu':
			m.shift();
			undeafenUser(m, cI);
			break;
		case '-su':
			m.shift();
			silenceUser(m, cI);
			break;
		case '-usu':
			m.shift();
			unsilenceUser(m, cI);
			break;
		case '-eun':
			m.shift();
			editUserNick(m, cI);
			break;
		case 'ping':
			m.shift();
			pingServer(m, cI);
			break;
		default:
			break;
	}
}

function sleep(cID) {
	bot.inStandby = true;
	//console.log("Bot sleeping (first check) = " + bot.inStandby);
	randomStatus("in dreams");
}

function wake(cID) {
	bot.inStandby = false;
	console.log("Bot sleeping =" + bot.inStandby);
	randomStatus();
}

function quit(cID) {
	setTimeout(function() {
		bot.quitStatus = true;
		bot.disconnect();
	}, 1000);
}

function randomStatus(msg) {
	var gameString = msg || "0";
	var randStat = [
		"for world domination",
		"with your souls",
		"in Narnia",
		"with butts",
		"with ideas",
		"with space-time",
		"in Westeros",
		"chess",
		"the song of my people",
		"Mozart",
		"with fire",
		"with brains",
		"with bots",
		"with matches",
		"with friends",
		"Rocket League",
		"Skyrim",
		"on an ancient burial ground",
		"poker",
		"with binary",
		"the macarena",
		"a song of Ice and Fire",
		"Baby Seal Clubbing Sim",
		"with lava",
		"on your graves",
		"with Uncle Bob",
		"with Twitter API",
		"with Discord API",
		"in LA-LA land",
		"with nuclear materials",
		"w/ nuclear fallout",
		"with Deathnotes",
		"with integrals",
		"with derivatives",
		"with infinite series",
		"musical scales"
	];
	if (gameString === "0") {
		var status = Math.floor(Math.random() * randStat.length);
		bot.setPresence({
			game: {
				name: randStat[status]
			}
		});
	} else {
		bot.setPresence({
			game: {
				name: gameString
			}
		});
	}
}

function tweetCheck(msg, cID) {
	msg.shift();
	switch (msg[0]) {
		case '-s':
			sendServerTweet(msg, cID);
			break;
		case '-o':
			sendOwnerTweet(msg, cID);
			break;
			// case '-b':
			//     sendBotTweet(msg, cID);
			//     break;
	}
}

function checkNumTweets(cID) {
	var tweetCount;
	bot.darth.get('users/show', {
			screen_name: "Darth_Torus"
		},
		function(err, user, response) {
			tweetCount = user.statuses_count.toString();
			console.log(tweetCount);
			tweetCount = tweetCount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			bot.sendMessages("133370041142870016", ["You have " + tweetCount + " tweets!"]);
		});


}

function sendDM(m, cID) {
	m.shift();
	recipient = m[0];
	m.shift(); // remove the recipient
	msg = m.join(' ');
	if (cID in bot.directMessages) {
		bot.darth.post('direct_messages/new', {
			screen_name: recipient,
			text: msg
		}, function(err, data, response) {
			if (err) {
				console.log("screen_name: " + recipient);
				console.log("text: " + msg);
				console.log(err.code);
				bot.sendMessages(cID, ["Message couldn't be sent!"]);
			} else {
				bot.sendMessages(cID, ["Message sent!"]);
			}

		});
	}
}

function checkDMS(m, cID) {
	m.shift();
	if (cID in bot.directMessages) {
		bot.darth.get("direct_messages", {
			count: m[0] || 10
		}, function(err, messages, response) {
			if (err) {
				console.log(err);
				bot.sendMessages(cID, ["Couldn't retrieve messages!"]);
			} else {
				for (m in messages) {
				//	console.log(messages[m]);
					var msgText = "```";
					msgText += ("From: " + messages[m].sender_screen_name + "\n");
					msgText += ("Msg: " + messages[m].text + "\n");
					var dateStamp = messages[m].created_at.split(/\s/g);
					console.log(dateStamp);
					var year = dateStamp.pop();
					//console.log(year);
					dateStamp.splice(3,0,year);
					//console.log(dateStamp);
					dateStamp = dateStamp.join(" ");
					//console.log(dateStamp);
					var date = new Date(dateStamp);
					//console.log(date);

					msgText += ("Date: " + (date.getMonth() + 1)+"/"+ date.getDate()+ "/" + date.getFullYear() +"\n");
					msgText += ("Time: " + date.getHours(-5)+":"+date.getMinutes());
					msgText += (":"+date.getSeconds()+"\n```");
					bot.sendMessages(cID, [msgText]);
				}
			}

		});
	}
}

// function sendKayTweets(cID) {
// 	var kayArr = [
// 		"Hi",
// 		"Are you doing well?",
// 		"I hope you are.",
// 		"After this you may not be.",
// 		"The goal is to spam your Twitter. However, it's every 3 minutes",
// 		"I am sorry for this.",
// 		"Please don't hate me",
// 		"I really do love you. Remember, it's every 3 minutes.",
// 		"Every three minutes IF the program runs correctly.",
// 		"I'm just being an uber troll.",
// 		"If you do hate me, you can block me for 3 days.",
// 		"I hope you take this as a bit of fun.",
// 		"I don't really know how many tweets there'll be.",
// 		"They will all be short",
// 		"I hope school was good.",
// 		"I also hope you're feeling good.",
// 		"God loves you.",
// 		"Got any math homework I can do?",
// 		"We're almost done.",
// 		"Just a few more.",
// 		"Well... maybe more.",
// 		"Sorry ♥",
// 		"So... I'm running out of things to say.",
// 		"Say hi to Geo for me.",
// 		"And Aurora.",
// 		"Oh and sorry about this",
// 		"Almost done, for reals.",
// 		"Three more after this.",
// 		"My evilness has reached an all time high.",
// 		"You are done after this next tweet.",
// 		"Good night."
// 	]
//
// 	for (var i = 0; i < kayArr.length; i++) {
// 		m = "@KayAnnSheridan " + kayArr[i];
// 		var timeInt = 60000 * (1 + i);
// 		console.log(m + ": " + timeInt);
//
// 		setInterval(function()
// 		{
// 			bot.darth.post('statuses/update', {
// 				status: m
// 			}, function(error, tweet, response) {
// 				if (error) {
// 					bot.sendMessages(cID, ["Tweet couldn't send!"]);
// 					console.log(error + " " + i + "; " + tweet);
// 				} else {
// 					bot.sendMessages(cID, ["Tweet" + (i + 1) + "/" + kayArr.length + " sent!"]);
// 				}
// 				console.log(tweet.text); // Tweet body.
// 			})
// 		}, timeInt);
// 	}
// }

function sendOwnerTweet(m, cI) {
	m.shift();
	m = m.join(" ");
	console.log("Tweet length = " + m.length);
	if (m.length > 140) {
		bot.sendMessages(cID, ["Tweet is too long! Length = " + m.length]);
	} else {
		bot.darth.post('statuses/update', {
			status: m
		}, function(error, tweet, response) {
			if (error) {
				bot.sendMessages(cI, ["Tweet couldn't send!"]);
			} else {
				bot.sendMessages(cI, ["Tweet sent to Darth account sucessfully!"]);
			}
			console.log(tweet.text); // Tweet body.
		});
	}
}

function sendServerTweet(m, cI) {
	m.shift();
	m = m.join(" ");
	console.log("Tweet length = " + m.length);
	if (m.length > 140) {
		bot.sendMessages(cID, ["Tweet is too long! Length = " + m.length]);
	} else {
		bot.server.post('statuses/update', {
			status: m
		}, function(error, tweet, response) {
			if (error) {
				bot.sendMessages(cI, ["Tweet couldn't send!"]);
			} else {
				bot.sendMessages(cI, ["Tweet sent to Dûnegwain account sucessfully!"]);
			}
			console.log(tweet.text); // Tweet body.
		});
	}
}

function addRole(msg, cID) {
	var roleName = msg[0];
	roleName = roleName.replace(/_/g, " ");
	console.log("[DEBUG] roleName = \"" + roleName + "\"");
	if (msg[1] != undefined && (checkHex(msg[1]) || checkINT(msg[1]))) {
		roleColor = msg[1];
		console.log(roleColor);
		if (roleColor.length == 4) {
			var r = roleColor[1] + roleColor[1];
			var g = roleColor[2] + roleColor[2];
			var b = roleColor[3] + roleColor[3];
			roleColor = ("#" + r + g + b);
		}
	} else {
		roleColor = "DEFAULT";
	}
	console.log("[DEBUG] roleColor = " + roleColor);
	var sID = bot.channels[cID].guild_id;
	bot.createRole(serverID, function(err, res) {
		var rID = res.id;
		bot.editRole({
			serverID: sID,
			roleID: rID,
			name: roleName,
			color: roleColor
		});
		bot.sendMessages(cID, ["Role `" + roleName + "` created successfully."]);
	});
}

function changeRole(msg, cID) {
	var roleName = msg[0];
	roleName = roleName.replace(/_/g, " ");
	console.log("[DEBUG] roleName = \"" + roleName + "\"");
	if (msg[1] != undefined && (checkHex(msg[1]) || checkINT(msg[1]))) {
		roleColor = msg[1];
		console.log(roleColor);
		if (roleColor.length == 4) {
			var r = roleColor[1] + roleColor[1];
			var g = roleColor[2] + roleColor[2];
			var b = roleColor[3] + roleColor[3];
			roleColor = ("#" + r + g + b);
		}
	} else {
		roleColor = "DEFAULT";
	}
	console.log("[DEBUG] roleColor = " + roleColor);
	var rID = getRoleIDFromRoleName(roleName, cID);
	console.log("[DEBUG] rID = " + rID);
	//console.log(rID);
	var sID = bot.channels[cID].guild_id;
	if (rID != "0") {
		bot.editRole({
			serverID: sID,
			roleID: rID,
			name: roleName,
			color: roleColor
		}, function() {
			bot.sendMessages(cID, ["Role `" + roleName + "` changed successfully."]);
		});
	}
}

function removeRole(msg, cID) {
	var roleName = msg[0];
	var sID = bot.channels[cID].guild_id;
	roleName = roleName.replace(/_/g, " ");
	var rID = getRoleIDFromRoleName(roleName, cID);
	console.log("[DEBUG] rID = " + rID);
	console.log("[DEBUG] roleName = \"" + roleName + "\"");
	if (rID != "0") {
		bot.deleteRole({
				serverID: sID,
				roleID: rID
			},
			function() {
				bot.sendMessages(cID, ["Deleted `" + roleName + "`."]);
			});
	}
}

function addUserToRole(msg, cID) {
	var roleName = msg[0];
	var userID = msg[1];
	var uID = userID.toString();
	uID = userID.replace(/\D/g, "");
	console.log(uID);
	var sID = bot.channels[cID].guild_id;
	roleName = roleName.replace(/_/g, " ");
	var rID = getRoleIDFromRoleName(roleName, cID);
	console.log("[DEBUG] rID = " + rID);
	console.log("[DEBUG] roleName = \"" + roleName + "\"");
	if (rID != "0") {
		bot.addToRole({
				serverID: sID,
				userID: uID,
				roleID: rID
			},
			function() {
				bot.sendMessages(cID, ["Added " + userID + " to `" + roleName + "`."]);
			});
	}
}

function removeUserFromRole(msg, cID) {
	var roleName = msg[0];
	var userID = msg[1];
	var uID = userID.toString();
	uID = userID.replace(/\D/g, "");
	var sID = bot.channels[cID].guild_id;
	roleName = roleName.replace(/_/g, " ");
	var rID = getRoleIDFromRoleName(roleName, cID);
	console.log("[DEBUG] rID = " + rID);
	console.log("[DEBUG] roleName = \"" + roleName + "\"");
	if (rID != "0") {
		bot.removeFromRole({
				serverID: sID,
				userID: uID,
				roleID: rID
			},
			function() {
				bot.sendMessages(cID, ["Removed " + userID + " from `" + roleName + "`."]);
			});
	}
}

function getRoleIDFromRoleName(rName, cID) {
	var sID = bot.channels[cID].guild_id; //Get server ID
	var server = bot.servers[sID]; //Set server as current server using the ID
	for (var role in server.roles) {
		//console.log("[DEBUG] server.roles[role].name = " + JSON.stringify(server.roles[role].name));
		if (server.roles[role].name == rName) {
			console.log("[DEBUG] server.roles[role].name = " + server.roles[role].name);
			var rID = server.roles[role].id;
			console.log("[DEBUG] rID = " + rID);
			return rID;
		}
	}
}

function kickUser(msg, cID) {
	var userID = msg[0];
	var uID = resolveID(userID);
	console.log("[DEBUG] uID: " + uID);
	var sID = bot.channels[cID].guild_id;
	bot.kick({
		channel: sID,
		userID: uID
	}, function(err) {
		console.log(err);
	});
}

function banUser(msg, cID) {
	var userID = msg[0];
	var uID = userID.toString();
	uID = userID.replace(/\D/g, "");
	var sID = bot.channels[cID].guild_id;
	bot.ban({
		channel: sID,
		userID: uID
	});
}

function prohibitUserExecution(msg, cID) {
	var userID = msg[0];
	var uID = userID.toString();
	uID = userID.replace(/\D/g, "");
	bot.banned.users.push(uID);
	bot.fs.writeFileSync('./banned.json', JSON.stringify(bot.banned, null, ' '));
}

function prohibitServerExecution(msg, cID) {
	var sID = bot.channels[cID].guild_id.toString();
	bot.banned.servers.push(sID);
	bot.fs.writeFileSync('./banned.json', JSON.stringify(bot.banned, null, ' '));
}

function enableUserExecution(msg, cID) {
	var userID = msg[0];
	var uID = userID.toString();
	uID = userID.replace(/\D/g, "");
	if (bot.banned.users.indexOf(uID) > -1) {
		var index = bot.banned.users.indexOf(uID);
	}
	bot.banned.users.splice(index, 1);
	bot.fs.writeFileSync('./banned.json', JSON.stringify(bot.banned, null, ' '));
}

function enableServerExecution(msg, cID) {
	var sID = msg[0];
	if (bot.banned.servers.indexOf(sID) > -1) {
		var index = bot.banned.servers.indexOf(sID);
	}
	bot.banned.servers.splice(index, 1);
	bot.fs.writeFileSync('./banned.json', JSON.stringify(bot.banned, null, ' '));
}

function unbanUser(msg, cID) {
	var userID = msg[0];
	var uID = resolveID(userID);
	var sID = bot.channels[cID].guild_id;
	bot.unban({
		channel: sID,
		userID: uID
	});
}

function muteUser(msg, cID) {
	var userID = msg[0];
	var uID = resolveID(userID);
	var sID = bot.channels[cID].guild_id;
	bot.mute({
		channel: sID,
		userID: uID
	}, function() {
		bot.sendMessages(cID, ["User " + userID + " has been muted."]);
	});
}

function unmuteUser(msg, cID) {
	var userID = msg[0];
	var uID = resolveID(userID);
	var sID = bot.channels[cID].guild_id;
	bot.unmute({
		channel: sID,
		userID: uID
	});
}

function deafenUser(msg, cID) {
	var userID = msg[0];
	var uID = resolveID(userID);
	var sID = bot.channels[cID].guild_id;
	bot.deafen({
		channel: sID,
		userID: uID
	});
}

function undeafenUser(msg, cID) {
	var userID = msg[0];
	var uID = resolveID(userID);
	var sID = bot.channels[cID].guild_id;
	bot.undeafen({
		channel: sID,
		userID: uID
	});
}

function silenceUser(msg, cID) {
	var sID = bot.channels[cID].guild_id;
	var userID = msg[0];
	var uID = resolveID(userID);
	var rID = getRoleIDFromRoleName("MUTED", cID);
	bot.addToRole({
		serverID: sID,
		userID: uID,
		roleID: rID
	});
}

function unsilenceUser(msg, cID) {
	var sID = bot.channels[cID].guild_id;
	var userID = msg[0];
	var uID = resolveID(userID);
	var rID = getRoleIDFromRoleName("MUTED", cID);
	bot.removeFromRole({
		serverID: sID,
		userID: uID,
		roleID: rID
	});
}

function editUserNick(msg, cID) {
	var sID = bot.channels[cID].guild_id;
	var userID = msg[0];
	var nickname = msg[1];
	var uID = resolveID(userID);
	bot.editNickname({
		serverID: sID,
		userID: uID,
		nick: nickname
	});
}

function createTextChannel() {}

function createVoiceChannel() {}

function deleteTextChannel() {}

function deleteVoiceChannel() {}

function checkHex(col) {
	var regExp = /^#([0-9A-F]{3}|[0-9A-F]{6})/i;
	console.log("In regex: " + regExp.test(col));
	if (regExp.test(col)) {
		return true;
	} else {
		return false;
	}
}

function checkINT(col) {
	if (col >= 0 && col <= 16777215) {
		return true;
	} else {
		return false;
	}
}

function resolveID(mention) {
	mention = mention.toString();
	uID = mention.replace(/\D/g, "");
	return uID;
}

function pingServer(m, cID) {
	var ip = m[0].toString();
	var port = Number(m[1]) || 25565;
	var results;
	bot.utils.ping(ip, port, function(err, res) {
		if (err) {
			console.log(err);
		} else {
			var desc = res.description.text;
			desc = desc.replace(/(\§[0-9a-fA-Fk-oK-ORr])+/g,"");
				results = "**IP:** `" + ip + "`\n";
				results += "**Port:** `" + port + "`\n";
				results += "**Players:** `" + res.players.online + "/" + res.players.max + "`\n";
				results += "**Description:** `" + desc + "`\n";
				bot.sendMessages(cID, [results]);
			//console.log(res);
		}
	}, 3000);

}

var adminFunctions = {
	adminCheck: adminCheck,
	randomStatus: randomStatus
};
module.exports = adminFunctions;
