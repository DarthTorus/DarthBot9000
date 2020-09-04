var bot = process.DiscordBot;
var unitsList = require("./unitsList.json")

function unitCheck(msg, message) {
  console.log(msg);
  console.log(msg.length);
  if(msg.length == 3) {
    let fromUnit = msg[1];
    let toUnit = msg[2];

    let fromUnitVal = Number(msg[0]);
    let toUnitVal = convertUnit(fromUnit, toUnit, fromUnitVal);
    if(toUnitVal != undefined) {
      let fromValFormat = new Intl.NumberFormat("en-US").format(fromUnitVal);
      let toValFormat = new Intl.NumberFormat("en-US").format(toUnitVal);
      message.channel.send(`${fromValFormat} ${fromUnit} is equal to \`${toValFormat} ${toUnit}\``);
    } else {
      message.channel.send("Cannot convert between the requested units.");
    }
  } else if(msg[0] ==="help") {
    let targetPage = 1;
    if(msg[1] != undefined && !isNaN(msg[1])) {
        targetPage = Number(msg[1]);
    }
    listUnitConversions(message,targetPage);
  }
    else {
    message.channel.send("Not enough arguments");
  }
}
function listUnitConversions(message, targetPage) {
  var unitHelpText = "";
  var pageIndex = 0;
  let unitsHelpTextArray = [];
	var extendTree = "├─";
	var endTree = "└─";
	var contTree = "│ ";
	let unitsLength = Object.keys(unitsList).length;
	let fromUnitsIndex = 0;
	for(var fromUnit in unitsList) {
    fromUnitsIndex++;
  	let helpLineMode = extendTree;
  	if (fromUnitsIndex == unitsLength) {
    	helpLineMode = endTree;
  	}
		unitHelpText += helpLineMode + fromUnit;

		unitHelpText += "\n";
		let toUnitLength = Object.keys(unitsList[fromUnit]).length;
    let toUnitIndex = 0;
		if(toUnitLength > 0) {
			for(var toUnit in unitsList[fromUnit]) {
        toUnitIndex++;
      	let toUnitLineMode = extendTree;
      	if (toUnitIndex == toUnitLength) {
        	toUnitLineMode = endTree;
      	}
        if (fromUnitsIndex == unitsLength) {
        	contTree = "  ";
      	}
				unitHelpText += contTree + toUnitLineMode + toUnit;
				unitHelpText += "\n";

			}
		}
    if(fromUnitsIndex%6==4) {
      unitsHelpTextArray.push(unitHelpText);
      unitHelpText = "";
      pageIndex++;
    }
	}
  if(unitHelpText !="" && unitHelpText !=null  && unitHelpText !=undefined) {
    unitsHelpTextArray.push(unitHelpText);
  }
  var totalPages = unitsHelpTextArray.length;
  message.author.send("```\n Page "+ targetPage + " of "+totalPages+"\n"+unitsHelpTextArray[targetPage-1]+"```");
}

function convertUnit(from, to, fromVal) {
  var result = undefined;
  if(unitsList[from] != undefined) {
    if(unitsList[from].hasOwnProperty(to)) {
      result = unitsList[from][to] * fromVal;
    }
  } else if(unitsList[to] != undefined) {
    if(unitsList[to].hasOwnProperty(from) !=undefined) {
      result = new Intl.NumberFormat("en-US").format((1/unitsList[to][from]) * fromVal);
    }
  }
  return result;
}


var unitConversionFunctions = {
	unitCheck: unitCheck
};
module.exports = unitConversionFunctions;
