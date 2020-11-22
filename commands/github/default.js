/**
  @Author: Darth Torus
*/
var bot = process.DiscordBot;

function gitHubCheck(m, cI) {
  switch(m[0]) {
    case "push":
      break;
    case "pull":
      break;
    case "branch":
      break;
    case "merge":
      break;
    default:
      //do nothing
      break;
  }
}

var git = {
	gitHubCheck: gitHubCheck
}
module.exports = git;
