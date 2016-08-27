var bot = process.DiscordBot;
function infoCheck(m, uI, cI) {
	switch(m[0]) {
		case "twitter":
			m.shift();
			twitter(m, cI);
			break;
		case "invite":
			invite(uI);
			break;
		case "ip":
			bot.sendMessages(cI, ["IP: `" + bot.config.ip + "`"]);
			break;
		case "link":
			bot.sendMessages(uI, ["Join the server: " + bot.config.invite]);
			break;
		case "uptime":
			calcUptime(cI);
			break;
		case "credits":
			bot.sendMessages(cI, ["Server Logo: @GarretRR\nBot Logo: @Adryd"]);
			break;
		case "qrcode":
			bot.sendMessages(cI, [bot.config.qrcode]);
			break;
		case "bot":
			sendBotInfo(cI);
			break;
		default:
	}
}
function twitter(t, cI) {
	switch (t) {
		case "owner":
			bot.sendMessages(cI, ["Owner: " + bot.config.twitter.l.o]);
			break;
		case "server":
			bot.sendMessages(cI, ["Server: "+ bot.config.twitter.l.s]);
			break;
		default:
			 break;
	}
}
function calcUptime(cI) {
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
    if(days == 1) {
    	dayText = " day, ";
    }
    if(hrs == 1) {
    	hrText = " hour, ";
    }
    if(min == 1) {
    	minText = " minute, ";
    }
    if(sec == 1) {
    	secText = " second.";
    }

    bot.sendMessages(cI, ["I have been running for: ```xl\n" + days + dayText
        + hrs + hrText + min + minText + sec + secText +"```"]);
}
function sendBotInfo(cI) {
	calcUptime(cI);
	var numServers = Object.keys(bot.servers).length;
	var m = "Owner: Darth Torus\n";
	m += "Library: Discord.io\n";
	m += "Language: NodeJS/Javascript\n";
	m += "Servers: "+ numServers;
	bot.sendMessages(cI, ["```xl\n" + m + "```"])
}
function invite(uI) {
	bot.sendMessages(uI, ["Invite link: https://goo.gl/oiKr68"]);
}

var infoFunctions = {
	infoCheck : infoCheck
};

module.exports = infoFunctions;
