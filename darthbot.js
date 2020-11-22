/*Variable area*/
// Must be first because it is the settings for most of below
require("dotenv").config();
  
const Discord = require('discord.js')
const glob = require( 'glob' )
const { parse } = require( 'path' )

const client = new Discord.Client()
let colors = require('colors/safe');
let PNGImage = require('pngjs-image');
//var straw = require('strawpoll');
//const reqFiles = {commands:"commands.js"}; // Names of variables

/* function requireFiles() {
	for (var name in reqFiles) {
		var fileName = reqFiles[name];
		global[name] = require("./" + fileName);
		console.log(colors.brightYellow(fileName) + colors.brightGreen(" loaded successfully"));
	}
} */

process.Discord = client;
// Required files and modules
//var banned = require("./banned.json");
//console.log(colors.yellow("./banned.json") + colors.brightGreen(" loaded successfully"));

//Bot properties declared
/* try {
	requireFiles();
} catch (error) {
	console.log(colors.brightRed(`There has been an error of type ${error}`));
	console.error(error);
	return;
} */
client.colors = colors;
client.PNGImage = PNGImage;
const trigger = process.env.TRIGGER;
const triggerLength = trigger.length;
client.trigger = trigger;
//client.request = request;
//client.fs = fs;
//client.url = url;
let quitStatus = false;
client.inStandby = false;
client.quitStatus = quitStatus;

//Other vars
var logFileName = "";
const MAX_INTEGER = 2147483647; // Max possible Integer
const MIN_INTEGER = -2147483648; // Min possible Integer
const TAU = 2*Math.PI; // Makes using radians bearable
const PI = Math.PI; // Helps with some functions
const POS_PHI = (1+Math.sqrt(5.0))/2; //Golden Ratio
const NEG_PHI = (1-Math.sqrt(5.0))/2; // The complement of the Golden Ratio
const REC_POS_PHI = POS_PHI - 1; //Reciprocal of Golden Ratio
const REC_NEG_PHI = NEG_PHI - 1; //Reciprocal of the complement of the Golden Ratio
client.TAU = TAU;
client.PI = PI;
client.POS_PHI = POS_PHI;
client.NEG_PHI = NEG_PHI;
client.REC_POS_PHI = REC_POS_PHI;
client.REC_NEG_PHI = REC_NEG_PHI;

client.random = function() {
	var min, max, num = 0;
	if (arguments.length == 1) {
		// Between 0 and max
		max = arguments[0];
		min = 0;
	} else if (arguments.length == 2) {
		// between min and max
		min = arguments[0];
		max = arguments[1];
	} else {
		// a decimal between 0 and 1 by default
		return Math.random();
	}

	num = Math.floor(Math.random() * (max - min)) + min;
	return num;
}









client.commands = new Discord.Collection()
glob( './commands/**/*.js', (_, files) => {

	files.forEach( file => {
			
			const { dir } = parse( file )
			const folder = dir.split('/').pop()

			if ( !client.commands.has( folder ) ) client.commands.set( folder, new Discord.Collection() )

			const command = require( file )
			
			client.commands.get( folder ).set( command.name, command )

	})
		console.log(client.commands)
})

client.events = new Discord.Collection()
glob( './events/*.js', (_, files) => {

    files.forEach( file => {

        const event = require( file )
        const { name } = parse( file)
        
        client.on( name, event( client ) )

    } )

} )







// login to Discord with your app's token. Last thing client should do
client.login(process.env.TOKEN);