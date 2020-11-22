const gameList = require("../statusList.json");
const client = process.Discord

module.exports = ( ) => {

  return () => {
    client.startDate = new Date().toLocaleString('en-US',{hour12: false})
    quitStatus = false
    console.log( client.colors.brightCyan("Started: ") + client.colors.brightBlue(client.startDate))
    console.log( client.colors.brightGreen("Connected!"))
    console.log( client.colors.brightCyan("Logged in as: ") + client.colors.brightWhite(client.user.tag) + " - " + client.colors.brightMagenta(`@${client.user.id}`))
    if(client.inStandby) {
      randomStatus("in dreams.")
    }
    else {
      randomStatus("0")
    }
  }

}
function randomStatus(msg) {
	var gameString = msg || "0";
	var statTypeList = Object.keys(gameList);
	var statType = statTypeList[client.random(statTypeList.length)];
	var randStatuses = gameList[statType];
	var bannedWords = ["fuck", "porn", "p0rn", "sh1t", "shit", "damn", "d@mn", "ass", "a$$","@$$",
		"twat","cunt","bitch","b1tch", "douche", "d0uche", "dick", "d1ck"];
	var containsBanned = false;
	for(i = 0; i < bannedWords.length; i++) {
		if(gameString.toLowerCase().includes(bannedWords[i])) {
			containsBanned = true;
		}
	}
	if (gameString == "0" || containsBanned) {
		var status = client.random(randStatuses.length);
		client.user.setActivity(randStatuses[status], {type: statType});
	} else {
		client.user.setActivity(msg);
	}
}