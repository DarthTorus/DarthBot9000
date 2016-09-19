var bot = process.DiscordBot;
var formatCode = "xl\n";

function checkHelp(m, u) {
	console.log(m[0]);
	if (m[0] != undefined) {
		msg = m[0].toLowerCase();
	} else {
		msg = m[0];
	}
	switch (msg) {
		case "info":
			sendInfoHelp(u);
			break;
		case "roll":
			sendRollHelp(u);
			break;
		case "coin":
			sendCoinHelp(u);
			break;
		case "game":
			sendGameHelp(u);
			break;
		case "ping":
			sendPingHelp(u);
			break;
		case "integer":
			sendIntHelp(u);
			break;
		case "cards":
			sendCardHelp(u);
			break;
		case "hugs":
			sendHugHelp(u);
			break;
		case "say":
			sendSayHelp(u);
			break;
		case "reverse":
			sendReverseHelp(u);
			break;
		case "calc":
			m.shift();
			checkCalcHelp(m, u);
			break;
		case "color":
			m.shift();
			checkColorHelp(m, u);
			break;
		default:
			sendHelp(u);
	}
}

function sendHelp(uI) {
	var m = getHelpText();
	bot.sendMessage({
		to: uI,
		message: m
	});
}

function sendPingHelp(uI) {
	var m = "```" + formatCode + bot.trigger + "ping \n";
	m += 'Returns "Pong!" to the chat```';
	bot.sendMessage({
		to: uI,
		message: m
	});
}

function getHelpText() {
	var hText = "";
	hText += "type `" + bot.trigger + "help` to get this list again\n";
	hText += "```" + formatCode + bot.trigger + "\n├─ping\n";
	hText += "├─info\n│ ├─uptime\n│ ├─ip\n│ ├─invite\n│ ├─link\n│ ├─qrcode\n";
	hText += "│ └─twitter\n│   ├─owner\n│   └─server\n";
	hText += "├─color\n│ ├─convert\n│ ├─add\n│ ├─subtract\n";
	hText += "│ ├─multiply #Not implemented\n│ └─divide #Not implemented\n";
	hText += "├─calc\n│ ├─fact\n│ ├─grav #Not implemented\n│ ├─quad\n";
	hText += "│ ├─tri #Not implemented\n│ └─portal \n│   ├─end\n│   └─nether\n";
	hText += "├─coin\n├─roll\n├─game\n├─hugs\n├─say\n├─reverse\n├─list #Not implemented\n";
	hText += "├─cards\n├─integer\n├─seq #Not implemented\n├─cipher #Not implemented\n└─help```\n";
	hText += "type `" + bot.trigger + "help <command> [subcommands]` to learn more about that command.";

	return hText;
}

function sendRollHelp(uI) {
	var m = "```" + formatCode + bot.trigger + "roll [# of rolls] [# of sides]\n";
	m += "Takes 0, 1, or 2 arguments\n";
	m += "O: defaults to 1 roll of a 6-sided die.\n";
	m += "1: defaults to n rolls of a 6-sided die\n";
	m += "2: N rolls of an X-sided die```";
	bot.sendMessage({
		to: uI,
		message: m
	});
}

function sendCoinHelp(uI) {
	var m = "```" + formatCode + bot.trigger + "coin [# of tosses]\n";
	m += "Takes 0 or 1 arguments\n";
	m += "O: defaults to 1 toss\n";
	m += "1: N tosses```";
	bot.sendMessage({
		to: uI,
		message: m
	});
}

function sendGameHelp(uI) {
	var m = "```" + formatCode + bot.trigger + "game [game to play]\n";
	m += "Takes 0 or 1 argument(s)\n";
	m += "0: Random status from a set list will show\n";
	m += "1: Sets the status to whatever phrase follows.```";
	bot.sendMessage({
		to: uI,
		message: m
	});
}

function sendInfoHelp(uI) {
	var m = "```" + formatCode + bot.trigger + "info <ip | twitter | invite | link | uptime | credits | qrcode>\n";
	m += "ip: Gives server IP\n";
	m += "twitter: <owner|server>\n--owner: Gives Twitter of bot owner.\n--server: Gives server Twitter.\n";
	m += "invite: Will DM the user sending the command a link to add Formu-bot to their server.\n";
	m += "link: Sends invite link to the person requesting it.\n";
	m += "uptime: Shows how long Formu-bot has been running in days, hours, minutes, and seconds.\n";
	m += "credits: Logo credits.\n";
	m += "qrcode: Sends a QR Code link.```";
	bot.sendMessage({
		to: uI,
		message: m
	});
}

