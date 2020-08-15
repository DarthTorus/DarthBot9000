var bot = process.DiscordBot;

function matrixCheck(msg, message) {
  switch(msg[0]) {
    case 'set' :
      break;
    case 'get' :
      break;
    case 'add' :
      break;
    case 'multiply' :
      break;
    case 'determinate' :
      break;
    default:
     message.channel.send("I don't understand this command. I'm sorry.");
     break;
  }
}

function matrixAdd() {

}

function matrixMultiply() {

}

function setMatrix() {

}

function getMatrix() {

}

function matrixInverse() {

}

function matrixDeterminate() {

}

var tarotFunctions = {
  tarotCheck: tarotCheck
};
module.exports = tarotFunctions;
