var bot = process.DiscordBot;
var colors = require("colors/safe");
const Discord = require("discord.js");
const image = require("pngjs-image");
var randSeedArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
var folderPath = './binding-of-isaac/';

const reqFiles = {
  isaacBosses: folderPath + "isaacBossList.json",
  isaacChapters: folderPath + "isaacChapterList.json",
  isaacCharacters: folderPath + "isaacCharacterList.json",
  isaacItems: folderPath + "isaacItemList.json",
  isaacMonsters: folderPath + "isaacMonsterList.json",
  isaacPickups: folderPath + "isaacPickupList.json",
  isaacRooms: folderPath + "isaacRoomList.json",
  isaacTrinkets: folderPath + "isaacTrinketList.json"
}; // Names of variables

/**
 * Enum for embedColors
 * @readonly
 * @enum {number}
 */
var embedColors = {
  BOSS:       0x660000,
  CHAPTER:    0x0000CC,
  TRINKET:    0x0099CC,
  ITEM:       0xFFFF00,
  CHARACTER:  0x009999,
  MONSTER:    0x990000,
  PICKUP:     0x9933CC,
  ROOM:       0x999999
};

function requireFiles() {
	for (var name in reqFiles) {
		var fileName = reqFiles[name];
		global[name] = require(fileName);
		console.log(colors.yellow(fileName)+colors.cyan(" loaded successfully"));
	}
}

requireFiles();

/**
 * Checks for a subcommand after `d!<boi | isaac | isek>`
 * @param {String[]} msg String array of text after the main command
 * @param {Discord.Message} message Message object
 */
function isaacCheck(msg, message) {
  switch(msg[0]) {
    case 'seed':
      var randSeed = getRandSeed();
      message.channel.send(`Your Isaac Seed: \`${randSeed}\``);
      break;
    case 'item':
    case 'trinket':
    case 'pickup':
      itemType = msg.shift();
      typeCheck(msg, message, itemType);
      break;
    case 'run':
      getRandomRun(message);
      break;
    case 'search':
      msg.shift();
      searchForTerm(msg, message);
      break;
    default:
      message.channel.send("I am not sure of what you would like me to do.");
      break;
  }
}

// function typeCheck(msg, message, itemType) {
//   var itemName, itemObject, itemArr;
  

  
//   sendItem(itemObject, itemName, message);
// }
/**
 * 
 * @param {String[]} msg String array of term to search for
 * @param {Discord.Message} message Message Object
 */
function searchForTerm(msg, message) {
  /** 
   * Join the search on spaces
   * 
   * */
  var searchTerm = msg.join(' ');
  console.log(searchTerm);
  /**
   * Object of the item, if found
   */
  var searchObject;
  if(isaacBosses.hasOwnProperty(searchTerm)) {
    searchObject = isaacBosses[searchTerm];
    sendBoss(searchObject, searchTerm, message);
  }
  else if(isaacChapters.hasOwnProperty(searchTerm)) {
    searchObject = isaacChapters[searchTerm];
    sendChapter(searchObject, searchTerm, message);
  }
  else if(isaacCharacters.hasOwnProperty(searchTerm)) {
    searchObject = isaacCharacters[searchTerm];
    sendCharacter(searchObject, searchTerm, message);
  }
  else if(isaacItems.hasOwnProperty(searchTerm)) {
    searchObject = isaacItems[searchTerm];
    sendItem(searchObject, searchTerm, message);
  }
  else if(isaacMonsters.hasOwnProperty(searchTerm)) {
    searchObject = isaacMonsters[searchTerm];
    sendMonster(searchObject, searchTerm, message);
  }
  else if(isaacPickups.hasOwnProperty(searchTerm)) {
    searchObject = isaacPickups[searchTerm];
    sendPickup(searchObject, searchTerm, message);
  }
  else if(isaacRooms.hasOwnProperty(searchTerm)) {
    searchObject = isaacRooms[searchTerm];
    sendRoom(searchObject, searchTerm, message);
  }
  else if(isaacTrinkets.hasOwnProperty(searchTerm)) {
    searchObject = isaacTrinkets[searchTerm];
    sendTrinket(searchObject, searchTerm, message);
  }

}


/**
 * 
 * @param {Object} searchObject The object associated to `itemName`
 * @param {String} searchName The name of the item
 * @param {Discord.Message} message Message object
 */
function sendBoss(searchObject, searchName, message) {
  var bossEmbed = {
    color: embedColors.BOSS,
    title: searchName,
    url: searchObject.link,
    thumbnail: {
      url: searchObject.img.bossScreen,
      width: 400,
      height: 400
    },
    fields: [
      {
        name: "Base HP :",
        value: searchObject.baseHP,
        inline: true
      },
      {
        name: "Stage HP: ",
        value: searchObject.stageHP,
        inline: true
      },
      {
        name: "Behavior: ",
        value: searchObject.behavior,
        inline: false
      },
      {
        name: "Found as Boss",
        value: searchObject.foundIn.boss,
        inline: true
      },{
        name: "Found as Double Trouble",
        value: searchObject.foundIn.doubleTrouble,
        inline: true
      },{
        name: "Found as Degraded Boss",
        value: searchObject.foundIn.degradedBoss,
        inline: true
      },
      {
        name:"Drop Pool",
        value: searchObject.drop_pool,
        inline: true
      },
      {
        name: "Unlocked:",
        value: searchObject.unlocked,
        inline: true
      },
      {
        name: "Image in game:",
        value: "\u200b"
      }
    ],
    image: {
      url: searchObject.img.inGame,
      width: 120,
      height: 120
    },
    timestamp: new Date()
  }
  message.channel.send({embed: bossEmbed});
}


