/*Variable area*/
var config = require("./config.json"); // Must be first because it is the settings for most of below
var Discordbot = require('discord.io');
var bot = new Discordbot.Client({
  token: config.token,
  autorun: true
});
var Twitter = require("twitter");
var darth = new Twitter({
  consumer_key: config.twitter.o.ck,
  consumer_secret: config.twitter.o.cs,
  access_token_key: config.twitter.o.tk,
  access_token_secret: config.twitter.o.ts,
});
var server = new Twitter({
  consumer_key: config.twitter.s.ck,
  consumer_secret: config.twitter.s.cs,
  access_token_key: config.twitter.s.tk,
  access_token_secret: config.twitter.s.ts,
});
process.DiscordBot = bot;

var banned = require("./banned.json");
const fs = require('fs');
const request = require('request');
var colors = require('colors/safe');
var admin = require("./admin.js");
var calc = require("./calc.js");
var info = require("./info.js");
var help = require("./help.js");
var color = require("./color.js");
//Bot properties declared
bot.config = config;
bot.banned = banned;
bot.darth = darth;
bot.server = server;
bot.inStandby = false;
bot.sendMessages = sendMessages;
bot.reload = reload;
bot.startDate = new Date();
var year = bot.startDate.getFullYear();
var month = bot.startDate.getMonth()+1;
var day = bot.startDate.getDate();
if(month < 10) {
  month = "0"+ month;
}
if(day < 10) {
  day = "0"+ day;
}
var logFileName = ( "logs/" + year + "-" + month + "-" + day + ".txt");
var logText = "";
const trigger = ">>>";
const triggerLength = 3;
bot.trigger = trigger;
bot.request = request;
bot.fs = fs;
//Other vars
var mIndex = 0;
var cIndex = 2;

const MAX_INTEGER = 2147483647;
const MIN_INTEGER = -2147483648;
/*Event area*/

bot.on("ready", function(rawEvent) {
  console.log(colors.cyan("File Name: " + logFileName));
  logText += "File Name: " + logFileName +"\r\n";
  console.log(colors.cyan("Started: " + bot.startDate));
  logText += "Started: " + bot.startDate+"\r\n";
  console.log(colors.gray("Connected!"));
  logText += "Connected!\r\n";
  console.log(colors.cyan("Logged in as: " + bot.username + " - (" + bot.id + ")"));
  logText += "Logged in as: " + bot.username + " - (" + bot.id + ")" + "\r\n";
  admin.randomStatus("0");
  fs.appendFile(logFileName, logText, (err) => {
    if (err) throw err;
    console.log(colors.gray("Data added."));
  });
});

