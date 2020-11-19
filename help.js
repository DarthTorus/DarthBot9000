var bot = process.DiscordBot;
var formatCode = "diff";
var help = require("./help.json");

function checkHelp(m, message) {
	let c = m[0];

	if (c == '') {
		sendHelp(message);
	} else if (help.hasOwnProperty(c)) {
		// This code doesn't handle the case where
		// help is requested for an alias of a command.
		// Too bad.
		// That will require either expensive searching
		// or complicated preprocessing, given the
		// current help.json format.
		let [cHelp, n] = recursiveHelp(help[c], m, 1);
		if (n < m.length) {
			// Requested help for a subcommand
			// which does not exist in help.json.
			// Send nothing.
			// Possible alternatives: send help
			// of what *does* exist, or sendHelp.
			return;
		}
		let hDesc = "```" + formatCode + "\n";
		// This line might look a bit too fancy.
		// It probably is.
		// It uses some fancy ES6 trickery to join
		// the arguments with spaces, and then the
		// aliases with vertical bars.
		hDesc += "Command: " + bot.trigger + [m.slice(0, n).join(" "), ...defaultAlias(cHelp.alias)].join(" | ") + "\n";
		hDesc += "Description: " + defaultDesc(cHelp.desc) + "\n";
		hDesc += "```";
		try {
			message.author.send(hDesc);
		} catch (err) {
			message.channel.send("I couldn't send a help message to your DMs. Perhaps you have DMs turned off?");
		}
	} else {
		// Requested help for a command which does
		// not exist in help.json.
		// Send nothing.
		// Possible alternative: sendHelp.
		return;
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
	let m = "```" + formatCode + "\n";
	m += bot.trigger + "\n";
	m += getHelpText(help, "");
	m += "```";
	message.author.send(m);
	message.channel.send("I be sliding into your DMs with my command list.");
}

function getHelpText(commands, left) {
	const treeT = "├─";
	const treeL = "└─";
	const treeI = "│ ";
	let ckeys = Object.keys(commands);
	let ckeysn = ckeys.length;
	let hText = "";
	for (let i = 0; i < ckeysn; i++) {
		let tree = (i == ckeysn - 1) ? treeL : treeT;
		hText += left + tree + [ckeys[i], ...defaultAlias(commands[ckeys[i]].alias)].join(", ") + "\n";
		hText += getHelpText(defaultCommands(commands[ckeys[i]].commands), left + treeI);
	}
	return hText;
}

function defaultDesc(d) {
	return d || "<none>";
}

function defaultAlias(a) {
	return a || [];
}

function defaultCommands(c) {
	return c || {};
}

var helpFuncions = {
	checkHelp: checkHelp
}
module.exports = helpFuncions;
