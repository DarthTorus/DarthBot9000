module.exports = {
  name: "roll",
  usage:"roll <n> [x]",
  desc: "Rolls a <n>-sided dice [x] times or 1 if number of times not given.",
  alias: ["dice"],
  run ( client, message, args) {
    let maxRolls = 300;
    let minRolls = 1;
    let maxSides = 100;
    let defaultSides = 6;
    let defaultAdder = 0;
    let rolls, sides, adder = 0;
    let diceArgs = args[0] || '1d6+0'
    console.log(diceArgs);
    // Get the index of 'd'
    let dIndex = diceArgs.indexOf('d')
    let addIndex = diceArgs.indexOf('+')
    
    // There are 4 conditions for either delimiter: -1 (not found), 0 (at the start), > 0 (surrounded by numbers), or at the end (i.e. 4d or d6+ )
    // Main form = XdS+A
    if(dIndex == -1) { // the 'd" doesn't exist, form may be X+A so assume sides = 6, 
      if(addIndex == -1) { // the '+" doesn't exist, form may be X so assume S = 6, A = 0,
        rolls = parseInt(diceArgs)
        sides = defaultSides
        adder = defaultAdder
      } else if(addIndex == 0) { // '+' exists at the front, form is +A, assume X = 1, S = 6
        rolls = minRolls
        sides = defaultSides
        adder = parseInt(diceArgs.slice(1))
      } else if(addIndex > 0 && addIndex < diceArgs.length) { // '+' exists between the end of the array and the front. form is X+A, assume S = 6
        rolls = parseInt(diceArgs.slice(0,addIndex))
        sides = defaultSides
        adder = parseInt(diceArgs.slice(addIndex+1))
      } else if(addIndex == diceArgs.length-1) { // '+' is at the very end, meaning the adder was left off form is X+ . Assume A = 0, S = 6
        rolls = parseInt(diceArgs.slice(0,addIndex))
        sides = defaultSides
        adder = defaultAdder
      }
    } else if(dIndex == 0) { // 'd' is at the beginning
      if(addIndex == -1) { // the '+" doesn't exist, form may be dS so assume X = 1, A = 0,
        rolls = minRolls
        sides = parseInt(diceArgs.slice(dIndex+1))
        adder = defaultAdder
      } else if(addIndex == 1) { // '+' is at 1 if d is at the front, form is d+A, assume X = 1, S = 6
        rolls = minRolls
        sides = defaultSides
        if(addIndex == diceArgs.length - 1) {
          adder = defaultAdder
        } else {
         adder = parseInt(diceArgs.slice(addIndex+1))
        }
      } else if(addIndex > dIndex && addIndex < diceArgs.length) { // '+' exists between the end of the array and the front. form is dS+A, assume X = 1
        rolls = minRolls
        sides = parseInt(diceArgs.slice(dIndex+1,addIndex))
        adder = parseInt(diceArgs.slice(addIndex+1))
      } else if(addIndex == diceArgs.length-1) { // '+' is at the very end, meaning the adder was left off form is dS+. Assume A = 0, X = 1
        rolls = minRolls
        sides = parseInt(diceArgs.slice(dIndex+1))
        adder = defaultAdder
      }
    } else if(dIndex > 0 && dIndex < diceArgs.length) { // 'd' is somewhere in the middle
      if(addIndex == -1) { // the '+' doesn't exist, form may be XdS so assume A = 0,
        rolls = parseInt(diceArgs.slice(0,dIndex))
        sides = parseInt(diceArgs.slice(dIndex+1))
        adder = defaultAdder
      } else if(addIndex == 1) { // 'd' at min can be at index, therefore if 'x' is at index1, this is a wrong form
        message.reply("This is an incorrect form. Please put the argument in the form of `XdS+A`")
        return
      } else if(addIndex == dIndex+1) { // form is Xd+A
        rolls = parseInt(diceArgs.slice(0,dIndex))
        sides = defaultSides
        adder = parseInt(diceArgs.slice(addIndex+1))
      }
      else if(addIndex > dIndex && addIndex < diceArgs.length) { // '+' exists between the end of the array and 'd''. form is XdS+A,
        rolls = parseInt(diceArgs.slice(0,dIndex))
        sides = parseInt(diceArgs.slice(dIndex+1,addIndex))
        adder = parseInt(diceArgs.slice(addIndex+1))
      } else if(addIndex == diceArgs.length-1) { // '+' is at the very end, meaning the adder was left off form is XdS+. Assume A = 0
        rolls = parseInt(diceArgs.slice(0,dIndex))
        sides = parseInt(diceArgs.slice(dIndex+1,addIndex))
        adder = defaultAdder
      }
    } else if(dIndex == diceArgs.length-1) { // 'd' is at the end, so adder = 0
      adder = defaultAdder
      if(addIndex == -1) { // the '+' doesn't exist since d is at the end, form may be Xd so assume A = 0, and S = 6
        rolls = parseInt(diceArgs.slice(0,dIndex))
        sides = parseInt(diceArgs.slice(dIndex+1))
      } else if(addIndex < dIndex) { // '+' cannot exist since 'd' at min can be at the end, therefore if '+' is at index d+1 or less, this is a wrong form
        message.reply("This is an incorrect form. Please put the argument in the form of `XdS+A`")
        return
      }
    }
    if (rolls > maxRolls) {
      message.channel.send("Rolls set to " + maxRolls + ".");
      rolls = maxRolls;
    }
  
    if(sides > maxSides) {
      sides = maxSides; // force the sides to be
      message.channel.send("Sides set to " + maxSides + ".");
    }
    var randInt = 0;
    var rollText = "";
    for (var r = 1; r <= rolls; ++r) {
      randInt = client.random(sides) + 1;
      randInt += adder
      rollText += (randInt + " ");
    }
   
    message.channel.send(`\`${rollText}\``); 
  }
}