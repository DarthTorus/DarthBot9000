var bot = process.DiscordBot;

function rpsCheck(msg, message) {
  const gameArray = ["scissors","paper","rock","lizard","spock"];
  const winCondition = [
    [0,1,-1,1,-1],
    [-1,0,1,-1,1],
    [1,-1,0,1,-1],
    [-1,1,-1,0,1],
    [1,-1,1,-1,0]];

  let playerChoice = msg[0].toLowerCase();
  let botChoice = gameArray[bot.random(5)];
  var playerIndex = gameArray.indexOf(playerChoice);
  var botIndex = gameArray.indexOf(botChoice);
  try{
    let gameState = winCondition[playerIndex][botIndex];
    var messageText = "";
    message.channel.send(`Bot chose: **${botChoice}**`);
    switch (gameState) {
      case -1:
        messageText = "Bot wins!";
        break;
      case 1:
        messageText = "Player wins!";
        break;
      default:
        messageText = "It's a tie!";
        break;
    }
  } catch(err) {
    messageText = "Did you misspell perhaps?";
  }

  message.channel.send(messageText);
}

var rpsFunctions = {
	rpsCheck: rpsCheck
};
module.exports = rpsFunctions;