function sendIntHelp(uI) {
	var m = "```" + formatCode + bot.trigger + "integer [pos | neg]\n";
	m += "Takes 0, or 1 argument.\n"
	m += "None: Will generate a random integer from -2147483648 to 2147483647\n";
	m += "pos: Will generate a random integer from 0 to 2147483647\n";
	m += "neg: Will generate a random integer from -2147483648 to 0```";
	bot.sendMessage({
		to: uI,
		message: m
	});
}

function sendCardHelp(uI) {
	var m = "```" + formatCode + bot.trigger + "cards [# of cards to draw] [yes | no]\n";
	m += "Takes 0, 1, or 2 arguments\n";
	m += "0: Picks 1 card\n";
	m += "1: Picks n cards with possible duplicates (similar to putting the cards back in the deck). Max cards is 20.\n";
	m += "2: Picks n cards, with or without duplicates. If no duplicates, max cards drawn is 10.```";
	bot.sendMessage({
		to: uI,
		message: m
	});
}

function sendHugHelp(uI) {
	var m = "```" + formatCode + bot.trigger + "hugs [@person]\n";
	m += "Takes 0 or 1 argument\n";
	m += "0: Sends a hug to the user who executed the command.\n";
	m += "1: Sends a hug to the specified user.```";
	bot.sendMessage({
		to: uI,
		message: m
	});
}

function sendSayHelp(uI) {
	var m = "```" + formatCode + bot.trigger + "say <message>\n";
	m += "Takes 1 argument\n";
	m += "The bot will repeat whatever is said```";
	bot.sendMessage({
		to: uI,
		message: m
	});
}

function sendReverseHelp(uI) {
	var m = "```" + formatCode + bot.trigger + "reverse <-w | -a> <message>\n";
	m += "Takes 2 argument\n";
	m += "The bot will reverse whatever is sent.\n";
	m += "-w option will keep words intact, just put them in opposite order\n";
	m += "-a option will reverse every character.```";
	bot.sendMessage({
		to: uI,
		message: m
	});
}

function checkColorHelp(msg, uI) {
	console.log(msg[0]);
	if (msg[0] != undefined) {
		m = msg[0].toLowerCase();
	} else {
		m = msg[0];
	}
	switch (m) {
		case 'convert':
			msg.shift();
			checkColorConvHelp(msg, uI);
			break;
		case 'add':
			sendColorAddHelp(uI);
			break;
		case 'subtract':
			sendColorSubHelp(uI);
			break;
		case 'multiply':
			sendColorMultHelp(uI);
			break;
		case 'divide':
			sendColorDivHelp(uI);
			break;
		default:
			sendColorHelp(uI);
	}
}

function sendColorHelp(u) {
	var m = "```" + formatCode + bot.trigger + "color <convert | add | subtract | multiply | divide> [subcommands]\n";
	m += "Takes 1 argument followed by any subcommands or other arguments.\n";
	m += "The bot will convert from one color format to the others, i.e. RGB to HSL, or add, subtract, multiply, or divide two colors";
	m += "If no arguments given, bot will do nothing.```";
	bot.sendMessage({
		to: u,
		message: m
	});
}

function checkColorConvHelp(m, uID) {
	console.log(m[0]);
	if (m[0] != undefined) {
		msg = m[0].toLowerCase();
	} else {
		msg = m[0];
	}
	switch (msg) {
		case 'cmyk':
			sendCMYKConvHelp(uID);
			break;
		case 'hex':
			sendHEXConvHelp(uID);
			break;
		case 'hsl':
			sendHSLConvHelp(uID);
			break;
		case 'hsv':
			sendHSVConvHelp(uID);
			break;
		case 'int':
			sendINTConvHelp(uID);
			break;
		case 'rgb':
			sendRGBConvHelp(uID);
			break;
		default:
			sendColorConvHelp(uID);
			break;
	}
}

function sendColorConvHelp(u) {
	var m = "```" + formatCode + bot.trigger + "color convert <convertFrom> <color>\n";
	m += "Takes 3 arguments followed by any subcommands or other arguments.\n";
	m += "convertFrom: RGB | HSL | HSV | CMYK | INT | HEX (case-insensitive)\n";
	m += "color: color in the convertFrom format\n";
	m += "If no arguments given, bot will do nothing.```";
	bot.sendMessage({
		to: u,
		message: m
	});
}