/**
 * 
 * @param {Object} searchObject The object associated to `itemName`
 * @param {String} searchName The name of the item
 * @param {Discord.Message} message Message object
 */
function sendCharacter(searchObject, searchName, message) {
  var itemEmbed = {
    color: embedColors.CHARACTER,
    title: searchName,
    url: searchObject.link,
    thumbnail: {
      url: searchObject.img,
      width: 400,
      height: 400
    },
    fields: [
      {
        name: "Health:",
        value: searchObject.health,
        inline: false
      },
      {
        name: "Damage:",
        value: searchObject.damage,
        inline: true
      },
      {
        name: "Tears:",
        value: searchObject.tears,
        inline: true
      },
      {
        name: "Shot Speed:",
        value: searchObject.shot_speed,
        inline: true
      },
      {
        name: "Range:",
        value: searchObject.range,
        inline: true
      },
      {
        name: "Speed:",
        value: searchObject.speed,
        inline: true
      },
      {
        name: "Luck:",
        value: searchObject.luck,
        inline: true
      },
      {
        name:"Unlocked By:",
        value: searchObject.unlocked
      },
      {
        name: "Starting Items:",
        value: searchObject.starting,
        inline: false
      }
    ],
    timestamp: new Date()
  }
  message.channel.send({embed: itemEmbed});
}

/**
 * 
 * @param {Object} searchObject The object associated to `itemName`
 * @param {String} searchName The name of the item
 * @param {Discord.Message} message Message object
 */
function sendChapter(searchObject, searchName, message) {

}

/**
 * 
 * @param {Object} searchObject The object associated to `itemName`
 * @param {String} searchName The name of the item
 * @param {Discord.Message} message Message object
 */
function sendItem(searchObject, searchName, message) {
  var itemEmbed = {
    color: embedColors.ITEM,
    title: searchName,
    url: searchObject.link,
    description: searchObject.tagLine,
    thumbnail: {
      url: searchObject.img,
      width: 400,
      height: 400
    },
    fields: [
      {
        name: "ID:",
        value: searchObject.id,
        inline: true
      },
      {
        name: "Game from:",
        value: searchObject.game,
        inline: true
      },
      {
        name: "Description:",
        value: searchObject.description,
        inline: false
      },
      {
        name: "Type:",
        value: searchObject.type,
        inline: true
      },
      {
        name: "Item Pools:",
        value: searchObject.item_pools,
        inline: true
      }
    ],
    timestamp: new Date()
  }
  message.channel.send({embed: itemEmbed});
}

/**
 * 
 * @param {Object} searchObject The object associated to `itemName`
 * @param {String} searchName The name of the item
 * @param {Discord.Message} message Message object
 */
function sendMonster(searchObject, searchName, message) {
  var monsterEmbed = {
    color: embedColors.MONSTER,
    title: searchName,
    url: searchObject.link,
    description: searchObject.description,
    thumbnail: {
      url: searchObject.img,
      width: 400,
      height: 400
    },
    fields: [
      {
        name: "Entity ID:",
        value: searchObject.entityID,
        inline: false
      },
      {
        name: "Encountered In:",
        value: searchObject.encounter,
        inline: false
      }
    ],
    timestamp: new Date()
  }
  message.channel.send({embed: monsterEmbed});
}

/**
 * 
 * @param {Object} searchObject The object associated to `itemName`
 * @param {String} searchName The name of the item
 * @param {Discord.Message} message Message object
 */
function sendPickup(searchObject, searchName, message) {

}

/**
 * 
 * @param {Object} searchObject The object associated to `itemName`
 * @param {String} searchName The name of the item
 * @param {Discord.Message} message Message object
 */
function sendRoom(searchObject, searchName, message) {

}

/**
 * 
 * @param {Object} searchObject The object associated to `itemName`
 * @param {String} searchName The name of the item
 * @param {Discord.Message} message Message object
 */
function sendTrinket(searchObject, searchName, message) {
  
}





// Gets a random item from all items
// function getObject() {
//   var randObject, objectName;
//   var randCategoryIndex = 0;
//   var itemKeys, subCatIndex;

//   switch(randCategoryIndex) {
//     case 0:
//       itemKeys = Object.keys(isaacItems)
//       subCatIndex = bot.random(6);//itemKeys.length
//       objectName = itemKeys[subCatIndex];
//       randObject = isaacItems[objectName];
//       break;
//     case 1:
//       itemKeys = Object.keys(isaacTrinkets)
//       subCatIndex = bot.random(itemKeys.length);
//       objectName = itemKeys[subCatIndex];
//       randObject = isaacTrinkets[objectName];
//       break;
//     case 2:
//       itemKeys = Object.keys(isaacPickups)
//       subCatIndex = bot.random(itemKeys.length);
//       objectName = itemKeys[subCatIndex];
//       randObject = isaacPickups[objectName];
//       break;
//     default: 
//       //DO nothing
//       break;
//   }
//   var objArr = [objectName, randObject];
//   return objArr;
// }

/**
 * @returns {String} `seedText`: An 8-digit alphanumeric string separated by a space into two (2) groups of four (4)
 */
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

var isaac = {
  isaacCheck: isaacCheck //Add export function names here
}
module.exports = isaac;
