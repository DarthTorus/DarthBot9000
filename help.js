var bot = process.DiscordBot;
var formatCode = "diff\n";
var help = require("./help.json");

function checkHelp(m, message) {
	let c = m[0];

	if (c == '') {
		sendHelp(message);
	} else if (help.hasOwnProperty(c)) {
		let [cHelp, n] = recursiveHelp(help[c], m, 1);
		if (n < m.length) {
			// Requested help for a subcommand
			// which does not exist in help.json.
			// Send nothing.
			// Possible alternatives: send help
			// of what *does* exist, or sendHelp.
			return
		}
		// This line might look a bit too fancy.
		// It probably is.
		let hDesc = "```Command: " + bot.trigger + m.slice(0, n).join(" ") + cHelp.alias.reduce(((a, v) => a + " | " + v), "") + "\n";
		hDesc += "Description: " + cHelp.desc + "\n";
		hDesc += "```";
		try {
			message.author.send(hDesc);
		} catch(err) {
			message.channel.send("I couldn't send a help message to your DMs. Perhaps you have DMs turned off?")
		}
	} else {
		// Requested help for a command which does
		// not exist in help.json.
		// Send nothing.
		// Possible alternative: sendHelp.
		return
	}
}

function recursiveHelp(base, m, n) {
	let next = m[n];
	if (base.commands.hasOwnProperty(next)) {
		return recursiveHelp(base.commands[next], m, n+1);
	} else {
		return [base, n];
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