function sendCMYKConvHelp(u) {
	var m = "```" + formatCode + bot.trigger + "color convert cmyk <c> <m> <y> <k>\n";
	m += "Takes 4 arguments\n";
	m += "c: Cyan from 0 to 100, inclusive\n";
	m += "m: Magenta from 0 to 100, inclusive\n";
	m += "y: Yellow from 0 to 100, inclusive\n";
	m += "k: Black from 0 to 100, inclusive\n";
	m += "If an incorrect argument is passed, bot will not convert.```";
	bot.sendMessage({
		to: u,
		message: m
	});
}

function sendHEXConvHelp(u) {
	var m = "```" + formatCode + bot.trigger + "color convert hex #<hexcode>\n";
	m += "Takes 1 argument\n";
	m += "hexcode: can be a length of 3 (#xxx) or 6 (#xxxxxx), any other length will result in incorrect value.\n";
	m += "If an incorrect argument is passed, bot will not convert.```";
	bot.sendMessage({
		to: u,
		message: m
	});
}

function sendHSLConvHelp(u) {
	var m = "```" + formatCode + bot.trigger + "color convert hsl <hue> <saturation> <lightness>\n";
	m += "Takes 3 arguments\n";
	m += "hue: Number in degrees from 0° to 359° (360° = 0°).\n";
	m += "saturation: Number from 0 to 100, inclusive.\n";
	m += "lightness: Number from 0 to 100, inclusive.\n";
	m += "If an incorrect argument is passed, bot will not convert.```";
	bot.sendMessage({
		to: u,
		message: m
	});
}

function sendHSVConvHelp(u) {
	var m = "```" + formatCode + bot.trigger + "color convert hsv <hue> <saturation> <value>\n";
	m += "Takes 3 arguments\n";
	m += "hue: Number in degrees from 0° to 359° (360° = 0°).\n";
	m += "saturation: Number from 0 to 100.\n";
	m += "value: Number from 0 to 100.\n";
	m += "If an incorrect argument is passed, bot will not convert.```";
	bot.sendMessage({
		to: u,
		message: m
	});
}

function sendINTConvHelp(u) {
	var m = "```" + formatCode + bot.trigger + "color convert int <integer>\n";
	m += "Takes 1 argument\n";
	m += "integer: Number from 0 to 16777215, inclusive.\n";
	m += "If an incorrect argument is passed, bot will not convert.```";
	bot.sendMessage({
		to: u,
		message: m
	});
}

function sendRGBConvHelp(u) {
	var m = "```" + formatCode + bot.trigger + "color convert rgb <red> <green> <blue>\n";
	m += "Takes 3 arguments\n";
	m += "red: Number from 0 to 255, inclusive.\n";
	m += "green: Number from 0 to 255, inclusive.\n";
	m += "blue: Number from 0 to 255, inclusive.\n";
	m += "If an incorrect argument is passed, bot will not convert.```";
	bot.sendMessage({
		to: u,
		message: m
	});
}

function sendColorAddHelp(u) {
	var m = "```" + formatCode + bot.trigger + "color add <color 1 in RGB> <color 2 in RGB>\n";
	m += "Takes 6 arguments\n";
	m += "First 3: RGB values (0-255) of first color separated by spaces.\n";
	m += "Last 3: RGB values (0-255) of second color separated by spaces.\n```";
	bot.sendMessage({
		to: u,
		message: m
	});
}

function sendColorSubHelp(u) {
	var m = "```" + formatCode + bot.trigger + "color sub <intial color in RGB> <color to subtract in RGB>\n";
	m += "Takes 6 arguments\n";
	m += "First 3: RGB values (0-255) of starting color separated by spaces.\n";
	m += "Last 3: RGB values (0-255) of color to subtract separated by spaces.\n```";
	bot.sendMessage({
		to: u,
		message: m
	});
}

function sendColorMultHelp(u) {}

function sendColorDivHelp(u) {}

function checkCalcHelp(msg, uID) {
	console.log(msg[0]);
	if (msg[0] != undefined) {
		m = msg[0].toLowerCase();
	} else {
		m = msg[0];
	}
	switch (m) {
		case 'fact':
			break;
		case 'grav':
			sendGravHelp(uID);
			break;
		case 'quad':
			sendQuadHelp(uID);
			break;
		case 'portal':
			msg.shift();
			checkPortalHelp(msg, uID);
			break;
		case 'tri':
			msg.shift();
			checkTriHelp(msg, uID);
			break;
		default:
			sendCalcHelp(uID);
	}
}

