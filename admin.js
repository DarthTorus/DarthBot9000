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

var adminFunctions = {
    adminCheck: adminCheck,
    randomStatus: randomStatus
};

module.exports = adminFunctions;