var bot = process.DiscordBot;
var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijlmnopqrstuvwxyz0123456789-_";
var pollList = require("./polls.json");
var currentID = "";
function pollCheck(m, message) {
	switch (m[0]) {
    case 'create': //create command for polls
    case 'make':
      m.shift();
      createPoll(m, message);
      break;
    case 'v':
    case 'vote': //vote command for polls
      m.shift();
      voteOnPoll(m, message);
      break;
    case 'view': //view command for polls
      m.shift();
      viewPoll(m, message);
      break;
		case 'clear': // this command should clear *all* polls or the specified one
			m.shift();
			if(message.author.id === bot.ownerID) {
				clearPolls(m, message);
			}
			break;
    default:
      // Don't do anything
      break;
  }
}

function clearPolls(msg, message) {
	let pArray = pollList.polls;
	console.log(msg);
	let pollID = msg[0];

	if(pollID === "all") {
		pollList.polls = [];
		message.channel.send("All polls cleared!");
	} else {
		var pollIndex = searchPollArray(pArray, pollID);
		if(pollIndex > -1) {
			console.log(pollIndex);
			var deleted = pArray.splice(pollIndex,1);
			message.channel.send(`Poll \`${pollID}\` deleted`);
		} else {
			message.channel.send("Poll does not exist");
		}
	}
	bot.fs.writeFileSync('./polls.json', JSON.stringify(pollList, null, ' '));
}

function generateID() { //Generates poll ID
   var idText = "";
   for(i = 0; i < 5; i++) { //takes 5 random characters from the string b64
     var j = bot.random(b64.length);
     idText += b64[j];
   }
  return idText;
}

function createPoll(msg, message) { //Creates a poll
  mesg = msg.join(" ");
  var pID = generateID(); //Generates poll ID
  currentID = pID;
  var msgText = "";
  var arr = mesg.split("|"); //seperates string 'msg' into array 'arr' (first value of arr will be set to question ('qstn'), other values will be vote options
  var qstn = arr[0];
  arr.shift();
  var opts = arr;
	var optsText = opts.join(", ");
  var tCount = new Array(opts.length);
  for(var i = 0; i < tCount.length; i++) {
    tCount[i] = 0;
		opts[i] = opts[i].toLowerCase();
  }
	var pollValues = {
		poll_id: pID,
    voted: [],
    options: opts,
    counts: tCount,
    question: qstn
  }
  pollList.polls.push(pollValues);
  //console.log(p.polls[pID]);
  msgText = "Id: `" + pID + "`\n";
  msgText += "Question: " + qstn + "\n";
  msgText += "Options: " + optsText + "\n";
  message.channel.send(msgText);

  bot.fs.writeFileSync('./polls.json', JSON.stringify(pollList, null, ' '));
}

function voteOnPoll(msg, message) {
  // 0) Get associated variables needed
	var pArray = pollList.polls;
  var mesg = msg.join(' ');
  var msg = mesg.split('|');
  var pID = "";
  if(msg.length > 1) {
    pID = msg[0];
		currentID = pID;
	  msg.shift();
  } else {
    pID = currentID;
  }
  var opt = msg.join(' ').toLowerCase();
  var user = message.author.username;

  // 1) get the poll index based on ID
	var pI = searchPollArray(pArray, pID);
	if(pI == -1) {
		message.channel.send("ID does not exist");
	}
	else {
		var pol = pArray[pI];
		if(pol.poll_id === pID) {
			currentID = pID;
	  // Check if user voted in the poll already
			if(pol.voted.indexOf(message.author.id) != -1) {
			  message.channel.send(`<@${message.author.id}, You have already voted!`);
	  	} else {
				// Get index of option selected to add to the respective count index
	    	if(pol.options.indexOf(opt) != -1) {
	      	pol.voted.push(message.author.id);
	      	var optionID = pol.options.indexOf(opt);
	      	pol.counts[optionID] += 1;
	      	message.channel.send("<@"+ message.author.id +"> has voted for: " + opt);
	    	} else {
	      	message.channel.send("That is not an option sadly");
	    	}
			}
		}
	}

  //Write the new data to the polls JSON file
  bot.fs.writeFileSync('./polls.json', JSON.stringify(pollList, null, ' '));
}

function viewPoll(msg, message) {
	var pArray = pollList.polls;
  var pID = "";
	var msgText = "";
	console.log(msg);
  // 0) Get associated variables needed
  if(msg.length == 0) {
		var pollIndex = searchPollArray(pArray, currentID);
		sendPoll(pollIndex, pArray, message);
  } else if(msg[0] === "all") {
		if(pArray.length > 0) {
			for(var p = 0; p < pArray.length; p++) {
				console.log(pArray[p]);
				 msgText += `\`${pArray[p].poll_id}\` - ${pArray[p].question}\n`;
			}
			message.channel.send(msgText);
			return true;
		} else {
			message.channel.send("There are no polls to show");
			return false;
		}
	} else {
    pID = msg[0];
    currentID = pID;
		// 1) get the poll id and object associated
		if(pArray.length > 0) {
			var pollIndex = searchPollArray(pArray, pID);
			sendPoll(pollIndex, pArray, message);
	 	}
		else {
	   	message.channel.send("There are no polls to find");
	  }
  }
}

//Sends the poll information to the channel
function sendPoll(pollIndex, pArray, message) {
	msgText = "";
	if(pollIndex == -1) {
		message.channel.send("The Poll ID does not exist.");
	} else {
		var pI = pArray[pollIndex];
		var sum = 0;
		for(var c = 0; c < pI.counts.length; c++) {
		 sum += pI.counts[c];
		}

		msgText = "Id: `" + pI.poll_id + "`\n";
		msgText += "Question: " + pI.question + "\n";
		msgText += "Results: \n```"
		var percent = 0;
		var tally = 0;
		for(var i = 0; i < pI.counts.length; i++) {
			tally = pI.counts[i];
			percent = sum > 0 ? Math.round((tally/sum)*10000)/100 : 0;
			msgText += (pI.options[i] + " - " + tally + " (" + percent + "%)\n");
		}
		msgText += "```";
		message.channel.send(msgText);
	}
}

//Searches the poll array for the index of the poll ID if it exists.
function searchPollArray(pollArray, id) {
	for(var i = 0; i < pollArray.length; i++) { //Loop through poll array
		if(pollArray[i].poll_id == id) { //If we find the poll ID, return the index of the poll
			return i;
		}
	}
	return -1; //Else it DNE (does not exist)

}

var pollFunctions = {
	pollCheck: pollCheck,
	voteOnPoll: voteOnPoll
}
module.exports = pollFunctions;
