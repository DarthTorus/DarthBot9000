var bot = process.DiscordBot;
var tarotCards = require("./tarotCards.json");

const tarotValues = ["Ace","2","3","4","5","6","7","8","9","10","Page","Knight","Queen","King"];
const tarotSuits = ["Cups","Pentacles","Swords","Wands"];
const majorArcana = ["The Fool","The Magician","The High Priestess","The Empress",
"The Emperor","The Hierophant","The Lovers","The Chariot","Strength","The Hermit",
"Wheel of Fortune","Justice","The Hanged Man","Death","Temperance","The Devil","The Tower",
"The Star","The Moon","The Sun","Judgement","The World"];
function tarotCheck(m, message) {
  switch(m[0]) {
    case 'random':
      pickRandomTarotCard(message);
      break;
    default:
      message.channel.send("I'm sorry. I can't seem to find the card you're looking for.");
      break;

  }

}

function pickRandomTarotCard(message) {
  var tarotIndex = bot.random(78);
  var valIndex, suitIndex;
  var card = "";
  var msgText = "";
  var val, suit;
  var imgPath = "./tarot_cards";
  var imgName = "";
  let reversed = bot.random() < .5;
  imgPath += reversed ? "/reversed/" : "/upright/";

  if (tarotIndex >= 56) {
    tarotIndex -= 56;
    card = tarotCards.major[majorArcana[tarotIndex]];
    msgText = "**" + majorArcana[tarotIndex];
  } else {
    val = tarotValues[Math.floor(tarotIndex / 4)];
    suit = tarotSuits[tarotIndex % 4];
    card = tarotCards.minor[suit][val];
    msgText = "**" +val + " of " + suit;
  }
  msgText += "** - ";
  var orientation = reversed ? "Reversed" : "Upright";
  msgText += orientation;
  msgText += "\n**Meaning:** ";
  msgText += reversed ? card.meaning.reversed : card.meaning.upright;
  msgText += "\n**Description of Card:** " + card.desc;
  imgName = card.fileName;
  imgPath += imgName;

  message.channel.send({
    files: [{
      attachment: imgPath,
      name: imgName
    }],
    content: msgText
  }, );

}

var tarotFunctions = {
  tarotCheck: tarotCheck
};
module.exports = tarotFunctions;
