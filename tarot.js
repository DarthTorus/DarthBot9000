var bot = process.DiscordBot;
var tarotCards = require("./tarotCards.json");
const Discord = require("discord.js");

const tarotValues = ["Ace","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Page","Knight","Queen","King"];
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
  var imgPath = "tarot_cards";
  var imgName = "";
  let reversed = bot.random() < .5;
  var tarotEmbed;
  imgPath += reversed ? "/reversed/" : "/upright/";
  var fullLink = "https://www.biddytarot.com/tarot-card-meanings/";
  var cardURL =""
  var cardTitle = "";
  if (tarotIndex >= 56) {
    tarotIndex -= 56;
    card = tarotCards.major[majorArcana[tarotIndex]];
    cardTitle = majorArcana[tarotIndex]
    
    cardURL = majorArcana[tarotIndex].toLowerCase();
    cardURL = cardURL.replace("the ",'');
    cardURL = cardURL.replace(/\s/g,'-');
    fullLink += "major-arcana/"+ cardURL;
  } else {
    val = tarotValues[Math.floor(tarotIndex / 4)];
    suit = tarotSuits[tarotIndex % 4];
    card = tarotCards.minor[suit][val];
    cardTitle = val + " of " + suit;

    cardURL = cardTitle.toLowerCase();
    cardURL = cardURL.replace(/\s/g,'-');
    fullLink += "minor-arcana/suit-of-"+suit.toLowerCase()+"/" + cardURL;
  }
  console.log(fullLink);
  var orientation = reversed ? "Reversed" : "Upright";
  imgName = card.fileName;
  imgPath += imgName;
  
  const img = new Discord.MessageAttachment("./"+imgPath);
  
  tarotEmbed = {
    color: 0x3399ff,
    title: cardTitle,
    url: fullLink,
    description: orientation,
    image: {
      url: "attachment://"+imgName
    },
    fields: [
      {
        name: "Meaning:",
        value: reversed ? card.meaning.reversed : card.meaning.upright
      }
    ]
  };
  
  message.channel.send({files: [img], embed: tarotEmbed});

}

var tarotFunctions = {
  tarotCheck: tarotCheck
};
module.exports = tarotFunctions;
