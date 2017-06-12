var bot = process.DiscordBot;

const POS_PHI = (1+Math.sqrt(5))*.5;
const NEG_PHI = (1-Math.sqrt(5))*.5;
const PHI_MULT = 1/Math.sqrt(5);

function seriesCheck(m,cID) {
  console.log(m[0]);
	switch (m[0]) {
    case 'fib':
    case 'fibonacci':
      m.shift();
      getNthFib(m,cID);
      break
    default:
      //Do nothing b/c of user error
  }
}

// Gets the Nth Fibonacci term
function getNthFib(msg, cI) {
  var n = Number(msg[0]);
  var term1 = Math.pow(POS_PHI,n);
  var term2 = Math.pow(NEG_PHI,n);
  var result = Math.round(PHI_MULT*(term1-term2));

  var msgText = "`";
  if(n % 10 == 1) {
    msgText += (n + "st");
  } else if(n % 10 == 2) {
    msgText += (n + "nd");
  } else if(n % 10 == 3) {
    msgText += (n + "rd");
  } else {
    msgText += (n + "th");
  }
  msgText += " term is: " + result +"`";
  bot.sendMessages(cI, [msgText]);
}


var seriesFunctions = {
	seriesCheck: seriesCheck
};
module.exports = seriesFunctions;
