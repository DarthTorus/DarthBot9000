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
      getNthFib(m,message);
      break;
    case 'lucas':
      m.shift();
      getNthLucas(m,message);
      break;
    case 'tri':
    case 'triangle':
      m.shift();
      getNthTriangle(m,message);
      break;
    case 'collatz':
      m.shift();
      getCollatzChain(m,message);
      break;
    default:
      //Do nothing b/c of user error
  }
}

// Gets the Nth Fibonacci term
function getNthFib(msg, mesage) {
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
  message.channel.send(msgText);
}

// Gets the nth triangular number
function getNthTriangle(msg, cI) {
  var n = Number(msg[0]);
  var result = (n*n + n)*.5;

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
  message.channel.send(msgText);
}

// Gets the Collatz conjecture chain starting from N
function getCollatzChain(msg,message) {
  var msgText = ""
  var n = Number(msg[0]);
  msgText += "```"+ n + " → ";
  while(n > 1) {
    if(n % 2 == 1) {

      n = (n*3)+1;
      msgText += n;
      msgText += " → ";
    }
    else {
      n /= 2;
      msgText += n;
      if(n != 1) {
        msgText += " → ";
      }
    }
  }
  msgText += "```";

  message.channel.send(msgText);
}

function getNthLucas(msg, message) {
  var n = Number(msg[0]);
  var term1 = Math.pow(POS_PHI,n);
  var term2 = Math.pow(NEG_PHI,n);
  var result = Math.round((term1+term2));

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
  message.channel.send(msgText);
}

var seriesFunctions = {
	seriesCheck: seriesCheck
};
module.exports = seriesFunctions;
