var bot = process.DiscordBot;
var formatCode = "diff\n";
var help = require("./help.json");

function checkHelp(m, message) {
	var c = m[0];

	if(c != '') {
		if(help.hasOwnProperty(c)) {
			var hDesc = "```Command: "+bot.trigger+c;
			if(help[c].trigger.length > 1) {
				for(var i = 0; i< help[c].trigger.length; i++) {
					hDesc += (help[c].trigger[i]);
					if(i != help[c].trigger.length-1) {
						hDesc += " | ";
					}
				}
			}
			hDesc += "\n";
			hDesc += ("Description: " + help[m[0]].desc + "\n");
			hDesc += "```";
			try {
				message.author.send(hDesc);
			}catch(err) {
				message.channel.send("I couldn't send a help message to your DMs. Perhaps you have DMs turned off?")
			}
		}
	}
	else {
		sendHelp(message);
	}

}

function sendHelp(message) {
	var m = getHelpText();
	message.author.send(m);
}

function getHelpText() {
	var hText = "```"+formatCode+"\n"+bot.trigger+"\n";
	var extend = "├─";
	var endTree = "└─";
	var cont = "│ ";
	console.log(help);
	for(var cmd in help) {
		console.log(cmd);
		console.log(cmd.commands);
		hText += (extend+cmd+"\n");
		if(cmd.commands != undefined || cmd.commands != null) {
			for(var subcmd in cmd) {
				hText +=cont+extend+subcmd+"\n";
			}
		}
	}
	hText += "```";
	return hText;
}

var helpFuncions = {
	checkHelp: checkHelp
}
module.exports = helpFuncions;