function sendCalcHelp(uI) {
	var m = "```" + formatCode + bot.trigger + "calc <null | fact | grav | portal | quad | triangles>\n";
	m += "Takes 0 (or more) argument(s) depending on the command given\n";
	m += "The bot will perform any calculation given from the arguments\n";
	m += "If no arguments given, an equation must follow such as (5 * 8) / 4```";
	bot.sendMessage({
		to: uI,
		message: m
	});
}

function checkPortalHelp(m, uI) {
	console.log(m[0]);
	if (m[0] != undefined) {
		msg = m[0].toLowerCase();
	} else {
		msg = m[0];
	}
	switch (msg) {
		case 'end':
			sendEndPortalHelp(uI);
			break;
		case 'nether':
			sendNetherPortalHelp(uI);
			break;
		default:
			sendPortalHelp(uI);
	}
}

function sendPortalHelp(uID) {
	var m = "```" + formatCode + bot.trigger + "calc portal <end | nether>\n";
	m += "Takes 1 argument \n";
	m += "end: Will calculate the location of the end portal\n";
	m += "nether: Will calculate where to put the nether portal in order for it to connect directly in the overworld```";
	bot.sendMessage({
		to: uID,
		message: m
	});
}

function sendEndPortalHelp(uID) {
	var m = "```" + formatCode + bot.trigger + "calc portal end <x1> <z1> <r1> <x2> <z2> <r2>\n";
	m += "Takes 6 arguments\n";
	m += "x1, z1, r1: 1st block coordinate and degree of rotation (facing)\n";
	m += "x2, z2, r2: 2nd block coordinate and degree of rotation (facing)\n";
	m += "result: the x and z coordinates of the end portal```";
	bot.sendMessage({
		to: uID,
		message: m
	});
}

function sendNetherPortalHelp(uID) {
	var m = "```" + formatCode + bot.trigger + "calc portal nether <x> <z>\n";
	m += "Takes 2 arguments\n";
	m += "x, z: coordinate of one of the bottom two portal blocks (not the frame)\n";
	m += "result: the x and z coordinates of the corresponding portal block in the nether```";
	bot.sendMessage({
		to: uID,
		message: m
	});
}

function sendQuadHelp(uID) {
	var m = "```" + formatCode + bot.trigger + "calc quad <a> <b> <c>\n";
	m += "Takes 3 arguments\n";
	m += "a: coefficient in front of x² (if the other arguments aren't given, defaults 1)\n";
	m += "b: coefficient in front of x (if not given, defaults to 0)\n";
	m += "c: constant (if not given defaults to 0)\n";
	m += "result: the 1 or 2 real solutions, or the 2 complex solutions of the quadratic equation```";
	bot.sendMessage({
		to: uID,
		message: m
	});
}

function checkTriHelp(m, uID) {
	console.log(m[0]);
	if (m[0] != undefined) {
		msg = m[0].toLowerCase();
	} else {
		msg = m[0];
	}
	switch (msg) {
		case 'ssa':
			sendSSAHelp(uID);
			break;
		case 'aas':
			break;
		case 'asa':
			break;
		case 'sss':
			break;
		case 'sas':
			break;
		default:
			sendTriHelp(uID);
	}
}

function sendTriHelp(uI) {
	var m = "```" + formatCode + bot.trigger + "calc tri <ssa | aas | asa | sss | sas>\n";
	m += "Takes 4 arguments: the triangle to solve for, and it's arguments.\n";
	m += "Will solve for the remaining three inputs not given\n";
	m += "Sides are labelled as a, b, and c. Angles are labelled as A, B, C\n";
	m += "ssa: Solves a Side-Side-Angle\n";
	m += "aas: Solves an Angle-Angle-Side triangle\n";
	m += "asa: Solves an Angel-Side-Angle triangle\n";
	m += "sss: Solves a Side-Side-Side triangle\n";
	m += "sas: Solves a Side-Angle-Side triangle```";
	bot.sendMessage({
		to: uI,
		message: m
	});
}

function sendSSAHelp(uI) {
	var m = "```" + formatCode + bot.trigger + "calc tri ssa <side A> <side B> <angle A>\n";
	m += "Takes 3 arguments: \n";
	m += "Side A: length of side A\n";
	m += "Side B: length of side B\n";
	m += "Angle A: angle A in degrees.```";
	bot.sendMessage({
		to: uI,
		message: m
	});
}
var helpFuncions = {
	checkHelp: checkHelp
}
module.exports = helpFuncions;
