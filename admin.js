var bot = process.DiscordBot;
function adminCheck(m, cI) {
    console.log(m[0]);
    switch(m[0]) {
        case '-w':
          wake(cI);
          break;
        case '-s':
          sleep(cI);
          console.log("received sleep");
          break;
        case '-q':
          quit(cI);
          break;
        case '-t':
          tweetCheck(m, cI);
          break;
        case '-r':
          bot.reload(cI);
          break;
        case '-ar':
          m.shift();
          addRole(m, cI);
          break;
        case '-er':
          m.shift();
          changeRole(m, cI);
          break;
        case '-dr':
          m.shift();
          removeRole(m, cI);
          break;
        case '-au':
          m.shift();
          addUserToRole(m, cI);
          break;
        case '-ru':
          m.shift();
          removeUserFromRole(m, cI);
          break;
        case '-ku':
          m.shift();
          kickUser(m, cI);
          break;
        case '-bu':
          m.shift();
          banUser(m, cI);
          break;
        case '-ubu':
          m.shift();
          unbanUser(m, cI);
          break;
        case '-mu':
          m.shift();
          muteUser(m, cI);
          break;
        case '-umu':
          m.shift();
          unmuteUser(m, cI);
          break;
        case '-du':
          m.shift();
          deafenUser(m, cI);
          break;
        case '-udu':
          m.shift();
          undeafenUser(m, cI);
          break;
        case '-su':
          m.shift();
          silenceUser(m, cI);
          break;
        case '-usu':
          m.shift();
          unsilenceUser(m, cI);
          break;
        default:
          break;
    }
}
function sleep(cID) {
    bot.inStandby = true;
    //console.log("Bot sleeping (first check) = " + bot.inStandby);
    randomStatus("in dreams");
}
function wake(cID){
    bot.inStandby = false;
    console.log("Bot sleeping =" + bot.inStandby);
    randomStatus();
}
function quit(cID){
    setTimeout(function() {bot.disconnect();}, 1000);
}
function randomStatus(msg) {
    var gameString = msg || "0";
    var randStat = [
        "for world domination",
        "with your souls",
        "in Narnia",
        "with butts",
        "with ideas",
        "with space-time",
        "in Westeros",
        "chess",
        "the song of my people",
        "Mozart",
        "with fire",
        "with brains",
        "with bots",
        "with matches",
        "with friends",
        "Rocket League",
        "Skyrim",
        "on an ancient burial ground",
        "poker",
        "with binary",
        "the macarena",
        "a song of Ice and Fire",
        "Baby Seal Clubbing Sim",
        "with lava",
        "on your graves",
        "with Uncle Bob",
        "with Twitter API",
        "with Discord API",
        "in LA-LA land",
        "with nuclear materials",
        "w/ nuclear fallout",
        "with Deathnotes"
        ];
    console.log(gameString);
    if(gameString === "0") {
        var status = Math.floor(Math.random() * randStat.length);
        bot.setPresence({game: randStat[status]});
    }
    else {
        bot.setPresence({game: gameString});
    }
}
function tweetCheck(msg, cID) {
    msg.shift();
    switch(msg[0]) {
        case '-s':
            sendServerTweet(msg, cID);
            break;
        case '-o':
            sendOwnerTweet(msg, cID);
            break;
        // case '-b':
        //     sendBotTweet(msg, cID);
        //     break;
    }
}
function sendOwnerTweet(m, cI) {
    m.shift();
    m = m.join(" ");
    console.log("Tweet length = " + m.length);
    if(m.length > 140) {
        bot.sendMessages(cID, ["Tweet is too long! Length = " + m.length]);
    }
    else {
        bot.darth.post('statuses/update', {status: m},  function(error, tweet, response){
            if(error) {
                bot.sendMessages(cI, ["Tweet couldn't send!"]);
            }
            else {
                bot.sendMessages(cI, ["Tweet sent to Darth account sucessfully!"]);
            }
            console.log(tweet.text);  // Tweet body.
        });
    }
}
function sendServerTweet(m, cI) {
    m.shift();
    m = m.join(" ");
    console.log("Tweet length = " + m.length);
    if(m.length > 140) {
        bot.sendMessages(cID, ["Tweet is too long! Length = " + m.length]);
    }
    else {
        bot.server.post('statuses/update', {status: m},  function(error, tweet, response){
            if(error) {
                bot.sendMessages(cI, ["Tweet couldn't send!"]);
            }
            else {
                bot.sendMessages(cI, ["Tweet sent to Dûnegwain account sucessfully!"]);
            }
            console.log(tweet.text);  // Tweet body.
        });
    }
}
function addRole(msg, cID) {
  var roleName = msg[0];
  roleName = roleName.replace(/_/g, " ");
  console.log("[DEBUG] roleName = \"" + roleName + "\"");
  if(msg[1] != undefined && (checkHex(msg[1]) || checkINT(msg[1]))) {
    roleColor = msg[1];
    console.log(roleColor);
    if(roleColor.length == 4) {
      var r = roleColor[1] + roleColor[1];
      var g = roleColor[2] + roleColor[2];
      var b = roleColor[3] + roleColor[3];
      roleColor = ("#" + r + g + b);
    }
  }
  else {
    roleColor = "DEFAULT";
  }
  console.log("[DEBUG] roleColor = " + roleColor);
  var serverID = bot.serverFromChannel(cID);
  bot.createRole(serverID, function(err, res) {
    var roleID = res.id;
    bot.editRole({
      server: serverID,
      role: roleID,
      name: roleName,
      color: roleColor
    });
    bot.sendMessages(cID, ["Role `" + roleName + "` created successfully."]);
  });
}
function changeRole(msg, cID) {
  var roleName = msg[0];
  roleName = roleName.replace(/_/g, " ");
  console.log("[DEBUG] roleName = \"" + roleName + "\"");
  if(msg[1] != undefined && (checkHex(msg[1]) || checkINT(msg[1]))) {
    roleColor = msg[1];
    console.log(roleColor);
    if(roleColor.length == 4) {
      var r = roleColor[1] + roleColor[1];
      var g = roleColor[2] + roleColor[2];
      var b = roleColor[3] + roleColor[3];
      roleColor = ("#" + r + g + b);
    }
  }
  else {
    roleColor = "DEFAULT";
  }
  console.log("[DEBUG] roleColor = " + roleColor);
  var roleID = getRoleIDFromRoleName(roleName, cID);
  console.log("[DEBUG] roleID = " + roleID);
  //console.log(roleID);
  var serverID = bot.serverFromChannel(cID);
  if(roleID != "0") {
    bot.editRole({
        server: serverID,
        role: roleID,
        name: roleName,
        color: roleColor
    }, function() {
      bot.sendMessages(cID, ["Role `" + roleName + "` changed successfully."]);
    });
  }
}
function removeRole(msg, cID) {
  var roleName = msg[0];
  var serverID = bot.serverFromChannel(cID);
  roleName = roleName.replace(/_/g, " ");
  var roleID = getRoleIDFromRoleName(roleName, cID);
  console.log("[DEBUG] roleID = " + roleID);
  console.log("[DEBUG] roleName = \"" + roleName + "\"");
  if(roleID != "0") {
    bot.deleteRole({
      server: serverID,
      role: roleID
    },
    function() {
      bot.sendMessages(cID, ["Deleted `"+ roleName +"`."]);
    });
  }
}
function addUserToRole(msg, cID) {
  var roleName = msg[0];
  var userID = msg[1];
  var uID = userID.toString();
  uID = userID.replace(/\D/g,"");
  console.log(uID);
  var serverID = bot.serverFromChannel(cID);
  roleName = roleName.replace(/_/g, " ");
  var roleID = getRoleIDFromRoleName(roleName, cID);
  console.log("[DEBUG] roleID = " + roleID);
  console.log("[DEBUG] roleName = \"" + roleName + "\"");
  if(roleID != "0") {
    bot.addToRole({
      server: serverID,
      user: uID,
      role: roleID
    },
    function() {
      bot.sendMessages(cID, ["Added " + userID + " to `"+ roleName +"`."]);
    });
  }
}
function removeUserFromRole(msg, cID) {
  var roleName = msg[0];
  var userID = msg[1];
  var uID = userID.toString();
  uID = userID.replace(/\D/g,"");
  var serverID = bot.serverFromChannel(cID);
  roleName = roleName.replace(/_/g, " ");
  var roleID = getRoleIDFromRoleName(roleName, cID);
  console.log("[DEBUG] roleID = " + roleID);
  console.log("[DEBUG] roleName = \"" + roleName + "\"");
  if(roleID != "0") {
    bot.removeFromRole({
      server: serverID,
      user: uID,
      role: roleID
    },
    function() {
      bot.sendMessages(cID, ["Removed " + userID + " from `"+ roleName +"`."]);
    });
  }
}
function getRoleIDFromRoleName(rName, cID) {
  var serverID = bot.serverFromChannel(cID); //Get server ID
  var server = bot.servers[serverID]; //Set server as current server using the ID
  for(var role in server.roles) {
    //console.log("[DEBUG] server.roles[role].name = " + JSON.stringify(server.roles[role].name));
    if(server.roles[role].name == rName) {
      console.log("[DEBUG] server.roles[role].name = " + server.roles[role].name);
      var roleID = server.roles[role].id;
      console.log("[DEBUG] roleID = " + roleID);
      return roleID;
    }
  }
}
function kickUser(msg, cID) {
  var userID = msg[0];
  var uID = resolveID(userID);
  console.log("[DEBUG] uID: " + uID);
  var serverID = bot.serverFromChannel(cID);
  bot.kick({
    channel: serverID,
    target: uID
  }, function(err) {
    console.log(err);
  });
}
function banUser(msg, cID) {
  var userID = msg[0];
  var uID = userID.toString();
  uID = userID.replace(/\D/g,"");
  var serverID = bot.serverFromChannel(cID);
  bot.ban({
    channel: serverID,
    target: uID
  });
}
function unbanUser(msg, cID) {
  var userID = msg[0];
  var uID = resolveID(userID);
  var serverID = bot.serverFromChannel(cID);
  bot.unban({
    channel: serverID,
    target: uID
  });
}
function muteUser(msg, cID) {
  var userID = msg[0];
  var uID = resolveID(userID);
  var serverID = bot.serverFromChannel(cID);
  bot.mute({
    channel: serverID,
    target: uID
  }, function() {
    bot.sendMessages(cID, ["User " + userID + " has been muted."]);
  });
}
function unmuteUser(msg, cID) {
  var userID = msg[0];
  var uID = resolveID(userID);
  var serverID = bot.serverFromChannel(cID);
  bot.unmute({
    channel: serverID,
    target: uID
  });
}
function deafenUser(msg, cID) {
  var userID = msg[0];
  var uID = resolveID(userID);
  var serverID = bot.serverFromChannel(cID);
  bot.deafen({
    channel: serverID,
    target: uID
  });
}
function undeafenUser(msg, cID) {
  var userID = msg[0];
  var uID = resolveID(userID);
  var serverID = bot.serverFromChannel(cID);
  bot.undeafen({
    channel: serverID,
    target: uID
  });
}
function silenceUser(msg, cID) {
  var serverID = bot.serverFromChannel(cID);
  var userID = msg[0];
  var uID = resolveID(userID);
  var roleID = getRoleIDFromRoleName("MUTED", cID);
  bot.addToRole({
    server: serverID,
    user: uID,
    role: roleID
  });
}
function unsilenceUser(msg, cID) {
  var serverID = bot.serverFromChannel(cID);
  var userID = msg[0];
  var uID = resolveID(userID);
  var roleID = getRoleIDFromRoleName("MUTED", cID);
  bot.removeFromRole({
    server: serverID,
    user: uID,
    role: roleID
  });
}
function createTextChannel() {}
function createVoiceChannel() {}
function deleteTextChannel() {}
function deleteVoiceChannel () {}
function checkHex(col) {
  var regExp = /^#([0-9A-F]{3}|[0-9A-F]{6})/i;
  console.log("In regex: " + regExp.test(col));
  if(regExp.test(col)){
    return true;
  }
  else {
    return false;
  }
}
function checkINT(col) {
  if(col >= 0 && col <= 16777215 ) {
    return true;
  }
  else {
    return false;
  }
}
function resolveID(mention) {
  mention = mention.toString();
  uID = mention.replace(/\D/g,"");
  return uID;
}
var adminFunctions = {
    adminCheck: adminCheck,
    randomStatus: randomStatus
};
module.exports = adminFunctions;
