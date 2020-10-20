var bot = process.DiscordBot;
const Discord = require("discord.js");
var randSeedArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
var folderPath = './binding-of-isaac/';

const reqFiles = {
  isaacAchievements: folderPath + "isaacAchievementList.json",
  isaacBosses: folderPath + "isaacBossList.json",
  isaacChapters: folderPath + "isaacChapterList.json",
  isaacCharacters: folderPath + "isaacCharacterList.json",
  isaacItems: folderPath + "isaacItemList.json",
  isaacMonsters: folderPath + "isaacMonsterList.json",
  isaacPickups: folderPath + "isaacPickupList.json",
  isaacRooms: folderPath + "isaacRoomList.json",
  isaacTrinkets: folderPath + "isaacTrinketList.json"
}; // Names of variables

function requireFiles() {
	for (var name in reqFiles) {
		var fileName = reqFiles[name];
		global[name] = require(fileName);
		console.log(fileName+" loaded successfully");
	}
}

requireFiles();

function isaacCheck(msg, message) {
  switch(msg[0]) {
    case 'seed':
      var randSeed = getRandSeed();
      message.channel.send(`Your Isaac Seed: \`${randSeed}\``);
      break;
    case 'item':
    case 'trinket':
    case 'pickup':
    case 'boss':
      itemType = msg.shift();
      typeCheck(msg, message, itemType);
      break;
    case 'run':
      getRandomRun(message);
      break;
    case 'search':
      searchForObject(msg, message);
    default:
      message.channel.send("I am not sure of what you would like me to do.");
      break;
  }
}

function typeCheck(msg, message, itemType) {
    var itemName, itemObject, itemArr;
  if (msg.length > 0) {
    itemName = msg.join(" ");
    if(isaacItems[itemType].hasOwnProperty(itemName)) {
      itemObject = isaacItems[itemType][itemName];
    }
  } 
  else {
    itemArr = getObject();
    itemName = itemArr[0];
    itemObject = itemArr[1];
  }
  sendObject(itemObject, itemName, message);
}

function searchForObject(msg, message) {
  var itemString = msg.join(' ');
  var itemType = "";
  if(isaacItems.hasOwnProperty(itemString)) {
    itemType = "item";
  } else if(isaacTrinkets.hasOwnProperty(itemString)) {
    itemType = "trinket";
  } else if(isaacPickups.hasOwnProperty(itemString)) {
    itemType = "pickup";
  } else if(isaacBosses.hasOwnProperty(itemString)) {
    itemType = "boss";
  } else {
    itemType = -1;
  }


  return itemType
}

function getRandSeed() {
   var seedText = "";
   for(var i = 0; i < 8; i++) {
     var tempI = bot.random(randSeedArray.length);
     seedText += randSeedArray[tempI];
     if(i == 3) {
      seedText += " ";
     }
   }
   return seedText;
}

// Gets a random item from all items
function getObject() {
  var randObject, objectName;
  var randCategoryIndex = 0;
  var itemKeys, subCatIndex;

  switch(randCategoryIndex) {
    case 0:
      itemKeys = Object.keys(isaacItems)
      subCatIndex = bot.random(6);//itemKeys.length
      objectName = itemKeys[subCatIndex];
      randObject = isaacItems[objectName];
      break;
    case 1:
      itemKeys = Object.keys(isaacTrinkets)
      subCatIndex = bot.random(itemKeys.length);
      objectName = itemKeys[subCatIndex];
      randObject = isaacTrinkets[objectName];
      break;
    case 2:
      itemKeys = Object.keys(isaacPickups)
      subCatIndex = bot.random(itemKeys.length);
      objectName = itemKeys[subCatIndex];
      randObject = isaacPickups[objectName];
      break;
    default: 
      //DO nothing
      break;
  }
  var objArr = [objectName, randObject];
  return objArr;
}

function sendObject(itemObject, itemName, message) {
  console.log(itemName);
  var itemEmbed = {
    color: 0x990000,
    title: itemName,
    url: itemObject.link,
    description: itemObject.tagLine,
    image: {
      url: itemObject.imgPath,
      width: 400,
      height: 400
    },
    fields: [
      {
        name: "ID:",
        value: itemObject.id,
        inline: true
      },
      {
        name: "Game from:",
        value: itemObject.game,
        inline: true
      },
      {
        name: "Description:",
        value: itemObject.description,
        inline: false
      },
      {
        name: "Type:",
        value: itemObject.type,
        inline: true
      },
      {
        name: "Item Pools:",
        value: itemObject.item_pools,
        inline: true
      }
    ],
    timestamp: new Date()
  }
  message.channel.send({embed: itemEmbed});
}

var isaac = {
  isaacCheck: isaacCheck //Add export function names here
}
module.exports = isaac;
