module.exports = {
	name:"default",
	usage:"calc [command | math expression]",
	desc:"Runs a calculation of a math expression or the requested [subcommand]",
	alias:[''],
	run( client, message, args) {
		message.channel.send("Nothing to calc yet!")
	}
}