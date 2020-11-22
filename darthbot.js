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

//Other vars
//const MAX_INTEGER = 2147483647 // Max possible Integer
//const MIN_INTEGER = -2147483648 // Min possible Integer
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






client.commands = new Discord.Collection()
glob( './commands/**/*.js', (_, files) => {

	files.forEach( file => {
			
			const { dir } = parse( file )
			const folder = dir.split('/').pop()

			if ( !client.commands.has( folder ) ) client.commands.set( folder, new Discord.Collection() )

			const command = require( file )
			
			client.commands.get( folder ).set( command.name, command )

	})
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