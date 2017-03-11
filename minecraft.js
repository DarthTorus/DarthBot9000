var bot = process.DiscordBot;

/*
B = Brewing
C = Crafting
F = Farming
S = Smelting
M = Mining (W/O SILK TOUCH)
MS = Mining, Silk touch
N = Not obtainable w/o cheats
*/
function minecraftCheck(m, cI) {
	switch (m[0]) {
		case 'craft':
			m.shift();
			craftObject(m, cI);
			break;
		default:
			//just do nothing
	}
}

function craftObject(msg, chID) {
	var obj = msg[0];
	var quant = Number(msg[1]) || 1;
	var material;
	// console.log("object: " + obj);
	// console.log("quant: " + quant);
	// console.log("recipe: " + bot.mat[obj].recipe);
	// Test if object to be crafted exists in the list
	if (bot.mat[obj] != null || bot.mat[obj] != '') {
		material = bot.mat[obj];
		//Check what mat[object].recipe[0] is
		for (var i = 0; i < material.recipe.length; i++) {
			//console.log("material.recipe[i]: " + material.recipe[i]);
			if (material.recipe[i].type == "N") {
				bot.sendMessages(chID, ["This item cannot be obtained without cheats."]);
			} else if (material.recipe[i].type == "M") {
				bot.sendMessages(chID, ["You can mine `" + material.recipe[i].item + "` to get `" + obj + "`"]);
			}
			else if (material.recipe[i].type == "MS") {
				bot.sendMessages(chID, ["You can mine `" + material.recipe[i].item + "` with a tool that has Silk Touch to get `" + obj + "`"]);
			}
			else if(material.recipe[i].type == "S") {
				bot.sendMessages(chID, ["You can smelt `" + material.recipe[i].item + "` to get `" + obj + "`"])
			}
			else if (material.recipe[i].type == "F") {
				//TODO Farming recicpes bot.sendMessages(chID, ["You can mine `" + material.recipe[i][1] + "` with a tool that has Silk Touch to get `" + obj + "`"]);
			}
			else if(material.recipe[i].type == "C") {
				craftingTable(material.recipe[i], quant);
			}
			else if(material.recipe[i].type == "B") {
				//TODO brewing craftMaterial(material.recipe[i][1],quant);
			}
		  else {
				bot.sendMessages(chID, ["I apologize, but that item doesn't exist. Please check spelling or try another item."]);
			}
		}
	}
}

function craftingTable(matRecipe, amount) {
	console.log(matRecipe.table);
	//TODO
}

var mcFunctions = {
	minecraftCheck: minecraftCheck,
};
module.exports = mcFunctions;
