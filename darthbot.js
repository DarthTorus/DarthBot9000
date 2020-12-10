/*Variable area*/
// Must be first because it is the settings for most of below
require("dotenv").config();

const Discord = require('discord.js')
const glob = require( 'glob' )
const { parse } = require( 'path' )

const client = new Discord.Client()
let colors = require('colors/safe');
let PNGImage = require('pngjs-image');
process.Discord = client // This makes it so I don't have to pass client explicitly
//var straw = require('strawpoll');

client.colors = colors
client.PNGImage = PNGImage
const trigger = process.env.TRIGGER
client.trigger = trigger
//client.request = request;
//client.fs = fs;
//client.url = url;
let quitStatus = false
client.inStandby = false
client.quitStatus = quitStatus


const TAU = 2*Math.PI // Makes using radians bearable
const PI = Math.PI // Helps with some functions
const POS_PHI = (1+Math.sqrt(5.0))/2 //Golden Ratio
const NEG_PHI = (1-Math.sqrt(5.0))/2 // The complement of the Golden Ratio
const REC_POS_PHI = POS_PHI - 1 //Reciprocal of Golden Ratio
const REC_NEG_PHI = NEG_PHI - 1 //Reciprocal of the complement of the Golden Ratio
client.TAU = TAU
client.PI = PI
client.POS_PHI = POS_PHI
client.NEG_PHI = NEG_PHI
client.REC_POS_PHI = REC_POS_PHI
client.REC_NEG_PHI = REC_NEG_PHI
client.GAME_LIST = ""
/**
 *
 * @param {Number} input
 * @param {Number} min
 * @param {Number} max
 */
client.clamp = function(input, min = Number.NEGATIVE_INFINITY, max = Number.POSITIVE_INFINITY, ) {
	let newVal;
	newVal = input > max ? max : input
	newVal = input < min ? min : input
	return newVal
}


client.random = function() {
	var min, max = 0
	if (arguments.length == 1) {
		// Between 0 and max
		max = arguments[0]
		min = 0
	} else if (arguments.length == 2) {
		// between min and max
		min = arguments[0]
		max = arguments[1]
	} else {
		// a decimal between 0 and 1 by default
		return Math.random()
	}

	return Math.floor(Math.random() * (max - min)) + min
}

/**
 * @param {String} str
 * @description Returns the string with each word capitalized
 */

client.titleCase = function(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ');
}

function map(m, message) {
	var v = Number(m[0])
	var inMin = Number(m[1])
	var inMax = Number(m[2])
	var outMin = 0
	var outMax = 1
	if( m.length  == 4) {
		outMax = Number(m[3])
	} else if ( m.length == 5) {
		outMin = Number(m[3])
		outMax = Number(m[4])
	}

	var result = bot.mapValue(v, inMin, inMax, outMin, outMax)

	message.channel.send("`"+result+"`")

}

client.mapValue = function(x, inMin, inMax, outMin, outMax) {
	var outRange = outMax - outMin
	var inRange = inMax - inMin
	console.log((x-inMin)*(outRange)/(inRange) + outMin)
	return ((x-inMin)*(outRange)/(inRange) + outMin)
}

client.randomStatus = function(msg) {
	var gameString = msg || "0";
	var statTypeList = Object.keys(client.GAME_LIST );
	var statType = statTypeList[client.random(statTypeList.length)];
	var randStatuses = client.GAME_LIST [statType];
	var bannedWords = ["fuck", "porn", "p0rn", "sh1t", "shit", "damn", "d@mn", "ass", "a$$","@$$",
		"twat","cunt","bitch","b1tch", "douche", "d0uche", "dick", "d1ck"];
	var containsBanned = false;
	for(i = 0; i < bannedWords.length; i++) {
		if(gameString.toLowerCase().includes(bannedWords[i])) {
			containsBanned = true;
		}
	}
	if (gameString == "0" || containsBanned) {
		var status = client.random(randStatuses.length);
		client.user.setActivity(randStatuses[status], {type: statType});
	} else {
		client.user.setActivity(msg);
	}
}



/* Constant functions */

client.loadFiles = function() {
	client.commands = new Discord.Collection()
	glob( './commands/**/*.js', (_, files) => {

		files.forEach( file => {

				const { dir } = parse( file )
				const folder = dir.split('/').pop()

				if ( !client.commands.has( folder ) ) client.commands.set( folder, new Discord.Collection() )

				const command = require( file )

				client.commands.get( folder ).set( command.name, command )

		})
		//console.log(client.commands)
	})
	client.GAME_LIST = require("./json/statusList.json")


	client.events = new Discord.Collection()
	glob( './events/*.js', (_, files) => {

			files.forEach( file => {

					const event = require( file )
					const { name } = parse( file)

					client.on( name, event( client ) )

			} )

	} )
}


// This just loads the files from the function above.
client.loadFiles()

// login to Discord with your app's token. Last thing client should do
client.login(process.env.TOKEN);