bot.on("message", function(user, userID, channelID, message, rawEvent) {
  var serverName = "";
  var serverID = 0;
  if(!(channelID in bot.directMessages)){
    serverID = bot.channels[channelID].guild_id;
  }

  var channelName = "";
  var logDate = new Date();
  var logHour = logDate.getHours();
  if(logHour <= 9) {
    logHour = "0" + logHour;
  }
  var logMin = logDate.getMinutes();
  if(logMin <= 9) {
    logMin = "0" + logMin ;
  }
  var logSec = logDate.getSeconds();
  if(logSec <= 9) {
    logSec = "0" + logSec;
  }
  var logTime = "[" + logHour + ":" + logMin + ":" + logSec + "] ";
  var command = message.split(" ");
  var cmnd = command[0];
  var triggerCheck = cmnd.substring(0,triggerLength);
  var mainCmnd = cmnd.substring(triggerLength, cmnd.length).toLowerCase();
  command.shift();

  var msgID = rawEvent.d.id; //For future reference?
  var serverName, channelName;
  if(!(channelID in bot.directMessages)){
    for (var i in bot.servers) {
      if (i == bot.channels[channelID].guild_id) {
        serverName = bot.servers[i].name;
        channelName = bot.servers[i].channels[channelID].name
      }
    }
  } else {
    serverName = "Direct Message";
    channelName = user;
  }
  logText = logTime + user + "(" + userID + ") in server \'" + serverName + "\' in channel \'" + channelName +"\':\r\n---" + message +"\r\n";
  logText += "============================================================================\r\n";
  if(triggerCheck == trigger || userID === bot.id) {
    if (banned.servers.indexOf(serverID) != -1) {
      console.log(colors.magenta("[WARNING] Server: " + serverName + " - " + serverID + " is banned"));
      return;
    } else if (banned.users.indexOf(userID) != -1) {
      console.log(colors.magenta("[WARNING] User: " + user + " - @" + userID + " is banned"));
      return;
    } else {
      // Do the command
      console.log(colors.yellow("Server ID: " + serverID));
      console.log(colors.yellow("Channel ID: " + channelID));
      console.log(colors.blue("Message ID: " + msgID));
      console.log(colors.cyan(logTime + user + " - ID: ") + colors.yellow("@" + userID));
      console.log("in " + colors.magenta(serverName + " - #" + channelName));
      //console.log(message);
      console.log(colors.white(bot.fixMessage(message)));
      console.log("----------");

    }
    message = command.join(" ");
    if(triggerCheck == trigger) {
      if(bot.inStandby && mainCmnd === "admin" && userID == "133370041142870016") {
        console.log("ADMIN CHECK"); //I sent a wake command while bot is sleeping
        console.log(message);
        var msg = message.split(" ");
        admin.adminCheck(msg, channelID);
      }
      else if(bot.inStandby) {
        //Bot in standby, didn't receive wake command from me
        console.log("Sleeping: " + bot.inStandby);
        return;
      }
      else { //Bot is not in sleep mode. Anyone can send commands
        console.log(colors.cyan("Checking Commands"));
        console.log(colors.white(message));
        checkCommands(mainCmnd, message, userID, channelID);
      }
    }

    fs.appendFile(logFileName, logText, (err) => { //Log command sent along with user and server
      if (err) throw err;
      console.log(colors.gray("Data added."));
    });
  }
  //console.log("Bot sleeping (last check) = " + bot.inStandby);
});

bot.on("presence", function(user, userID, status, gameName, rawEvent) {
  /*console.log(user + " is now: " + status);*/
});

bot.on("debug", function(rawEvent) {
  /*console.log(rawEvent)*/ //Logs every event
});

bot.on("disconnected", function(errMsg, code) {
  console.log(colors.yellow("Bot disconnected"));
  var dateEnded = new Date();
  var endText = "Disconnected on: " + dateEnded + " because of: " + errMsg + "with code " + code + "\r\n";
  endText += ("Uptime: " + Math.floor((dateEnded - bot.startDate) * 1000) + "s");
  fs.appendFile(logFileName, endText +"\r\n", (err) => {
    if (err) throw err;
    console.log(colors.gray("Data added."));
  });
  if(code) {
    bot.connect() //Auto reconnect
  }
});

