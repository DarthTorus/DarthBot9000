var bot = process.DiscordBot;

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
