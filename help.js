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
	message.channel.send("I be sliding into your DMs with my command list.")
}

function getHelpText() {
	var hText = "```"+formatCode+"\n"+bot.trigger+"\n";
	var extend = "├─";
	var endTree = "└─";
	var cont = "│ ";
	let helpLength = Object.keys(help).length;
	let helpi = 0;
	for(var cmd in help) {
		helpi++;
  	let helpLineMode = extend;
  	if (helpi == helpLength) {
    	helpLineMode = endTree;
  	}
		hText += helpLineMode + cmd;

		if(help[cmd].alias !=undefined || help[cmd].alias !='') {
			for(var alias in help[cmd].alias) {
				hText += ", "+help[cmd].alias[alias];
			}
		}
		 hText += "\n";
		let subcmdLength = Object.keys(help[cmd].commands).length;
    let subcmdi = 0;
		if(subcmdLength > 0) {
			for(var subcmd in help[cmd].commands) {
				subcmdi++;
      	let subcmdLineMode = extend;
      	if (subcmdi == subcmdLength) {
        	subcmdLineMode = endTree;
      	}
				hText += cont + subcmdLineMode + subcmd;
				if(help[cmd].commands[subcmd].alias !=undefined || help[cmd].commands[subcmd].alias !='') {
					for(var subAlias in help[cmd].commands[subcmd].alias) {
						hText += ", "+help[cmd].commands[subcmd].alias[subAlias];
					}
				}
				hText += "\n";
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
