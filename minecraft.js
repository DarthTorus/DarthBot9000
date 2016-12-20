var bot = process.DiscordBot;
var mat = require("./materials.json");
/*
B = Brewing
C = Crafting
F = Farming
S = Smelting
M = Mining (W/O SILK TOUCH)
N = Not obtainable w/o cheats
*/
function minecraftCheck(m, cI) {
	console.log(m[0]);
	switch (m[0]) {
		case 'craft':
			break;
		default:
			//just do nothing
	}
}

var mcFunctions = {
	minecraftCheck: minecraftCheck,
};
module.exports = mcFunctions;
