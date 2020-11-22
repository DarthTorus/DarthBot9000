module.exports =  {
  name:"rps",
  usage: "rps <scissors | paper | rock | lizard | spock>",
  desc: "Plays Rock Paper Scissors Lizard Spock",
  alias:[""],
  run (client, message, args) {
    const gameArray = ["scissors","paper","rock","lizard","spock"];
    const winCondition = [
      [0,1,-1,1,-1],
      [-1,0,1,-1,1],
      [1,-1,0,1,-1],
      [-1,1,-1,0,1],
      [1,-1,1,-1,0]];
    const winText = [
      ["ties with","cuts","are crushed by","decapitates","are vaporized by"], // scissors
      ["is cut by","ties with","covers","is eaten by","disproves"],// paper
      ["smashes","is covered by","ties with","crushes","is vaporized by"],// rock
      ["is decapitated by","eats","is crushed by","ties with","poisons"],// lizard
      ["smashes","is disproved by","vaporizes","is poisoned by","ties with"]]// spock
    let playerChoice = args[0].toLowerCase();
    let botChoice = gameArray[client.random(5)];
    var playerIndex = gameArray.indexOf(playerChoice);
    var botIndex = gameArray.indexOf(botChoice);
    try{
      let gameState = winCondition[playerIndex][botIndex];
      var messageText =`**${client.titleCase(playerChoice)}** ${winText[playerIndex][botIndex]} **${client.titleCase(botChoice)}**\n`;
      message.channel.send(`Bot chose: **${client.titleCase(botChoice)}**`);
      switch (gameState) {
        case -1:
          messageText += "Bot wins!";
          break;
        case 1:
          messageText += "Player wins!";
          break;
        default:
          messageText += "It's a draw!";
          break;
      }
    } catch(err) {
      messageText = "Did you misspell perhaps?";
    }

    message.channel.send(messageText);
  }
}