/*Function declaration area*/
function sendMessages(ID, messageArr, interval) {
  var callback, resArr = [], len = messageArr.length;
  typeof(arguments[2]) === 'function' ? callback = arguments[2] : callback = arguments[3];
  if (typeof(interval) !== 'number') interval = 1000;

  function _sendMessages() {
    setTimeout(function() {
      if (messageArr[0]) {
        bot.sendMessage({
          to: ID,
          typing: true,
          message: messageArr.shift()
        }, function(err, res) {
          if (err) {
            resArr.push(err);
          } else {
            resArr.push(res);
          }
          if (resArr.length === len) if (typeof(callback) === 'function') callback(resArr);
        });
        _sendMessages();
      }
    }, interval);
  }
  _sendMessages();
}
function sendFiles(ID, fileArr, interval) {
  var callback, resArr = [], len = fileArr.length;
  typeof(arguments[2]) === 'function' ? callback = arguments[2] : callback = arguments[3];
  if (typeof(interval) !== 'number') interval = 1000;

  function _sendFiles() {
    setTimeout(function() {
      if (fileArr[0]) {
        bot.uploadFile({
          to: ID,
          typing: true,
          file: fileArr.shift()
        }, function(err, res) {
          if (err) {
            resArr.push(err);
          } else {
            resArr.push(res);
          }
          if (resArr.length === len) if (typeof(callback) === 'function') callback(resArr);
        });
        _sendFiles();
      }
    }, interval);
  }
  _sendFiles();
}
function checkCommands(c, message, uID, chID) {
  var msg = message.split(' '); //Split the string on spaces
  //Log the string array as a check
  console.log(colors.cyan("msg[0]= " + msg[0]));
  console.log(colors.cyan("msg[1]= " + msg[1]));
  console.log(colors.cyan("msg[2]= " + msg[2]));
  switch(c) { //Command switcher
    case 'ping':
      sendMessages(chID, ["Pong"]);
      break;
    case 'calc':
      calc.calcCheck(msg, chID);
      break;
    case 'admin':
      if(!(chID in bot.directMessages)) {
        var serverID = bot.channels[chID].guild_id;
      }
      if(uID ==  "133370041142870016" || serverID == "172689601935179776" || (chID in bot.directMessages)) {
        admin.adminCheck(msg, chID);
      }
      else {
        sendMessages(chID, [ "<@" + uID + "> *: You lack permission*"])
      }
      break;
    case 'help':
      help.checkHelp(msg, uID);
      break;
    case 'info':
      info.infoCheck(msg, uID, chID);
      break;
    case 'butts':
      sendMessages(chID, [ "<@" + uID + "> *: You must like big butts then. Don't lie!*"]);
      break;
    case 'roll':
      rollDice(msg, chID);
      break;
    case 'coin':
      coinFlip(msg, chID);
      break;
    case 'integer':
      randInteger(msg, chID);
      break;
    case 'seq':
      //coinFlip(msg, chID);
      break;
    case 'game':
      msg = msg.join(" ");
      admin.randomStatus(msg);
      break;
    case 'cards':
      drawCards(msg, chID);
      break;
    case 'cipher':
      //admin.randomStatus();
      break;
    case 'adryd':
      doAdryd(chID);
      break;
    case 'hugs':
      sendHug(msg, chID, uID);
      break;
    case 'say':
      msg = msg.join(" "); //Join with a space
      repeatMessage(msg, chID, uID);
      break;
    case 'reverse':
      checkReverse(msg, chID);
      break;
    case 'insult':
      insult(uID, chID);
      break;
    case 'color':
      color.colorCheck(msg, chID);
      break;
    default:
      break;
  }
}
// Flips a coin
function coinFlip(m, cI) {
  var flips = m[0] || 1;
  var headCount = 0;
  var tailCount = 0;
  var headPercent = 0;
  var tailPercent = 0;
  if(flips > 250) {
    sendMessages(cI, ["Coin flips set to 250."]);
    flips = 250;
  }
  else if(flips <= 0) {
    sendMessages(cI, ["Coin flips set to one."]);
    flips = 1;
  }
  var flipText = "";
  var randInt = 0;
  for(var i=1; i<= flips; ++i) {
    randInt = Math.random()*2;
    if(randInt <=1) {
      flipText += "H ";
      headCount += 1;
    }
    else {
      flipText += "T ";
      tailCount += 1;
    }
  }
  headPercent = Math.round(headCount/flips * 100000) / 1000;
  tailPercent = Math.round(tailCount/flips * 100000) / 1000;
  sendMessages(cI, ["```" + flipText + "\n\nHeads: " + headCount + " - " + headPercent + "%\nTails: " + tailCount + " - " +  tailPercent +"%```\n"]);
}
// Rolls dice
function rollDice(m, cI) {
  var rolls = m[0] || 1;
  if(rolls > 250) {
    sendMessages(cI, ["Rolls set to 250."]);
    rolls = 250;
  }
  else if(rolls <= 0) {
    sendMessages(cI, ["Rolls set to one."]);
    rolls = 1;
  }
  var sides = m[1] || 6;
  var randInt = 0;
  var rollText = "";
  for(var r = 1; r <=rolls;++r) {
    randInt = Math.floor(Math.random()*sides)+ 1;
    rollText += (randInt + " ");
  }
  sendMessages(cI, ["`" + rollText + "`\n"]);
}
// Gives a random Integer
function randInteger(m, cI) {
  if(m[0] === "neg") {
    var randInt = 0;
    randInt = Math.floor(Math.random() * MIN_INTEGER);
    sendMessages(cI, ["Your integer is: `" + randInt +"   `."]);
  }
  else if(m[0] === "pos") {
    var randInt = 0;
    randInt = Math.floor(Math.random() * MAX_INTEGER);
    sendMessages(cI, ["Your integer is: `" + randInt +"   `."]);
  }
  else {
    var randInt = 0;
    randInt = Math.floor(Math.random() * (MAX_INTEGER*2)) - MAX_INTEGER;
    sendMessages(cI, ["Your integer is: `" + randInt +"`."]);
  }
}
// Draws cards
function drawCards(m, cI) {
  var draws = m[0] || 1;
  var duplicates = m[1] || "yes";
  var card = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
  var suit = ["♠","♥","♣","♦"];
  var cardSelected = [[0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0]];

  var cardText = "";
  if(duplicates == "yes" && draws > 20) {
    sendMessages(cI, ["Number of draws set to 20"]);
    draws = 10;
  }
  else if(duplicates == "no" && draws > 10) {
    sendMessages(cI, ["Number of draws set to 10"]);
    draws = 10;
  }
  if (draws <= 0) {
    sendMessages(cI, ["Number of draws set to 1"]);
    draws = 1;
  }
  if(duplicates == "yes") {
    for(var i = 1; i <= draws; ++i) {
      var s = Math.floor(Math.random() * 4);
      var c = Math.floor(Math.random() * 13);
      cardText += (card[c] + suit[s] + " ");
    }
  }
  else {
    var i = 0;
    while(i < draws) {
      var s = Math.floor(Math.random() * 4);
      var c = Math.floor(Math.random() * 13);
      if(cardSelected[s,c] != 1) {
        cardText += (card[c] + suit[s] + " ");
        cardSelected[s,c] = 1;
        i += 1;
      }
    }
  }
  sendMessages(cI, ["Your cards are: " + cardText +"."]);
}
// ASCII impossible triangle
function doAdryd(cI) {
  var txt = "";
  txt += "            __\n";
  txt += "           /\\ \\\n";
  txt += "          /  \\ \\\n";
  txt += "         / /\\ \\ \\\n";
  txt += "        / / /\\ \\ \\\n";
  txt += "       / / /  \\ \\ \\\n";
  txt += "      / / /    \\ \\ \\\n";
  txt += "     / / /      \\ \\ \\\n";
  txt += "    / / /        \\ \\ \\\n";
  txt += "   / / /          \\ \\ \\\n";
  txt += "  / / /            \\ \\ \\\n";
  txt += " / / /______________\\_\\ \\\n";
  txt += "/ / /____________________\\\n";
  txt += "\\/_______________________/\n";
  sendMessages(cI, ["```\n" + txt +"```"]);
}
// Hugs function
function sendHug(m, cI, uI) {
  var channelIDs = ["172693016782438400", "172693057001488384"];
  var person = m[0] || uI;
  var hugs = ["c(^u^c)", "c(^.^c)",">(^u^)<","^w^","c(^ε^c)"];
  for(var i = 0; i <= channelIDs.length; ++i) {
    if(channelIDs[i] == cI) {
      var int = Math.floor(Math.random() * hugs.length);
      if(person == uI) {
        sendMessages(cI, ["Sending <@" + uI + "> this hug: " + hugs[int]]);
      }
      else {
        sendMessages(cI, ["Sending " + person + " this hug: " + hugs[int]]);
      }
    }
  }
}
function repeatMessage(m, cI, uI) {
  var msg = m || -1;
  if(uI != "205766554644643840") {
    if(msg == -1) {
      sendMessages(cI, ["\u200B\u180EI have nothing to say to you."]);
    }
    else {
      sendMessages(cI, ["\u200B\u180E" + msg]);
    }
  }
}
function checkReverse(m, cI) {
  var trig = m[0];
  switch(trig) {
    case '-a':
    m.shift();
    m = m.join(" ");
    m.split("");
    reverseText(m, cI, "");
    break;
    case '-w':
    m.shift();
    reverseText(m, cI, " ");
    break;
    default:
    sendMessages(cI, ["You forgot to put how you want the reverse text to be done."]);
  }
}
function reverseText(msg, chI, joinChar) {
  var reverseString =new Array();
  for(i = 0; i < msg.length; ++i) {
    var c = msg.length - i;
    reverseString[c] = msg[i];
  }
  reverseString = reverseString.join(joinChar);
  sendMessages(chI, ["\u200B\u180E" + reverseString])
}
function reload(cI) {
  commands = {};
  try {
    delete require.cache[require.resolve("./admin.js")];
    delete require.cache[require.resolve("./calc.js")];
    delete require.cache[require.resolve("./help.js")];
    delete require.cache[require.resolve("./info.js")];
    delete require.cache[require.resolve("./color.js")];
    delete require.cache[require.resolve("./config.json")];
    delete require.cache[require.resolve("./banned.json")];
    admin = require("./admin.js");
    calc = require("./calc.js");
    info = require("./info.js");
    help = require("./help.js");
    color = require("./color.js");
    config = require("./config.json");
    banned = require("./banned.json");
    commands = Object.assign({}, admin, help, info, calc, color, config, banned);
    sendMessages(cI, ["\u200B\u180ESuccessfully reloaded"]);
  }
  catch(e) {
    sendMessages(cI, ["\u200B\u180ECouldn't reload for some reason."]);
  }
  admin.randomStatus();
}
function insult(uI, cI) {
  var i1, i2, i3;
  var insultString = "";
  var insult1 = "Currish Barbarous Fen-sucked Loutish Beastly Goatish Knavish \
  Beggarly Milk-livered Bootless Cankered Frothy Ribaudred Unmuzzled Weedy \
  Crooked-pated Abortive Dankish Dog-hearted Dissembling Traitorous Foul-reeking \
  Hedge-born Churlish Gleeking Beef-witted Craven Haggard Bat-fowling \
  Incestuous Spleeny Loathed Bawdy Mangled Beslubbering Monstrous Reeky \
  Pernicious Odious Perfidious Sheep-biting Unmannerly Plume-plucked Wayward \
  Three-suited Rank-scented Saucy Ruttish Vain Pestilent Spongy Mouldy Surly \
  Tardy-gaited Fawning Withered Unctuous Pinch-spotted Clouted Shard-borne \
  Puking Gor-bellied Unbookish";
  var insult2 = "Bacon-fed Frosty-spirited Onion-eyed Flap-eared Deformed \
  Clay-brained Prattling Soused Logger-headed Folly-fallen Foolhardy \
  Dull-eyed Earth-vexing Ill-faced Shrill-gorged Harpy Brassy Flap-mouthed \
  Murderous Burly-boned Fool-born Dizzy-eyed Bate-breeding Fusty Muddy-mettled \
  Swaggering Worse-bodied Half-faced Feeble Glass-gazing Ill-breeding Envious \
  Roguish Knotty-pated Lily-livered Deboshed Lumpish Mammering Sodden-witted \
  Hell-hated Beetle-headed Fly-bitten Pigeon-livered Cockered Puppy-headed \
  Impudent Rump-fed Salt-butter Wry-necked Shag-haired Fat-kidneyed Mewling \
  Cullionly Tedious Swag-bellied Grim-looked Toad-spotted Buck-washing \
  Tottering Unwashed White-livered Guts-griping Scurvy";
  var insult3 = "Scut Codpiece Blood-sucker Hedgepig Bung Pignut Cutpurse \
  Giglot Canker-blossom Popinjay Hill-of-flesh Mumble-news Ban-dog Coxcomb \
  Fustilarian Bum-baily Rogue Horn-beast Elf-skin Rudesby Flirtgill Cullion \
  Varlet Gudgeon Hag Measle Boor Clod Drudge Hugger-mugger Jackanapes Runagate \
  Caitiff Lewdster Maggot Pumpion Harlot Miscreant Swain Nut-hook Bugbear Pizzle \
  Wagtail Clack-dish Prig Malt-horse Puttock Whore-son Ratsbane Clotpoll Enchantress \
  Ruffian Jolthead Scullion Apple-john Bed-swerver Strumpet Knave Dotard Vassal \
  Polecat Want-wit Rampallian";
  insult1 = insult1.split(" ");
  insult2 = insult2.split(" ");
  insult3 = insult3.split(" ");
  if (cI in bot.directMessages) {
    i1 = Math.floor(Math.random() * insult1.length);
    i2 = Math.floor(Math.random() * insult2.length);
    i3 = Math.floor(Math.random() * insult3.length);
    console.log(insult1[i1]);
    console.log(insult2[i2]);
    console.log(insult3[i3]);
    insultString = insult1[i1] + " " + insult2[i2] + " " + insult3[i3];
    insultString = insultString.toLowerCase();
    sendMessages(uI, ["Thou " + insultString + "."]);
  }

}
